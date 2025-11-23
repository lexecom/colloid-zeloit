import NextDocument, {Head, Html, Main, NextScript} from 'next/document';
import React from 'react';

import {APP_DESCRIPTION, APP_NAME, APP_URL} from '@/lib/constants';

class Document extends NextDocument {
	override render() {
		return (
			<Html lang="en">
				<Head>
					<meta name="author" content={APP_NAME} />
					<meta name="description" content={APP_DESCRIPTION} />

					{/* General */}
					<meta name="theme-color" content="#0b0b0b" media="(prefers-color-scheme: light)" />
					<meta name="theme-color" content="#0b0b0b" media="(prefers-color-scheme: dark)" />

					{/* iOS */}
					<meta name="apple-mobile-web-app-title" content={APP_NAME} />
					<meta name="apple-mobile-web-app-capable" content="yes" />
					<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

					{/* PWA */}
					<link href="/manifest.webmanifest" rel="manifest" />
					{/* <link
						rel="icon"
						sizes="96x96"
						href="/static/images/icons/icon-96.png"
					/>
					<link
						rel="apple-touch-icon"
						href="/static/images/icons/icon-512.png"
					/> */}

					{/* OG */}
					<meta property="og:type" content="website" />
					<meta property="og:url" content={`https://${APP_URL}`} />
					<meta property="og:title" content={APP_NAME} />
					<meta property="og:description" content={APP_DESCRIPTION} />
				<meta property="og:image" content={`https://noro.rs/images/featured.png`} />
					<meta property="og:image:secure_url" content={`https://noro.rs/images/featured.png`} />
					<meta property="og:image:width" content="1200" />
					<meta property="og:image:height" content="630" />
					<meta property="og:image:type" content="image/png" />
					<meta property="og:image:alt" content="Noro Trakice za Nos" />

					{/* Twitter */}
					<meta name="twitter:card" content="summary_large_image" />
					<meta property="twitter:domain" content={APP_URL} />
					<meta property="twitter:url" content={APP_URL} />
					<meta name="twitter:creator" content={`@${APP_NAME}`} />
					<meta name="twitter:title" content={APP_NAME} />
					<meta name="twitter:description" content={APP_DESCRIPTION} />
					{/* <meta name="twitter:image" content={`${APP_URL}/api/og`} /> */}
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default Document;
