import {NOTIFY_DRUGI, NOTIFY_PRVI} from '@/lib/constants';

import classes from './styles.module.scss';

export default function Notify() {
	return (
		<section className={classes.notify}>
			<p>
				{NOTIFY_PRVI}
				<span>|</span>
				{NOTIFY_DRUGI}
			</p>
		</section>
	);
}
