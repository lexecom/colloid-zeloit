import {TickSquare} from 'iconsax-react';
import Image from 'next/image';
import Balancer from 'react-wrap-balancer';

import {Button} from '@/components/elements/Button';
// import WatchingNow from '@/components/modules/WatchingNow';
import {CONSEQUENCES_BUTTON, CONSEQUENCES_CONCLUSION, CONSEQUENCES_LIST, CONSEQUENCES_TITLE} from '@/lib/constants';

import classes from './styles.module.scss';

type Props = {
	executeScroll: () => void;
};

export default function Consequences({executeScroll}: Props) {
	return (
		<section className={classes.consequences}>
			<div className={classes.wrapper}>
				<div className={classes.section}>
					<div className={classes.item}>
						<h1>{CONSEQUENCES_TITLE}</h1>
						<Image src="/images/benefiti-noro.jpg" alt="Slike Proizvoda" width={400} height={240} />

						{/* Watching Now Section */}
						{/* <WatchingNow /> */}
					</div>

					<div className={classes.list}>
						{CONSEQUENCES_LIST.map((item, index) => (
							<div key={index}>
								<TickSquare className={classes.kv} size="35" color="#4FB335" variant="Bold" />
								<h1>{item}</h1>
							</div>
						))}
					</div>
				</div>
				<h1>
					<Balancer>{CONSEQUENCES_CONCLUSION}</Balancer>
				</h1>
				<Button onClick={executeScroll}>{CONSEQUENCES_BUTTON}</Button>
			</div>
		</section>
	);
}
