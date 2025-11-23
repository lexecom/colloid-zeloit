import '../styles/globals.scss';

import {Analytics} from '@vercel/analytics/react';
import Head from 'next/head';
import {useRouter} from 'next/router';
import Script from 'next/script';
import {useEffect} from 'react';

import {type AppPropsWithLayout} from '@/components/layouts/types';
import {APP_NAME} from '@/lib/constants';
import * as fbq from '@/lib/fpixel';
import * as ttq from '@/lib/tpixel';

function MyApp({Component, pageProps}: AppPropsWithLayout) {
	const getLayout = Component.getLayout ?? (page => page);
	const router = useRouter();

	useEffect(() => {
		// FB pixel
		fbq.pageview();

		const handleRouteChange = () => {
			fbq.pageview();
			ttq.pageview();
		};

		router.events.on('routeChangeComplete', handleRouteChange);

		return () => {
			router.events.off('routeChangeComplete', handleRouteChange);
		};
	}, [router.events]);

	return (
		<>
			<Head>
				<title>{APP_NAME}</title>
				<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
			</Head>
			<Script
				id="fb-pixel"
				strategy="afterInteractive"
				dangerouslySetInnerHTML={{
					__html: `
						!function(f,b,e,v,n,t,s)
						{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
						n.callMethod.apply(n,arguments):n.queue.push(arguments)};
						if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
						n.queue=[];t=b.createElement(e);t.async=!0;
						t.src=v;s=b.getElementsByTagName(e)[0];
						s.parentNode.insertBefore(t,s)}(window, document,'script',
						'https://connect.facebook.net/en_US/fbevents.js');
						fbq('init', ${fbq.FB_PIXEL_ID});
					`,
				}}
			/>
			<Script
				id="tt-pixel"
				strategy="afterInteractive"
				dangerouslySetInnerHTML={{
					__html: `
						!function (w, d, t) {
							w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];
							ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"];
							ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
							for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
							ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};
							ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=d.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=d.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
							
							ttq.load('${ttq.TT_PIXEL_ID}');
							ttq.page();
						}(window, document, 'ttq');
					`,
				}}
			/>
			{getLayout(<Component {...pageProps} />)}
			<Analytics />
		</>
	);
}

export default MyApp;
