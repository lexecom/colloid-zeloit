import {useEffect, useState} from 'react';

import {Button} from '../Button';
import classes from './styles.module.scss';

interface FloatingOrderButtonProps {
	onScrollToForm: () => void;
}

export default function FloatingOrderButton({onScrollToForm}: FloatingOrderButtonProps) {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			// Check if form is visible in viewport
			const formElement = document.querySelector('[data-form-section]');
			if (formElement) {
				const rect = formElement.getBoundingClientRect();
				const windowHeight = window.innerHeight;

				// Form is considered "in view" if any part of it is visible
				const formInView = rect.bottom > 0 && rect.top < windowHeight;

				// Show button ONLY when form is NOT visible AND user has scrolled at least a bit
				const scrollPosition = window.scrollY;
				const hasScrolled = scrollPosition > 200;

				// Simple logic: show if scrolled and form not visible
				setIsVisible(hasScrolled && !formInView);
			}
		};

		// Initial check
		handleScroll();

		// Add scroll listener
		window.addEventListener('scroll', handleScroll, {passive: true});

		// Cleanup
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const handleClick = () => {
		onScrollToForm();
	};

	return (
		<div
			className={`${classes.floatingButton} ${isVisible ? classes.visible : classes.hidden}`}
		>
			<Button
				onClick={handleClick}
				size="lg"
				className={classes.button}
			>
				👉 PORUČI SADA I ISPROBAJ NORO
			</Button>
		</div>
	);
}
