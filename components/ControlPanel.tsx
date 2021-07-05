import Link from 'next/link';
import React, { useContext } from 'react';

import { useAuth } from '../contexts/auth';
import { GuildContext } from '../contexts/guild';
import { ControlSideBar } from './control/ControlSidebar';
import Layout from './Layout';

interface Props {
	children?: any;
	right?: any;
}

const ControlPanel = (props: Props) => {
	const guild = useContext(GuildContext);
	const user = useAuth();
	// const router = useRouter();

	if (!user) {
		console.error('NO AUTH');
		return <Layout>Not authenticated</Layout>;
	}

	if (user && !guild) {
		return (
			<Layout>
				<p className="animate-pulse">Loading</p>
			</Layout>
		);
	}

	if (!guild?.hasFerris) {
		return (
			<Layout
				title={`${
					guild?.name || 'Guild Management'
				} | Ferris Control Panel`}
			>
				<div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
					<div className="bg-green-500 rounded-lg shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
						<div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
							<div className="lg:self-center">
								<h2 className="text-3xl font-extrabold text-white sm:text-4xl">
									<span className="block">
										Ferris is not in this Guild.
									</span>
									<span className="block">Add it here.</span>
								</h2>
								<p className="mt-4 text-lg leading-6 text-green-100">
									Power up your Discord Server with Ferris,
									management, utilities, and more.
								</p>
								<Link
									href={
										'https://discord.com/api/oauth2/authorize?client_id=637804742935838751&permissions=2134207679&scope=bot&guild_id=' +
										guild?.id
									}
								>
									<a className="mt-8 bg-white border border-transparent rounded-md shadow px-5 py-3 inline-flex items-center text-base font-medium text-green-600 hover:bg-green-50">
										Add Ferris
									</a>
								</Link>
								<Link href="/control">
									<a className="mt-8 ml-2 bg-white rounded-md px-5 py-3 inline-flex items-center text-base font-medium text-green-600 hover:bg-green-50">
										Go Back
									</a>
								</Link>
							</div>
						</div>
						<div className="-mt-6 aspect-w-5 aspect-h-3 md:aspect-w-2 md:aspect-h-1">
							<img
								className="transform translate-x-6 translate-y-6 rounded-md object-cover object-left-top sm:translate-x-16 lg:translate-y-20"
								src="/img/cta.png"
								alt="App screenshot"
							/>
						</div>
					</div>
				</div>
			</Layout>
		);
	}

	if (guild?.blocked) {
		return (
			<Layout>
				<p className="">Access Denied</p>
			</Layout>
		);
	}

	// In guild view
	return (
		<>
			<Layout
				title={`${
					guild?.name || 'Guild Management'
				} | Ferris Control Panel`}
				header={false}
				footer={false}
			>
				<ControlSideBar>{props.children}</ControlSideBar>
			</Layout>
		</>
	);
};

export default ControlPanel;
