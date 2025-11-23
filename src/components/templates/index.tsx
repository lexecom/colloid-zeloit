import {SpeedInsights} from '@vercel/speed-insights/next';
import dynamic from 'next/dynamic';
import {useRef} from 'react';

import FloatingOrderButton from '../elements/FloatingOrderButton';
// import Comments from '../modules/Comments';
import Consequences from '../modules/Consequences';
// import Doctor from '../modules/Doctor';
// import Gift from '../modules/Gift';
import Hero from '../modules/Hero';
// import Icons from '../modules/Icons';
import LookAtProduct from '../modules/LookAtProduct';
// import NumberHelp from '../modules/NumberHelp';
// import Offer from '../modules/Offer';
// import Reviews from '../modules/Reviews';
import Trust from '../modules/Trust';
// import NumberHelp from '../modules/NumberHelp';

const Form = dynamic(() => import('../modules/Form'));
const Faq = dynamic(() => import('../modules/Faq'));

export default function IndexTemplate() {
	const formId = useRef<null | HTMLFormElement>(null);

	const executeScroll = () => formId.current?.scrollIntoView({behavior: 'smooth'});

	return (
		<>
			<Hero executeScroll={executeScroll} />
			<LookAtProduct executeScroll={executeScroll} />
			<Trust />
			<Consequences executeScroll={executeScroll} />
			{/* <Doctor /> */}
			{/* <Reviews />
			`` */}
			{/* <Gift /> */}
			{/* <Offer /> */}
			{/* <Icons /> */}
			<Form id={formId} />
			{/* <Comments /> */}
			{/* <NumberHelp /> */}
			<Faq />
			<FloatingOrderButton onScrollToForm={executeScroll} />
			<SpeedInsights />
		</>
	);
}
