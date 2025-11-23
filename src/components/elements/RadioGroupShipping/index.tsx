// import * as RadioGroup from '@radix-ui/react-radio-group';
// import Image from 'next/image';
// import type {Control, FieldValues, Path} from 'react-hook-form';
// import {Controller} from 'react-hook-form';

// import {SHIPPING_PRICE} from '@/lib/constants';

// import classes from './styles.module.scss';

// export type RadioGroupShippingProps<TFormValues extends FieldValues> = {
// 	name: Path<TFormValues>;
// 	control: Control<TFormValues>;
// 	error?: string;
// 	children?: React.ReactNode;
// };

// const RadioGroupShipping = <TFormValues extends Record<string, unknown>>(
// 	props: RadioGroupShippingProps<TFormValues>,
// ) => {
// 	const {name, control} = props;
// 	return (
// 		<Controller
// 			control={control}
// 			name={name}
// 			render={({field: {onChange}}) => (
// 				<RadioGroup.Root
// 					className={classes.RadioGroupRoot}
// 					defaultValue={SHIPPING_PRICE[0]!}
// 					aria-label="View density"
// 					onValueChange={onChange as (value: string) => void}
// 				>
// 					{' '}
// 					<div className={classes.izaberiContainer}>
// 						<div className={classes.horizontalLine}></div>
// 						<p className={classes.izaberiText}>Izaberite model:</p>
// 					</div>
// 					<div className={classes.item}>
// 						<RadioGroup.Item className={classes.RadioGroupItem} value={SHIPPING_PRICE[0]!} id="p1">
// 							<RadioGroup.Indicator className={classes.RadioGroupIndicator} />
// 						</RadioGroup.Item>
// 						<label className={classes.label} htmlFor="p1">
// 							<Image src="/images/zlatni-model.png" alt="boja1" width={40} height={40} />

// 							<b>{SHIPPING_PRICE[0]}</b>
// 						</label>
// 					</div>
// 					<div className={classes.item}>
// 						<RadioGroup.Item className={classes.RadioGroupItem} value={SHIPPING_PRICE[1]!} id="p2">
// 							<RadioGroup.Indicator className={classes.RadioGroupIndicator} />
// 						</RadioGroup.Item>

// 						<label className={classes.label} htmlFor="p2">
// 							<Image src="/images/crni-model.png" alt="boja" width={40} height={40} />

// 							<b>{SHIPPING_PRICE[1]}</b>
// 						</label>
// 					</div>
// 				</RadioGroup.Root>
// 			)}
// 		/>
// 	);
// };

// export default RadioGroupShipping;
