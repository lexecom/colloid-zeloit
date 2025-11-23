// eslint-disable-next-line simple-import-sort/imports
import type {ReactElement} from 'react';

import Header from '../modules/Header';
import Footer from '../modules/Footer';
import Notify from '../modules/Notify';
import {FontVariables} from './fonts';
import classes from './styles.module.scss';
import {type LayoutProps} from './types';

const DefaultLayout = ({children}: LayoutProps) => (
	<main className={[FontVariables, classes.main].join(' ').trim()}>
		<Notify />
		<Header />

		{children}

		<Footer />
	</main>
);

export const getLayout = (page: ReactElement) => <DefaultLayout>{page}</DefaultLayout>;
export default DefaultLayout;
