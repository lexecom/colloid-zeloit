import * as Accordion from '@radix-ui/react-accordion';
import React from 'react';

import classes from './styles.module.scss';

export const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
	({children, ...props}, forwardedRef) => (
		<Accordion.Content className={classes.AccordionContent} {...props} ref={forwardedRef}>
			<div className={classes.AccordionContentText}>{children}</div>
		</Accordion.Content>
	),
);

type AccordionContentProps = {
	children: React.ReactNode;
};

AccordionContent.displayName = 'AccordionContent';
