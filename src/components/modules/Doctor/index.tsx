import Image from 'next/image';

import classes from './styles.module.scss';

export default function Doctor() {
	return (
		<section className={classes.doctor}>
			<div className={classes.wrapper}>
				<h1>Misljenje struke</h1>
				<p>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis magni, placeat earum iure hic expedita ad
					dolores suscipit asperiores dicta, consequatur, quo incidunt quidem? Molestias quas aspernatur nihil commodi
					praesentium.
				</p>
				<div className={classes.human}>
					<Image src="/images/doctor.png" alt="Image of doctor" width={60} height={60} />
					<div>
						<div>Predrag Zivkovic</div>
						<div>Lekar</div>
					</div>
				</div>
			</div>
		</section>
	);
}
