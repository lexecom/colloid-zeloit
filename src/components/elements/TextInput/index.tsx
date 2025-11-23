import type {InputHTMLAttributes} from 'react';
import type {FieldValues, Path, RegisterOptions, UseFormRegister} from 'react-hook-form';

import classes from './styles.module.scss';

type Props<TFormValues extends FieldValues> = InputHTMLAttributes<HTMLInputElement> & {
	name: Path<TFormValues>;
	description?: string;
	errorMessage?: string | undefined;
	isFullWidth?: boolean;
	isDisabled?: boolean;
	rules?: RegisterOptions;
	register?: UseFormRegister<TFormValues>;
};

type TextInputProps<TFormValues extends FieldValues> = Omit<Props<TFormValues>, 'disabled'>;

const TextInput = <TFormValues extends Record<string, unknown>>(props: TextInputProps<TFormValues>): JSX.Element => {
	const {register, rules, isFullWidth, isDisabled, errorMessage, description, name, ...inputProps} = props;

	return (
		<div
			className={[classes.input, isDisabled ? classes.input__disabled : '', isFullWidth ? classes.input__fullWidth : '']
				.join(' ')
				.trim()}
		>
			<input id={name} disabled={isDisabled} {...register?.(name, rules)} {...inputProps} />
			{description && <div className={classes.description}>{description}</div>}
			{errorMessage && <div className={classes.error}>{errorMessage}</div>}
		</div>
	);
};

TextInput.displayName = 'TextInput';

export {TextInput, type TextInputProps};
