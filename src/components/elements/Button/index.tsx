import {type ButtonHTMLAttributes, forwardRef} from 'react';

import classes from './styles.module.scss';

// Simple spinner component
const Spinner = () => (
	<svg
		className={classes.spinner}
		width="16"
		height="16"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<circle
			cx="12"
			cy="12"
			r="10"
			stroke="currentColor"
			strokeWidth="4"
			strokeLinecap="round"
			strokeDasharray="32"
			strokeDashoffset="32"
		>
			<animate
				attributeName="stroke-dasharray"
				dur="2s"
				values="0 32;16 16;0 32;0 32"
				repeatCount="indefinite"
			/>
			<animate
				attributeName="stroke-dashoffset"
				dur="2s"
				values="0;-16;-32;-32"
				repeatCount="indefinite"
			/>
		</circle>
	</svg>
);

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
	size?: 'xs' | 'sm' | 'md' | 'lg';
	variant?: 'contained' | 'outlined' | 'text';
	isDisabled?: boolean;
	isFullWidth?: boolean;
	isCompact?: boolean;
	isUpperCase?: boolean;
	isLoading?: boolean;
};

type ButtonProps = Omit<Props, 'disabled'>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
	const {
		children,
		size = 'md',
		variant = 'contained',
		isDisabled,
		isFullWidth,
		isCompact,
		isUpperCase,
		isLoading,
		...buttonProps
	} = props;

	return (
		<button
			ref={ref}
			disabled={isDisabled || isLoading}
			className={[
				classes.button,
				classes[size ? `button__size--${size}` : ''],
				classes[variant ? `button__variant--${variant}` : ''],
				classes[isFullWidth ? 'button__fullWidth' : ''],
				classes[isCompact ? 'button__compact' : ''],
				classes[isUpperCase ? 'button__uppercase' : ''],
				classes[isLoading ? 'button__loading' : ''],
			]
				.join(' ')
				.trim()}
			{...buttonProps}
		>
			{isLoading ? (
				<span className={classes.loadingContent}>
					<Spinner />
					<span className={classes.loadingText}>
						{children}
					</span>
				</span>
			) : (
				children
			)}
		</button>
	);
});

Button.displayName = 'Button';

export {Button, type ButtonProps};
