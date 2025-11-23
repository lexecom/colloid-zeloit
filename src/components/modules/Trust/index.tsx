import Image from 'next/image';

import {TRUST_NASLOV_ZADOVOLJNI_KUPCI} from '@/lib/constants';

import classes from './styles.module.scss';

export default function Trust() {
	return (
		<section className={classes.trust}>
			<div className={classes.wrapper}>
				<h1>{TRUST_NASLOV_ZADOVOLJNI_KUPCI}</h1>
				<div className={classes.imageContainer}>
				<Image src="/images/utisci-noro1-2.jpg" alt="Zadovoljni Kupci" width={380} height={380} />
					
					<Image src="/images/bojkovic-ads.jpg" alt="Zadovoljni Kupci" width={380} height={380} />
				</div>
			</div>
		</section>
	);
}
