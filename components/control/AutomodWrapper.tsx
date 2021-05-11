import { Listbox, Transition } from '@headlessui/react';
import {
	AdjustmentsIcon,
	CheckIcon,
	ChevronDownIcon,
	LinkIcon,
	TagIcon,
} from '@heroicons/react/solid';
import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Fragment } from 'react';

const tabs = [
	{
		name: 'General',
		slug: 'automod',
		to: '',
		icon: AdjustmentsIcon,
		current: false,
	},
	{
		name: 'Words',
		slug: 'tags',
		to: 'tags',
		icon: TagIcon,
		current: false,
	},
	// {
	// 	name: 'Links',
	// 	slug: 'links',
	// 	to: 'links',
	// 	icon: LinkIcon,
	// 	current: false,
	// },
];

interface Props {
	children?: any;
}

function MobileSwitch() {
	const router = useRouter();

	const lastSlug = router.pathname.split('/').pop() || 'automod';

	const tabsWithCorrectCurrent = tabs.map((tab) => {
		if (tab.slug === lastSlug) return { ...tab, current: true };
		return tab;
	});

	const currentTab =
		tabsWithCorrectCurrent.find((tab) => tab.current) || tabs[0];

	return (
		<Listbox
			value={currentTab}
			onChange={(tab) => {
				if (tab)
					router.push({
						pathname: `/control/[id]/automod${
							tab.to ? '/' + tab.to : ''
						}`,
						query: { ...router.query },
					});
			}}
			as="div"
			className="flex flex-row justify-end"
		>
			{({ open }) => (
				<>
					<div className="relative">
						<div className="inline-flex shadow-sm rounded-md divide-x divide-green-600">
							<div className="relative z-0 inline-flex shadow-sm rounded-md divide-x divide-green-600">
								<div className="relative inline-flex items-center bg-green-500 py-2 pl-3 pr-4 rounded-l-md shadow-sm text-white">
									<currentTab.icon
										className="h-5 w-5"
										aria-hidden="true"
									/>
									<p className="ml-2.5 text-sm font-medium">
										{currentTab?.name}
									</p>
								</div>
								<Listbox.Button className="relative inline-flex items-center bg-green-500 p-2 rounded-l-none rounded-r-md text-sm font-medium text-white hover:bg-green-600 focus:outline-none focus:z-10 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-green-500">
									<span className="sr-only">
										Change published status
									</span>
									<ChevronDownIcon
										className="h-5 w-5 text-white"
										aria-hidden="true"
									/>
								</Listbox.Button>
							</div>
						</div>

						<Transition
							show={open}
							as={Fragment}
							leave="transition ease-in duration-100"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Listbox.Options
								static
								className="z-10 origin-top-right absolute right-0 mt-2 w-72 rounded-md shadow-lg overflow-hidden bg-gray-800 divide-y divide-gray-900 ring-1 ring-black ring-opacity-5 focus:outline-none"
							>
								{tabsWithCorrectCurrent.map((option) => (
									<Listbox.Option
										key={option.name}
										className={({ active }) =>
											classNames(
												active
													? 'text-white bg-green-500'
													: 'text-green-300',
												'cursor-default select-none relative p-4 text-sm'
											)
										}
										value={option}
									>
										{({ selected, active }) => (
											<div className="flex flex-col">
												<div className="flex justify-between">
													<p
														className={
															selected
																? 'font-semibold'
																: 'font-normal'
														}
													>
														{option.name}
													</p>
													{selected ? (
														<span
															className={
																active
																	? 'text-white'
																	: 'text-green-500'
															}
														>
															<CheckIcon
																className="h-5 w-5"
																aria-hidden="true"
															/>
														</span>
													) : null}
												</div>
											</div>
										)}
									</Listbox.Option>
								))}
							</Listbox.Options>
						</Transition>
					</div>
				</>
			)}
		</Listbox>
	);
}

export const AutomodTabs = (_props: Props) => {
	const router = useRouter();

	const lastSlug = router.pathname.split('/').pop() || 'automod';

	const tabsWithCorrectCurrent = tabs.map((tab) => {
		if (tab.slug === lastSlug) return { ...tab, current: true };
		return tab;
	});

	return (
		<div>
			<div className="sm:hidden">
				<label htmlFor="tabs" className="sr-only">
					Select a tab
				</label>
				<MobileSwitch />
			</div>
			<div className="hidden sm:block">
				<div className="border-b border-gray-700">
					<nav className="-mb-px flex space-x-8" aria-label="Tabs">
						{tabsWithCorrectCurrent.map((tab) => (
							<Link
								key={tab.name}
								href={{
									pathname: '/control/[id]/automod/' + tab.to,
									query: router.query,
								}}
							>
								<a
									className={classNames(
										tab.current
											? 'border-green-500 text-green-600'
											: 'border-gray-700 text-gray-500 hover:text-gray-300 hover:border-gray-300',
										'group inline-flex items-center py-4 px-1 border-b font-medium text-sm'
									)}
									aria-current={
										tab.current ? 'page' : undefined
									}
								>
									<tab.icon
										className={classNames(
											tab.current
												? 'text-green-500'
												: 'text-gray-500 group-hover:text-gray-300',
											'-ml-0.5 mr-2 h-5 w-5'
										)}
										aria-hidden="true"
									/>
									<span>{tab.name}</span>
								</a>
							</Link>
						))}
					</nav>
				</div>
			</div>
		</div>
	);
};
