import {Lock, People, Timer1, TruckFast} from 'iconsax-react';

import classes from './styles.module.scss';

export default function Icons() {
	return (
		<section className={classes.icons}>
			<div className={classes.wrapper}>
				<div className={classes.grid}>
					<div className={classes.icon}>
						<Timer1 size="60" color="#2B2B2B" variant="Broken" />
						<p>6 Meseci Garancije</p>
					</div>
					<div className={classes.icon}>
						<Lock size="60" color="#2B2B2B" variant="Broken" />
						<p>Plaćanje Pouzecem</p>
					</div>
					<div className={classes.icon}>
						<TruckFast size="60" color="#2B2B2B" variant="Broken" />
						<p>Brza Dostava</p>
					</div>
					<div className={classes.icon}>
						<People size="60" color="#2B2B2B" variant="Broken" />
						<p>1270+ Kupaca</p>
					</div>
				</div>
			</div>
		</section>
	);
}
