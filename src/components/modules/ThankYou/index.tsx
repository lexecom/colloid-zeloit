import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import classes from './styles.module.scss';

export default function ThankYou() {
	const router = useRouter();
	const [currentStep, setCurrentStep] = useState(0);

	useEffect(() => {
		// Debug: log all query parameters
		console.log('URL Query:', router.query);

		// Get URL parameters with shortened codes
		const { gs, tm, oid } = router.query;

		// Only log if we have query parameters (avoid logging on initial load)
		if (Object.keys(router.query).length > 0) {
			// Console log with cryptic messages (shortened so nobody knows what they mean)
			if (gs === '1') {
				console.log('DB-OK'); // Google Sheets success
			} else if (gs === '0') {
				console.log('DB-ERR'); // Google Sheets failed
			}

			if (tm === '1') {
				console.log('WH-OK'); // TopOMS webhook success
			} else if (tm === '0') {
				console.log('WH-ERR'); // TopOMS webhook failed
			}

			if (oid) {
				console.log('ID:', oid); // Order ID for reference
			}
		}
	}, [router.query, router.isReady]);

	// Animation sequence for order processing steps
	useEffect(() => {
		// Set Pakovanje as the current active step immediately
		setCurrentStep(2); // This makes Potvrđeno completed, Pakovanje active, others pending
	}, []);

	const steps = [
		{ icon: '✓', text: 'Potvrđeno', desc: 'Vaša porudžbina' },
		{ icon: '📦', text: 'Pakovanje', desc: 'Priprema proizvoda' },
		{ icon: '🚚', text: 'Dostava', desc: 'Slanje u toku' },
		{ icon: '✨', text: 'Ispruka', desc: 'Lakše disanje' }
	];

	return (
		<section className={classes.ty}>
			<div className={classes.container}>
				{/* Elegant success icon */}
				<div className={classes.successIcon}>
					<Image
						src="/images/check-blue.gif"
						alt="Success"
						width={120}
						height={120}
						className={classes.checkImage}
					/>
				</div>

				{/* Main content */}
				<div className={classes.content}>
					<h1 className={classes.title}>Uspešna Porudžbina!</h1>

					<div className={classes.subtitle}>
						<span className={classes.breathingDot}></span>
						<p>Vaš put ka lakšem disanju je započet</p>
					</div>

					{/* Progress steps */}
					<div className={classes.progressSteps}>
						{steps.map((step, index) => (
							<div
								key={index}
								className={`${classes.progressStep} ${
									currentStep > index ? classes.completed : ''
								} ${currentStep === index + 1 ? classes.active : ''}`}
							>
								<div className={classes.stepNumber}>
									{currentStep > index ? '✓' : index + 1}
								</div>
								<div className={classes.stepInfo}>
									<span className={classes.stepTitle}>{step.text}</span>
									<span className={classes.stepDesc}>{step.desc}</span>
								</div>
							</div>
						))}
					</div>

					{/* Product info with subtle breathing */}
					<div className={classes.productInfo}>
						<div className={classes.productBox}>
							<div className={classes.productIcon}>📦</div>
							<div className={classes.productDetails}>
								<p>Trudimo se da sve pakete spakujemo <b>u što kraćem roku</b>. Obavestićemo Vas putem SMS poruke kada paket preuzme kruriska služba.</p>
							</div>
						</div>
					</div>

					{/* Final message */}
					<div className={classes.finalText}>
						<p><strong>Hvala vam što kupujete kod nas.</strong></p>
						<p className={classes.deliveryNote}>
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
