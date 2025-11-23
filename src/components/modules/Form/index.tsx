import {zodResolver} from '@hookform/resolvers/zod';
import Image from 'next/image';
import {useRouter} from 'next/router';
import {type LegacyRef, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';

import {Button} from '@/components/elements/Button';
import RadioGroupDemo from '@/components/elements/RadioGroup';
import {TextInput} from '@/components/elements/TextInput';
import {
	COUPON_CODES,
	CURRENCY,
	PRICE_CONFIG,
	PRICES,
	SITE_CONFIG,
	UPSELL_PRICE,
} from '@/lib/constants';
import * as fbq from '@/lib/fpixel';
import * as ttq from '@/lib/tpixel';
import logger from '@/lib/utils/logger';

import {formSchema} from './schema';
import classes from './styles.module.scss';



type FormData = {
	fullName: string;
	phoneNumber: string;
	address: string;
	city: string;
	price: string;
	upSell: boolean;
	zipCode: string;
	email?: string;
	couponCode?: string;
	companyName: string;
	// shippingPrice: string;
};

type Props = {
	id?: LegacyRef<HTMLFormElement>;
};

export default function Form({id}: Props) {
	const router = useRouter();

	const [displayPrice, setDisplayPrice] = useState<string>(PRICES[0]!);
	const [loading, setLoading] = useState<boolean>(false);
	const [couponApplied, setCouponApplied] = useState<boolean>(false);
	const [couponInput, setCouponInput] = useState<string>('');
	const [appliedCouponCode, setAppliedCouponCode] = useState<string>('');
	const [couponDiscount, setCouponDiscount] = useState<number>(0);
	const [couponType, setCouponType] = useState<'fixed' | 'percentage'>('fixed');
	const [couponPercentage, setCouponPercentage] = useState<number>(0);

	// Capture marketing parameters from URL
	const [marketingParams, setMarketingParams] = useState({
		medium: '',
		campaign_id: '',
		adset_id: '',
		ad_id: '',
		aff_id: ''
	});

	// const expiryTimestamp = new Date(Date.now() + 12050 * 1000);

	// const {seconds, minutes, hours, isRunning} = useTimer({
	// 	expiryTimestamp,
	// 	onExpire() {
	// 		console.warn('onExpire called');
	// 	},
	// });

	const {
		register,
		handleSubmit,
		formState: {errors},
		control,
		watch,
	} = useForm<FormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			fullName: '',
			phoneNumber: '',
			address: '',
			city: '',
			upSell: false,
			zipCode: '',
			price: "0", // Now using index instead of price
			email: '',
			couponCode: '',
			companyName: '', // Anti-bot field - should remain empty
			// shippingPrice: SHIPPING_PRICE[0]!,
		},
	});

	// Funkcija za detekciju attribution source-a
	const getAttributionSource = () => {
		const { query } = router;
		
		// Koristimo vaše postojeće medium parametre
		if (query.medium === 'fb') {
			return 'facebook';
		}
		
		if (query.medium === 'tt') {
			return 'tiktok';
		}
		
		// Direktan traffic nema medium parametar
		return 'direct';
	};

	const onSubmit = async (data: FormData) => {
		setLoading(true);
		
		// Dodaj kupon kod i marketing parametre u podatke
		const formDataWithCoupon = {
			...data,
			couponCode: couponApplied ? appliedCouponCode : undefined,
			couponDiscount: couponApplied ? couponDiscount.toString() : '0',
			// Include marketing parameters
			...marketingParams
		};

		const response = await fetch('/api/submit', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formDataWithCoupon),
		});

		const json = await response.json();

		logger.log('📦 Order submission response:', {
			message: json.message,
			webhookStatus: json.webhookStatus,
			webhookMessage: json.webhookMessage,
			orderId: json.orderId
		});

		if (json.message !== 'Success') {
			setLoading(false);
			alert('Došlo je do greške prilikom kreiranja porudzbine.');
			return;
		}

		// Conditional pixel firing prema attribution source-u
		const attributionSource = getAttributionSource();
		const pixelValue = Number(data.price) + Number(data.upSell ? UPSELL_PRICE : 0) - (couponApplied ? couponDiscount : 0);
		
		logger.log('🎯 Attribution source detected:', attributionSource);
		logger.log('💰 Pixel value:', pixelValue);
		
		// Facebook pixel - šalje se za Facebook traffic i direktan traffic
		if (attributionSource === 'facebook' || attributionSource === 'direct') {
			logger.log('📘 Sending Facebook pixel event');
			fbq.event('Purchase', {
				currency: 'RSD',
				value: pixelValue,
			});
		}
		
		// TikTok pixel - šalje se za TikTok traffic i direktan traffic
		if (attributionSource === 'tiktok' || attributionSource === 'direct') {
			logger.log('📱 Sending TikTok pixel event');
			ttq.event('PlaceAnOrder', {
				currency: 'RSD',
				value: pixelValue,
			});
		}

		// Create URL with success indicators (shortened codes)
		const params = new URLSearchParams({
			gs: '1', // Google Sheets success
			wh: json.webhookStatus === 'SUCCESS' ? '1' : '0', // Webhook success
			tm: json.topomsResult ? '1' : '0', // TopOMS success (legacy)
			oid: json.orderId || '', // Order ID
		});

		await router.push(`/thank-you?${params.toString()}`);
		setLoading(false);
	};

	const applyCoupon = () => {
		const upperCouponCode = couponInput.trim().toUpperCase();
		const discountValue = COUPON_CODES[upperCouponCode];
		
		if (discountValue) {
			setCouponApplied(true);
			setAppliedCouponCode(upperCouponCode);
			
			// Check if it's a percentage discount
			if (typeof discountValue === 'string' && discountValue.endsWith('%')) {
				const percentage = parseFloat(discountValue.replace('%', ''));
				setCouponType('percentage');
				setCouponPercentage(percentage);
				
				// Calculate discount based on current price
				const currentPrice = Number(displayPrice);
				const calculatedDiscount = Math.round((currentPrice * percentage) / 100);
				setCouponDiscount(calculatedDiscount);
			} else {
				// Fixed amount discount
				setCouponType('fixed');
				setCouponPercentage(0);
				setCouponDiscount(Number(discountValue));
			}
			
			setCouponInput('');
		} else {
			alert('Neispravan kupon kod!');
		}
	};

	const removeCoupon = () => {
		setCouponApplied(false);
		setAppliedCouponCode('');
		setCouponDiscount(0);
		setCouponType('fixed');
		setCouponPercentage(0);
	};

	// Capture marketing parameters from URL on component mount
	useEffect(() => {
		if (router.isReady) {
			const { query } = router;
			
			logger.log('🔍 URL query parameters:', query);
			
			const marketingData = {
				medium: (query.medium as string) || (query.utm_medium as string) || '',
				campaign_id: (query.campaign_id as string) || (query.utm_campaign as string) || '',
				adset_id: (query.adset_id as string) || (query.utm_adset as string) || '',
				ad_id: (query.ad_id as string) || (query.utm_ad as string) || '',
				aff_id: (query.aff_id as string) || (query.affiliate_id as string) || ''
			};
			
			setMarketingParams(marketingData);
			
			logger.log('🎯 Marketing parameters captured:', marketingData);
		}
	}, [router.isReady, router.query]);

	useEffect(() => {
		const selectedIndex = Number(watch('price') || "0");
		const selectedPrice = PRICES[selectedIndex] || PRICES[0]!;
		setDisplayPrice(selectedPrice);
		
		// Recalculate percentage discount when price changes
		if (couponApplied && couponType === 'percentage') {
			const currentPrice = Number(selectedPrice);
			const calculatedDiscount = Math.round((currentPrice * couponPercentage) / 100);
			setCouponDiscount(calculatedDiscount);
		}
	}, [watch('price'), watch('upSell'), couponApplied, couponType, couponPercentage]);

	return (
		<section className={classes.form} data-form-section>
			<div className={classes.infoSection}>
				<div className={classes.infoItem}>
					<Image src="/images/germany.webp" alt="flag" width={48} height={48} />
					<span>Proizvedeno u Nemačkoj</span>
				</div>
				<div className={classes.infoItemGroup}>
					<div className={classes.infoItem}>
						<Image src="/images/eu.png" alt="EU certifikat" width={48} height={48} />
						<span>EU Certificated</span>
					</div>
					<div className={classes.infoItem}>
						<Image src="/images/safe.png" alt="100% prirodno" width={48} height={48} />
						<span>100% Bezbedno</span>
					</div>
				</div>
			</div>
			<div className={classes.wrapper}>
				<div className={classes.price}>
					{/* <div className={classes.pointer_big}>
						{price} {CURRENCY}
					</div> */}
					{/* <div className={classes.discount}>{FORMA_PRVI}</div> */}
					{/* <div className={classes.pointer_small}>{FORMA_DRUGI}</div> */}
				</div>
				<div className={classes.container}>
					<h1>Podaci za Isporuku</h1>

					<form ref={id} onSubmit={handleSubmit(onSubmit)}>
						<TextInput<FormData>
							isFullWidth
							placeholder="Ime i Prezime"
							name="fullName"
							type="text"
							autoComplete="name"
							errorMessage={errors.fullName?.message}
							register={register}
						/>
						<TextInput<FormData>
							isFullWidth
							placeholder="Broj Telefona"
							name="phoneNumber"
							type="tel"
							inputMode="tel"
							autoComplete="tel"
							errorMessage={errors.phoneNumber?.message}
							register={register}
						/>
						<TextInput<FormData>
							isFullWidth
							placeholder="Adresa, ulica i broj"
							name="address"
							type="text"
							autoComplete="street-address"
							errorMessage={errors.address?.message}
							register={register}
						/>
						<TextInput<FormData>
							isFullWidth
							placeholder="Mesto, grad, selo"
							name="city"
							type="text"
							errorMessage={errors.city?.message}
							register={register}
						/>
						<TextInput<FormData>
							isFullWidth
							placeholder="Poštanski broj"
							name="zipCode"
							type="number"
							errorMessage={errors.zipCode?.message}
							register={register}
						/>
						<TextInput<FormData>
							isFullWidth
							placeholder="Email Adresa (opciono)"
							name="email"
							type="email"
							errorMessage={errors.email?.message}
							register={register}
						/>

						{/* Anti-bot field - hidden from users, only bots will fill it */}
						<input
							type="text"
							name="companyName"
							placeholder="Company Name"
							style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px' }}
							tabIndex={-1}
							autoComplete="off"
							aria-hidden="true"
						/>

						<div className={classes.options}>
							<p>Izaberite opciju:</p>
							<RadioGroupDemo name="price" control={control} />
						</div>

						{SITE_CONFIG.showCouponField && (
							<div className={classes.couponSection}>
								<div className={classes.couponInput}>
									<input
										type="text"
										placeholder="Promo kod (opciono)"
										value={couponInput}
										onChange={(e) => setCouponInput(e.target.value)}
										className={classes.couponField}
									/>
									<button
										type="button"
										onClick={applyCoupon}
										className={classes.couponButton}
									>
										Primeni
									</button>
								</div>
							{couponApplied && (
								<div className={classes.couponApplied}>
									<div className={classes.couponMessage}>
										<span>
											Kupon kod "{appliedCouponCode}" primenjen! 
											{couponType === 'percentage' 
												? ` (${couponPercentage}% popusta - ${couponDiscount} ${CURRENCY})` 
												: ` (-${couponDiscount} ${CURRENCY})`
											}
										</span>
									</div>
									<button
										type="button"
										onClick={removeCoupon}
										className={classes.removeCoupon}
									>
										Ukloni
									</button>
								</div>
							)}
							</div>
						)}

						{/* <div className={classes.upsell}>
							<label htmlFor="upSell">
								<span>{UPSELL_NASLOV}</span>

								<Image src="/images/upsell.webp" alt="Slika Dodatne Ponude" width={30} height={30} />
								<div className={classes.product}>
									{UPSELL_NAME}{' '}
									<span>
										+ {UPSELL_PRICE} {CURRENCY}
									</span>
								</div>
								<Checkbox name="upSell" control={control} />
							</label>
						</div> */}

						{/* TODO: This is shipping prices component */}
						{/* <RadioGroupShipping name="shippingPrice" control={control} /> */}
						<div className={classes.total}>
							<h1>
								<br />
								Ukupno:{' '}
								<span>
									{Number(displayPrice) - (couponApplied ? couponDiscount : 0)} {CURRENCY}
								</span>
							</h1>
						</div>
						<div className={classes.dostavafree}>
							<p>
								{watch('price') && (() => {
									const selectedIndex = Number(watch('price'));
									const config = Object.values(PRICE_CONFIG)[selectedIndex];
									const basePrice = Number(displayPrice) - (couponApplied ? couponDiscount : 0);
									
									if (config && config.shipping > 0) {
										const totalWithShipping = basePrice + config.shipping;
										return `Ukupno sa dostavom: ${totalWithShipping} ${CURRENCY}`;
									}
									return 'BESPLATNA DOSTAVA';
								})()}
							</p>
						</div>

						<Button isFullWidth isLoading={loading}>
							{loading ? 'Obrađujemo porudžbinu, molimo sačekajte...' : 'Završi Naručivanje'}
						</Button>
					</form>
				</div>
				{/* <div className={classes.image}>
					{isRunning && hours !== 0 && (
						<>
							<div className={classes.timer}>Popust ističe za:</div>
							<h1>
								{hours}:{minutes}:{seconds}
							</h1>
						</>
					)}
				</div> */}
			</div>
		</section>
	);
}
