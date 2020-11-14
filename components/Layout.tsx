import React, { ReactNode } from 'react';
import Head from 'next/head';
import Header from './default/Header';
import Footer from './default/Footer';
import { CustomHead } from './default/Head';

type Props = {
	children?: ReactNode;
	title?: string;
	colorOverride?: string;
};

const Layout = ({
	children,
	title = 'Ferris Bot — A Discord bot for protecting your community.',
	colorOverride,
}: Props) => (
	<div className={colorOverride || 'bg-gray-900 text-green-100'}>
		<Head>
			<title>{title}</title>

			<meta charSet="utf-8" />
			<meta
				name="viewport"
				content="initial-scale=1.0, width=device-width"
			/>
		</Head>
		<CustomHead title={title} />
		<Header />
		<div className="container mx-auto min-h-screen">{children}</div>
		<Footer />
	</div>
);

export default Layout;
