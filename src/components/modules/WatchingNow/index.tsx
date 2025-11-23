import {Eye} from 'iconsax-react';
import {useEffect, useState} from 'react';

import {MAX_PEOPLE_WATCHING} from '@/lib/constants';

import classes from './styles.module.scss';

export default function WatchingNow() {
	const [number, setNumber] = useState(0);

	useEffect(() => {
		if (number === 0) setNumber(Math.floor(Math.random() * (MAX_PEOPLE_WATCHING - 5 + 1) + 5));

		const interval = setInterval(() => {
			// Generate a random number between 5 and MAX_PEOPLE_WATCHING
			const newNumber = Math.floor(Math.random() * (MAX_PEOPLE_WATCHING - 5 + 1) + 5);
			if (newNumber !== number || newNumber !== 1) setNumber(newNumber);
		}, 6000);

		return () => clearInterval(interval);
	}, []);

	return (
		<section className={classes.watching}>
			<div className={classes.wrapper}>
				<Eye size={30} color={'#000000'} />
				<div className={classes.title}>
					<span>{number}</span> Ljudi je Trenutno na Sajtu!
				</div>
			</div>
		</section>
	);
}
