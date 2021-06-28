import {
	AnnotationIcon,
	HeartIcon,
	RefreshIcon,
	QuestionMarkCircleIcon,
	ShieldCheckIcon,
	ClockIcon,
} from '@heroicons/react/outline';
import Link from 'next/link';
import React from 'react';

const features = [
	{
		name: 'Real-time',
		icon: ClockIcon,
		desc: 'The web-panel and bot share and react to information in near real-time.',
	},
	{
		name: 'Custom Commands',
		icon: AnnotationIcon,
		desc: 'Custom commands allow your community to display information in a convienent and powerful way.',
	},
	{
		name: 'Constant Updates',
		icon: RefreshIcon,
		desc: 'Ferris offers custom and free updates constantly with no downtime to the bot or website.',
	},
	{
		name: 'Advanced Security',
		icon: ShieldCheckIcon,
		desc: 'Top tier user-management commands to make sure that your community can be protected easily.',
	},
	{
		name: 'Wonderful Team',
		icon: HeartIcon,
		desc: "Ferris' team will make sure you get the features you want in your server.",
	},
	{
		name: 'Coming Soon...',
		icon: QuestionMarkCircleIcon,
		desc: (
			<>
				Ferris is still in development, join{' '}
				<Link href="/discord">
					<a className="hover:text-green-400 transition duration-200 text-gray-400">
						our Discord
					</a>
				</Link>{' '}
				and suggest ideas that contribute to our platform.
			</>
		),
	},
];

const HomeFeatures = () => {
	return (
		<div className="relative py-16 sm:py-24 lg:py-32">
			<div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
				<h2 className="text-base font-semibold tracking-wider text-green-600 uppercase">
					Manage easier
				</h2>
				<p className="mt-2 text-3xl font-extrabold text-gray-100 tracking-tight sm:text-4xl">
					Everything you need to run your community
				</p>
				<p className="mt-5 max-w-prose mx-auto text-xl text-gray-500">
					Ferris has a multitude of features that make it adaptable
					and powerful when protecting Discord communities.
				</p>
				<div className="mt-12">
					<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
						{features.map((feature) => (
							<div key={feature.name} className="pt-6">
								<div className="flow-root bg-gray-800 rounded-lg px-6 pb-8">
									<div className="-mt-6">
										<div>
											<span className="inline-flex items-center justify-center p-3 bg-green-500 rounded-md shadow-lg">
												<feature.icon
													className="h-6 w-6 text-white"
													aria-hidden="true"
												/>
											</span>
										</div>
										<h3 className="mt-8 text-lg font-medium text-gray-100 tracking-tight">
											{feature.name}
										</h3>
										<p className="mt-5 text-base text-gray-500">
											{feature.desc}
										</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export { HomeFeatures };
