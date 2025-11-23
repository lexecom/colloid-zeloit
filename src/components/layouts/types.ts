import type {NextPage} from 'next';
import type {AppProps} from 'next/app';
import type {ReactElement, ReactNode} from 'react';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: ReactElement) => ReactNode;
};

export type SSRLoginProps = {
	({csrfToken}: {csrfToken: string}): JSX.Element;
	getLayout: (page: ReactElement) => JSX.Element;
};

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export interface AppPropsWithLayout extends Omit<AppProps, 'Component'> {
	Component: AppProps['Component'] & {
		Layout: JSX.Element;
	} & NextPageWithLayout;
	pageProps: {};
}

export type LayoutProps = {children: ReactElement};
