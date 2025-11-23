// 'use client';

// import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
// import {Check} from 'lucide-react';
// import * as React from 'react';
// import type {Control, FieldValues, Path} from 'react-hook-form';
// import {Controller} from 'react-hook-form';

// import classes from './styles.module.scss';

// export type CheckboxProps<TFormValues extends FieldValues> = {
// 	name: Path<TFormValues>;
// 	control: Control<TFormValues>;
// 	children?: React.ReactNode;
// };

// const Checkbox = <TFormValues extends Record<string, unknown>>(props: CheckboxProps<TFormValues>) => {
// 	const {name, control} = props;

// 	return (
// 		<Controller
// 			control={control}
// 			name={name}
// 			render={({field: {onChange}}) => (
// 				<CheckboxPrimitive.Root
// 					className={classes.checkbox}
// 					defaultChecked={false}
// 					id={name}
// 					onCheckedChange={onChange as (value: boolean) => void}
// 				>
// 					<CheckboxPrimitive.Indicator className={classes.indicator}>
// 						<Check color="#fff" size={20} />
// 					</CheckboxPrimitive.Indicator>
// 				</CheckboxPrimitive.Root>
// 			)}
// 		/>
// 	);
// };
// Checkbox.displayName = CheckboxPrimitive.Root.displayName;

// export {Checkbox};
