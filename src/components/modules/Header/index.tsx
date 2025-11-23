import Image from 'next/image';
import Link from 'next/link';

import classes from './styles.module.scss';

export default function Header() {
	return (
		<section className={classes.header}>
			<Link href="/">
				<Image src="/images/noro-logo.svg" alt="Noro Logo" width={200} height={35} />
			</Link>
		</section>
	);
}
