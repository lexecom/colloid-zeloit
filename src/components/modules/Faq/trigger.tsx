import * as Accordion from '@radix-ui/react-accordion';
import {ChevronDownIcon} from '@radix-ui/react-icons';
import classNames from 'classnames';
import React from 'react';

import classes from './styles.module.scss';

export const AccordionTrigger = React.forwardRef<
	HTMLButtonElement,
	React.ComponentProps<typeof Accordion.Trigger> & {children: React.ReactNode}
	// eslint-disable-next-line react/prop-types
>(({children, className, ...props}, forwardedRef) => (
	<Accordion.Header className={classes.AccordionHeader}>
		<Accordion.Trigger
			// className={classes.AccordionTrigger}
			className={classNames(classes.AccordionTrigger, className)}
			{...props}
			ref={forwardedRef}
		>
			{children}
			<ChevronDownIcon aria-hidden className={classes.AccordionChevron} />
		</Accordion.Trigger>
	</Accordion.Header>
));

AccordionTrigger.displayName = 'AccordionTrigger';
