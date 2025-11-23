import Image from 'next/image';

// import Link from 'next/link';
import classes from './styles.module.scss';

const Footer = () => (
	<footer className={classes.footer}>
		<div className={classes.wrapper}>
			<div className={classes.topSection}>
				<div className={classes.logo}>
				<Image src="/images/noro-logo.svg" alt="O Noro Logo" width={125} height={35} />
			</div>

				<div className={classes.contact}>
					<h3 className={classes.linksLabel}>KONTAKT</h3>
					<span className={classes.linkItem}>Noro d.o.o.</span>
					<span className={classes.linkItem}>PIB: 114925416</span>
					<a href="mailto:podrska@noro.rs" className={classes.linkItem}>
						Email: podrska@noro.rs
					</a>
					<span className={classes.linkItem}>SMS: 066/519/0277</span>
					<span className={classes.linkItem}>Radnim Danima 8-17h</span>
				</div>

					<div className={classes.socials}>
						<a href="https://www.tiktok.com/@noro.rs" aria-label="TikTok" className={classes.socialIcon}>
							<Image src="/images/tiktok.svg" alt="TikTok" width={40} height={40} />
						</a>
						<a href="https://www.instagram.com/noro.rs/" aria-label="Instagram" className={classes.socialIcon}>
							<Image src="/images/instagram.svg" alt="Instagram" width={40} height={40} />
						</a>
				</div>
			</div>

			<div className={classes.bottomSection}>
				<div className={classes.copyrightBlock}>
					<div className={classes.copyright}>COPYRIGHT ©2025 NORO DOO.</div>
					<div className={classes.disclaimer}>
						*Izjave nisu ocenjene od strane zdravstvenih institucija u Srbiji, istraživanja su radile strane kompanije.
						Noro trakice za nos nisu namenjene za lečenje, izlečenje ili prevenciju bilo koje bolesti ili zdravstvenog
						stanja. Informacije i saveti koje pruža Noro brend ne zamenjuju medicinski savet ili tretman. Rezultati
						upotrebe mogu varirati od osobe do osobe.
					</div>
				</div>
			</div>
		</div>
	</footer>
);

export default Footer;
