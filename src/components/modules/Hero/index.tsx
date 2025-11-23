import {Lock, People, TruckFast} from 'iconsax-react';
import Image from 'next/image';

// import dynamic from 'next/dynamic';
import {Button} from '@/components/elements/Button';
// import WatchingNow from '@/components/modules/WatchingNow';
import {HERO_BUTTON, HERO_ICONS} from '@/lib/constants';

import classes from './styles.module.scss';

type Props = {
	executeScroll: () => void;
};

// const Balancer = dynamic(() => import('react-wrap-balancer'), { ssr: false });

export default function Hero({executeScroll}: Props) {
	return (
		<section className={classes.hero}>
			<div className={classes.wrapper}>
				<div>
					<div className={classes.content}>
						<h1>PRODIŠI ZA SEKUND - DO 80% VIŠE KISEONIKA UZ NORO</h1>
						<p>
							Mali pokret – Velika razlika u disanju.
							<br></br>
							<b>Nema više</b> zapušenog nosa, hrkanja i pospanosti. <b>Jedino prirodno, instant</b> olakšanje za
							disanje.
						</p>
						<Button onClick={executeScroll}>{HERO_BUTTON}</Button>
					</div>
					{/* Watching Now Section */}
					{/* <WatchingNow /> */}

					<div className={classes.grid}>
						<div className={classes.icon}>
							<Lock size="50" color="#2B2B2B" variant="Bold" />
							<p>{HERO_ICONS[0]}</p>
						</div>
						<div className={classes.icon}>
							<TruckFast size="50" color="#2B2B2B" variant="Bold" />
							<p>{HERO_ICONS[1]}</p>
						</div>
						<div className={classes.icon}>
							<People size="50" color="#2B2B2B" variant="Bold" />
							<p>{HERO_ICONS[2]}</p>
						</div>
					</div>
				</div>
				<Image
					src="/images/hero-slika-001-2-noro-3.jpg"
					alt="SLika Proizvoda"
					width={360}
					height={360}
					priority
				/>
			</div>
		</section>
	);
}
