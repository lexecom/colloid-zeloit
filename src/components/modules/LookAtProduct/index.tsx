import 'swiper/css';

import Image from 'next/image';
import {useRef, useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';

import {Button} from '@/components/elements/Button';

// import {
// 	LOOK_AT_PRODUCT_BUTTON,
// } from '@/lib/constants';
import classes from './styles.module.scss';

type Props = {
	executeScroll: () => void;
};

export default function LookAtProduct({executeScroll}: Props) {
	const [activeStep, setActiveStep] = useState(0);
	const swiperRef = useRef<any>(null);

	return (
		<section className={classes.look}>
			<div className={classes.wrapper}>
				<h1>Revolucija u Disanju na Nos!</h1>
				{/*<h1>EVO REŠENJA</h1>*/}
				<h1>Noro trakice su rešenje za sve probleme. Zato, Otključaj Nos - Zalepi Slobodu!</h1>
				<div className={classes.look__container}>
					<div className={[classes.look__section, classes.look__section__reverse].join(' ')}>
						<div className={classes.look__item}>
							<h1>Kako Noro trakice rade?</h1>
							<div>
								Jednostavan odgovor, napravljene su da u obliku zbog koga pokušavaju da se vrate u svoj prvobitan
								položaj i time proširi nosne kanale i olakšava disanje.
							</div>
							<Button onClick={executeScroll}>ISPROBAJ NORO</Button>
						</div>
						<div>
							<Image src="/images/noro-slika-02-hp.jpg" alt="Prednost1" width={500} height={500} />
						</div>
					</div>
					<div className={classes.look__section}>
						<div>
							<Image src="/images/gif-prikaz-trakice.webp" alt="Prednost2" width={500} height={500} />
						</div>
						<div className={classes.look__item}>
							<h1>BreatheSkin™ Materijal</h1>
							<div>
								<b>- Jedini Premium Brend na Tržištu</b> - sa ovom tehnologijom i porama.
								<br></br>
								<br></br>
								<b>- Ultra tanka i providna trakica</b> - skoro neprimetna dok je nosiš
								<br></br>
								<br></br>
								<b>- Koža diše i nema iritacija</b> - zbog pora i BreatheSkin™ materijala
							</div>
							<Button onClick={executeScroll}>OTKLJUČAJ NOS - ZALEPI SLOBODU</Button>
						</div>
					</div>
					<div className={[classes.look__section, classes.look__section__reverse].join(' ')}>
						<div className={classes.look__item}>
							<h1>Instant Rezultat - do 80% Više Kiseonika</h1>
							<div>
								Mnogi misle da su trakice za nos <b>samo za ljude koji imaju devijaciju</b> ili neki drugi problem, ali
								posle stotine ispitanika smo došli do zaključka da <b>čak iako nemate specifičan problem</b>, NORO će
								vam olakšati život.
							</div>
							<Button onClick={executeScroll}>IZABERI NORO</Button>
						</div>
						<div>
							<Image src="/images/noro-slika-03-hp.jpg" alt="Prednost3" width={500} height={500} />
						</div>
					</div>
				</div>
			</div>
			{/* --- SLIDER SECTION START --- */}
			<section className={classes.sliderSection}>
				<h2 className={classes.sliderTitle}>KAKO SE KORISTI?</h2>
				<div className={classes.sliderBarWrapper}>
					<div className={classes.sliderBarLine}>
						<div className={classes.sliderBarSteps}>
							<div
								className={activeStep === 0 ? classes.sliderStep + ' ' + classes.active : classes.sliderStep}
								onClick={() => swiperRef.current?.slideTo(0)}
								style={{cursor: 'pointer'}}
							>
								01
							</div>
							<div
								className={activeStep === 1 ? classes.sliderStep + ' ' + classes.active : classes.sliderStep}
								onClick={() => swiperRef.current?.slideTo(1)}
								style={{cursor: 'pointer'}}
							>
								02
							</div>
							<div
								className={activeStep === 2 ? classes.sliderStep + ' ' + classes.active : classes.sliderStep}
								onClick={() => swiperRef.current?.slideTo(2)}
								style={{cursor: 'pointer'}}
							>
								03
							</div>
						</div>
					</div>
				</div>
				<Swiper
					spaceBetween={30}
					pagination={{clickable: true}}
					onSlideChange={swiper => setActiveStep(swiper.activeIndex)}
					className={classes.swiper}
					onSwiper={swiper => (swiperRef.current = swiper)}
				>
					<SwiperSlide>
						<div className={classes.slideCard}>
							<Image src="/images/kako-1.jpg" alt="Step 1" className={classes.slideCardImage} width={400} height={300} />
							<div className={classes.slideCardOverlay}>
								<div className={classes.slideCardStep}>01</div>
								<div className={classes.slideCardTitle}>Obrišeš Nos</div>
								<div className={classes.slideCardDesc}>Očisti se nos sa sapunom/alkoholom i vodom.</div>
							</div>
						</div>
					</SwiperSlide>
					<SwiperSlide>
						<div className={classes.slideCard}>
							<Image src="/images/kako-2.jpg" alt="Step 2" className={classes.slideCardImage} width={400} height={300} />
							<div className={classes.slideCardOverlay}>
								<div className={classes.slideCardStep}>02</div>
								<div className={classes.slideCardTitle}>Pozicioniraš Trakicu</div>
								<div className={classes.slideCardDesc}>
									Pre nego što je zalepiš, pozicioniraj je malo ispod sredine nosa.
								</div>
							</div>
						</div>
					</SwiperSlide>
					<SwiperSlide>
						<div className={classes.slideCard}>
							<Image src="/images/kako-3.jpg" alt="Step 3" className={classes.slideCardImage} width={400} height={300} />
							<div className={classes.slideCardOverlay}>
								<div className={classes.slideCardStep}>03</div>
								<div className={classes.slideCardTitle}>Zalepi i Zadrži</div>
								<div className={classes.slideCardDesc}>Zalepi trakicu i zadrži je par sekundi.</div>
							</div>
						</div>
					</SwiperSlide>
				</Swiper>
			</section>
		</section>
	);
}
