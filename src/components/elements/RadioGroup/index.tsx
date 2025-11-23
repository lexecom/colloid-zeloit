import * as RadioGroup from '@radix-ui/react-radio-group';
import Image from 'next/image';
import type {Control, FieldValues, Path} from 'react-hook-form';
import {Controller} from 'react-hook-form';

import {CURRENCY, PRICE_CONFIG,PRICES, PRICES_NO_DISCOUNT} from '@/lib/constants';

import classes from './styles.module.scss';

export type RadioGorupProps<TFormValues extends FieldValues> = {
	name: Path<TFormValues>;
	control: Control<TFormValues>;
	error?: string;
	children?: React.ReactNode;
};

const RadioGroupDemo = <TFormValues extends Record<string, unknown>>(props: RadioGorupProps<TFormValues>) => {
	const {name, control} = props;
	
	// Calculate real savings for each option
	const priceKeys = Object.keys(PRICE_CONFIG);
	const calculateSavings = (priceKey: string) => {
		const config = PRICE_CONFIG[priceKey]!;
		const actualPrice = Number(priceKey);
		const customerActualTotal = actualPrice + config.shipping;
		const customerWouldPayTotal = config.noDiscountPrice + config.shipping;
		return customerWouldPayTotal - customerActualTotal;
	};
	
	const savings = {
		option1: calculateSavings(priceKeys[0]!), // 1890
		option2: calculateSavings(priceKeys[1]!), // 3290  
		option3: calculateSavings(priceKeys[2]!), // 3990
	};
	
	return (
		<Controller
			control={control}
			name={name}
			render={({field: {onChange}}) => (
				<RadioGroup.Root
					className={classes.RadioGroupRoot}
					defaultValue="0"
					aria-label="View density"
					onValueChange={onChange as (value: string) => void}
				>
					<div className={classes.item}>
						
						<RadioGroup.Item className={classes.RadioGroupItem} value="0" id="r1">
							<RadioGroup.Indicator className={classes.RadioGroupIndicator} />
						</RadioGroup.Item>
						<label className={classes.label} htmlFor="r1">
							<Image src="/images/1kom.png" alt="Primer držanja tela" width={50} height={50} />
							<div>
								<div className={classes.naslov}>{PRICE_CONFIG[priceKeys[0]!]!.quantity} PAKOVANJE</div>
							
									<br />
									<div className={classes.discountLabel}>30kom trakica</div>
									<br />
									<div className={classes.discountLabel2}>
										{PRICE_CONFIG[priceKeys[0]!]!.shipping > 0 
											? `+${PRICE_CONFIG[priceKeys[0]!]!.shipping}rsd dostava`
											: 'Besplatna dostava'
										}
									</div>
								</div>
							<span>
								<label style={{fontSize: '11px'}} className={classes.salePrice}>
									{PRICES_NO_DISCOUNT[0]} {CURRENCY}
								</label>
								<br />
								<div style={{fontSize: '18px'}} className="price">
									{PRICES[0]} {CURRENCY}
								</div>
							</span>
						</label>
					</div>
					
					{/* <div className={classes.bestOption}>
						<h2>ČESTA OPCIJA</h2>
					</div> */}
					
					<div className={classes.item}>
						<div className={classes.discountTag}>UŠTEDI -{savings.option2}rsd</div>
						<RadioGroup.Item className={classes.RadioGroupItem} value="1" id="r2">
							<RadioGroup.Indicator className={classes.RadioGroupIndicator} />
						</RadioGroup.Item>
						<label className={classes.label} htmlFor="r2">
							<Image src="/images/2kom.png" alt="Primer držanja tela" width={50} height={50} />
							<div>
								<div className={classes.naslov}>{PRICE_CONFIG[priceKeys[1]!]!.quantity} MESECA ZALIHA</div>
							
									<br />
									<div className={classes.discountLabel}>
										{Math.round(Number(priceKeys[1]) / (PRICE_CONFIG[priceKeys[1]!]!.quantity * 30))}rsd/dnevno
									</div>
									<br />
									<div className={classes.discountLabel2}>
										{PRICE_CONFIG[priceKeys[1]!]!.shipping > 0 
											? `+${PRICE_CONFIG[priceKeys[1]!]!.shipping}rsd dostava`
											: 'Besplatna dostava'
										}
									</div>
								</div>
							<span>
								<label style={{fontSize: '11px'}} className={classes.salePrice}>
									{PRICES_NO_DISCOUNT[1]} {CURRENCY}
								</label>
								<br />
								<div style={{fontSize: '18px'}} className="price">
									{PRICES[1]} {CURRENCY}
								</div>
							</span>
						</label>
					</div>

					<div className={classes.special}>
					
					<div className={classes.bestOption}>
						<h2>NAJVEĆA UŠTEDA</h2>
					</div>

					
				
						<div className={classes.item}>
							<div className={classes.discountTag}>UŠTEDI -{savings.option3}rsd</div>
							<RadioGroup.Item className={classes.RadioGroupItem1} value="2" id="r3">
								<RadioGroup.Indicator className={classes.RadioGroupIndicator} />
							</RadioGroup.Item>
							<label className={classes.label} htmlFor="r3">
								<Image src="/images/3kom.png" alt="Primer drzanja tela" width={50} height={50} />
								<div>
								<div className={classes.naslov}>{PRICE_CONFIG[priceKeys[2]!]!.quantity} MESECA ZALIHA</div>
							
									<br />
									<div className={classes.discountLabel}>
										{Math.round(Number(priceKeys[2]) / (PRICE_CONFIG[priceKeys[2]!]!.quantity * 30))}rsd/dnevno
									</div>
									<br />
									<div className={classes.discountLabel2}>
										{PRICE_CONFIG[priceKeys[2]!]!.shipping > 0 
											? `+${PRICE_CONFIG[priceKeys[2]!]!.shipping}rsd dostava`
											: 'Besplatna dostava'
										}
									</div>
								</div>
								<span>
									<label style={{fontSize: '11px'}} className={classes.salePrice}>
										{PRICES_NO_DISCOUNT[2]} {CURRENCY}
									</label>
									<br />
									<div style={{fontSize: '18px'}} className="price">
										{PRICES[2]} {CURRENCY}
									</div>
								</span>
							</label>
							
							<label className={classes.label} htmlFor="r3">
								
								<div className={classes.pokloni}>
									<div>
									<Image className={classes.pokloniImage} src="/images/poklon-noro.jpg" alt="Primer drzanja tela" width={45} height={45} />
										<div className={classes.naslov2}>Iznenadjenje #1</div>
										
										<div className={classes.discountLabel3}>Vrednost 1000rsd</div>
									</div>
									<div>
									<Image className={classes.pokloniImage} src="/images/poklon-noro.jpg" alt="Primer drzanja tela" width={45} height={45} />
										<div className={classes.naslov2}>Iznenadjenje #2</div>
									
										
										
										<div className={classes.discountLabel3}>Vrednost 700rsd</div>
									</div>
								</div>
								
							</label>
						</div>
					</div>
				</RadioGroup.Root>
			)}
		/>
	);
};

export default RadioGroupDemo;
