import Header from './default/Header';
import Footer from './default/Footer';
import { CustomHead } from './default/Head';
import { FC } from 'react';

type Props = {
	title?: string;
	colorOverride?: string;
	headerClassName?: string;
	linkClassName?: string;
	header?: boolean;
	footer?: boolean;
};

const Layout: FC<Props> = ({
	children,
	title = 'Ferris Bot — A Discord bot for protecting your community.',
	colorOverride,
	headerClassName,
	linkClassName,
	header = true,
	footer = true,
}) => {
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
