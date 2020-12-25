import React, { ReactNode } from 'react';
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
	<div
		className={
			(colorOverride || 'bg-gray-900 text-green-100 ') + 'overflow-hidden'
		}
	>
		<CustomHead title={title} />
		<Header />
		<div className="container mx-auto min-h-screen">{children}</div>
		<Footer />
	</div>
);

export default Layout;
