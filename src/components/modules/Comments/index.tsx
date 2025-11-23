import Image from 'next/image';

import classes from './styles.module.scss';

export default function Comments() {
	return (
		<section className={classes.comments}>
			<div className={classes.wrapper}>
				<div className={classes.grid}>
					<div className={classes.icon}>
						<Image src="/images/comment-1.png" alt="Primer drzanja tela" width={300} height={100} />
					</div>
					<div className={classes.icon}>
						<Image src="/images/comment-1.png" alt="Primer drzanja tela" width={300} height={100} />
					</div>
					<div className={classes.icon}>
						<Image src="/images/comment-1.png" alt="Primer drzanja tela" width={300} height={100} />
					</div>
				</div>
			</div>
		</section>
	);
}
