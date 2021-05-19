import {
	BookOpenIcon,
	ChatIcon,
	PlusCircleIcon,
	TerminalIcon,
} from '@heroicons/react/solid';
import classNames from 'classnames';
import Link from 'next/link';
import React, { FC } from 'react';

import { Markdown } from '../../components/docs/components/Markdown';
import { DocsLayout, Section } from '../../components/docs/DocsLayout';

const actions = [
	{
		title: 'Commands',
		href: '/docs/commands',
		icon: BookOpenIcon,
		iconForeground: 'text-indigo-700',
		iconBackground: 'bg-indigo-50',
	},
	{
		title: 'Getting Started',
		href: '/docs/getting-started',
		icon: PlusCircleIcon,
		iconForeground: 'text-green-700',
		iconBackground: 'bg-green-50',
	},
	{
		title: 'Control Panel',
		href: '/control',
		icon: TerminalIcon,
		iconForeground: 'text-red-700',
		iconBackground: 'bg-red-50',
	},
	{
		title: 'Discord Server',
		href: '/discord',
		icon: ChatIcon,
		iconForeground: 'text-blue-700',
		iconBackground: 'bg-blue-50',
	},
];

const DocsHomeSidebar: FC = () => {
	return (
		<>
			<Section className="mb-4">Useful Links</Section>
			<div className="rounded-lg bg-gray-200 overflow-hidden shadow divide-y divide-gray-200 sm:divide-y-0 sm:grid sm:grid-cols-2 sm:gap-px">
				{actions.map((action, actionIdx) => (
					<Link key={action.title} href={action.href}>
						<div
							className={classNames(
								'cursor-pointer',
								actionIdx === 0
									? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none'
									: '',
								actionIdx === 1 ? 'sm:rounded-tr-lg' : '',
								actionIdx === actions.length - 2
									? 'sm:rounded-bl-lg'
									: '',
								actionIdx === actions.length - 1
									? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none'
									: '',
								'relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500'
							)}
						>
							<div>
								<span
									className={classNames(
										action.iconBackground,
										action.iconForeground,
										'rounded-lg inline-flex p-3 ring-4 ring-white'
									)}
								>
									<action.icon
										className="h-6 w-6"
										aria-hidden="true"
									/>
								</span>
							</div>
							<div className="mt-8">
								<h3 className="text-lg font-medium">
									<a className="focus:outline-none">
										{/* Extend touch target to entire panel */}
										<span
											className="absolute inset-0"
											aria-hidden="true"
										/>
										{action.title}
									</a>
								</h3>
								<p className="mt-2 text-sm text-gray-500">{}</p>
							</div>
							<span
								className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
								aria-hidden="true"
							>
								<svg
									className="h-6 w-6"
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
								</svg>
							</span>
							This is the link description
						</div>
					</Link>
				))}
			</div>
		</>
	);
};

const DocsHome: FC = () => {
	const data =
		"## Brief\n\nWelcome to Ferris Documentation Home. This page is for users looking for information on how to use the Ferris Documentation bot. For more information on what the bot does and why it's useful, please visit our [Home Page](/). \n\nIf you're still having trouble understanding this process, we have a troubleshooting section at the bottom of this page that may help!\n\n## Getting Started\n\nCheck out the [Getting Started](/docs/getting-started) guide in order to get started with Ferris.\n\n## Commands\n\nIf you want to be able to see the list of commands we offer, please check out the [Commands Page](/docs/commands)\n\n## Troubleshooting\n\nIn order to get the best support, please join the Discord Server and ask for help in the #help channel.\n\n- [Join Discord Server](/discord) \n\n## Thank you\n\n- [Support Ferris on Patreon](/patreon) \n\n- [Join Discord Server](/discord)\n\nThank you for taking the time to learn about how to use Ferris. We hope it helps your community!";
	return (
		<DocsLayout sidebar={<DocsHomeSidebar />}>
			<Markdown data={data} />
		</DocsLayout>
	);
};

export default DocsHome;
