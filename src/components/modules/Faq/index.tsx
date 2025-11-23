import * as Accordion from '@radix-ui/react-accordion';
import React from 'react';

import {
	FAQ_CERTVRTI_ODGOVOR,
	FAQ_CETVRTI,
	FAQ_DRUGI,
	FAQ_DRUGI_ODGOVOR,
	FAQ_NULA,
	FAQ_NULA_ODGOVOR,
	FAQ_PRVI,
	FAQ_PRVI_ODGOVOR,
	FAQ_TRECI,
	FAQ_TRECI_ODGOVOR,
} from '@/lib/constants';

import {AccordionContent} from './content';
import classes from './styles.module.scss';
import {AccordionTrigger} from './trigger';

const Faq = () => (
	<section className={classes.faq}>
		<div className={classes.wrapper}>
			<Accordion.Root collapsible className={classes.AccordionRoot} type="single">
				<Accordion.Item className={classes.AccordionItem} value="item-1">
					<AccordionTrigger>{FAQ_NULA}</AccordionTrigger>
					<AccordionContent>{FAQ_NULA_ODGOVOR}</AccordionContent>
				</Accordion.Item>

				<Accordion.Item className={classes.AccordionItem} value="item-2">
					<AccordionTrigger>{FAQ_PRVI}</AccordionTrigger>
					<AccordionContent>{FAQ_PRVI_ODGOVOR}</AccordionContent>
				</Accordion.Item>

				<Accordion.Item className={classes.AccordionItem} value="item-3">
					<AccordionTrigger>{FAQ_DRUGI}</AccordionTrigger>
					<AccordionContent>{FAQ_DRUGI_ODGOVOR}</AccordionContent>
				</Accordion.Item>

				<Accordion.Item className={classes.AccordionItem} value="item-4">
					<AccordionTrigger>Na koji način radi trakica?</AccordionTrigger>
					<AccordionContent>Jednostavan odgovor, napravljene su da u obliku zbog koga pokušavaju da se vrate u svoj prvobitan položaj i time proširi nosne kanale i olakšava disanje.</AccordionContent>
				</Accordion.Item>
				
				


				<Accordion.Item className={classes.AccordionItem} value="item-5">
					<AccordionTrigger>{FAQ_TRECI}</AccordionTrigger>
					<AccordionContent>{FAQ_TRECI_ODGOVOR}</AccordionContent>
				</Accordion.Item>

				<Accordion.Item className={classes.AccordionItem} value="item-6">
					<AccordionTrigger>{FAQ_CETVRTI}</AccordionTrigger>
					<AccordionContent>{FAQ_CERTVRTI_ODGOVOR}</AccordionContent>
				</Accordion.Item>
			</Accordion.Root>
		</div>
	</section>
);

export default Faq;
