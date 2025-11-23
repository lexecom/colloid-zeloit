import Image from 'next/image';

import classes from './styles.module.scss';

export default function Gift() {
	return (
		<section className={classes.gift}>
			<div className={classes.wrapper}>
				<h1>Poklon iznenadjena za najbrze!</h1>
				<p>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis magni, placeat earum iure hic expedita ad
					dolores suscipit asperiores dicta, consequatur, quo incidunt quidem? Molestias quas aspernatur nihil commodi
					praesentium.
				</p>
				<Image src="/images/gift.png" alt="Image of man who is giving gift" width={100} height={150} />
			</div>
		</section>
	);
}
