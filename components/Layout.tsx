import { ReactNode } from 'react';
import Header from './default/Header';
import Footer from './default/Footer';
import { CustomHead } from './default/Head';

type Props = {
	children?: ReactNode;
	title?: string;
	colorOverride?: string;
	headerClassName?: string;
	linkClassName?: string;
	header?: boolean;
	footer?: boolean;
};

const Layout = ({
	children,
	title = 'Ferris Bot — A Discord bot for protecting your community.',
	colorOverride,
	headerClassName,
	linkClassName,
	header = true,
	footer = true,
}: Props) => {
	return (
		<div
			className={
				(colorOverride || 'bg-gray-900 text-green-100') +
				' overflow-hidden'
			}
		>
			<CustomHead title={title} />
			{header ? (
				<Header
					bgClassName={headerClassName}
					textClassName={linkClassName}
				/>
			) : (
				<></>
			)}
			<div className="mx-auto min-h-screen">{children}</div>
			{footer ? <Footer /> : <></>}
		</div>
	);
};

export default Layout;
