import {
	AtSymbolIcon,
	EmojiHappyIcon,
	InformationCircleIcon,
	UsersIcon,
} from '@heroicons/react/outline';
import Link from 'next/link';
import React, { useContext } from 'react';

import {
	ControlContent,
	ControlMainTitle,
} from '../../../components/control/ControlSidebar';
import ControlPanel from '../../../components/ControlPanel';
import { ConfigContext, GuildContext } from '../../../contexts/guild';

const ControlHome = () => {
	const guild = useContext(GuildContext);
	const config = useContext(ConfigContext);

	return (
		<ControlPanel>
			<ControlMainTitle>
				{guild?.name}{' '}
				<span className="text-green-100">Control Panel</span>
			</ControlMainTitle>
			{/* <ControlCard desc="heheeh" title="wowowo">
			</ControlCard> */}
			<ControlContent>
				<div className="rounded-md bg-blue-50 p-4">
					<div className="flex">
						<div className="flex-shrink-0">
							<InformationCircleIcon
								className="h-5 w-5 text-blue-400"
								aria-hidden="true"
							/>
						</div>
						<div className="ml-3 flex-1 md:flex md:justify-between">
							<p className="text-sm text-blue-700">
								Ferris is in beta, feel free to stop by the
								Discord and see what's new!
							</p>
							<p className="mt-3 text-sm md:mt-0 md:ml-6">
								<Link href="/discord">
									<a className="whitespace-nowrap font-medium text-blue-700 hover:text-blue-600">
										Details{' '}
										<span aria-hidden="true">&rarr;</span>
									</a>
								</Link>
							</p>
						</div>
					</div>
				</div>
			</ControlContent>
			<ControlContent>
				<h3 className="text-lg leading-6 font-medium text-green-200">
					Some Stats
				</h3>
				<dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
					<div className="flex flex-col bg-gray-700 overflow-hidden shadow rounded-lg">
						<div className="flex-grow px-4 py-5 sm:p-6">
							<div className="flex items-center">
								<div className="flex-shrink-0 bg-green-500 rounded-md p-3">
									<UsersIcon className="h-6 w-6 text-white"></UsersIcon>
								</div>
								<div className="ml-5 w-0 flex-1">
									<dt className="text-sm font-medium text-gray-200 truncate">
										Total Members
									</dt>
									<dd className="flex items-baseline">
										<div className="text-2xl font-semibold ">
											{guild?.member_count}
										</div>
									</dd>
								</div>
							</div>
						</div>
						<div className="bg-gray-800 px-4 py-4 sm:px-6">
							<div className="text-sm">
								That's a good amount of members!
								{/* <a
										href="/"
										className="font-medium text-green-600 hover:text-green-500"
									>
										{' '}
										View all
										<span className="sr-only">
											{' '}
											Total Member stats
										</span>
									</a> */}
							</div>
						</div>
					</div>

					<div className="flex flex-col bg-gray-700 overflow-hidden shadow rounded-lg">
						<div className="flex-grow px-4 py-5 sm:p-6">
							<div className="flex items-center">
								<div className="flex-shrink-0 bg-green-500 rounded-md p-3">
									<AtSymbolIcon className="h-6 w-6 text-white" />
								</div>
								<div className="ml-5 w-0 flex-1">
									<dt className="text-sm font-medium text-gray-200 truncate">
										Self Roles
									</dt>
									<dd className="flex items-baseline">
										<div className="text-2xl font-semibold ">
											{config?.selfrole?.length || 0}
										</div>
									</dd>
								</div>
							</div>
						</div>
						<div className="bg-gray-800 px-4 py-4 sm:px-6">
							<div className="text-sm">
								Wow!
								{/* <a
										href="/"
										className="font-medium text-green-600 hover:text-green-500"
									>
										{' '}
										View all
										<span className="sr-only">
											{' '}
											Total Member stats
										</span>
									</a> */}
							</div>
						</div>
					</div>

					<div className="flex flex-col bg-gray-700 overflow-hidden shadow rounded-lg">
						<div className="flex-grow px-4 py-5 sm:p-6">
							<div className="flex items-center">
								<div className="flex-shrink-0 bg-green-500 rounded-md p-3">
									<EmojiHappyIcon className="h-6 w-6 text-white"></EmojiHappyIcon>
								</div>
								<div className="ml-5 w-0 flex-1">
									<dt className="text-sm font-medium text-gray-200 truncate">
										Server Roles
									</dt>
									<dd className="flex items-baseline">
										<div className="text-2xl font-semibold ">
											{
												Object.keys(guild?.roles || {})
													.length
											}
										</div>

										<div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
											{/* <svg
												className="self-center flex-shrink-0 h-5 w-5 text-green-500"
												fill="currentColor"
												viewBox="0 0 20 20"
												aria-hidden="true"
											>
												<path
													fillRule="evenodd"
													d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
													clipRule="evenodd"
												></path>
											</svg> */}

											<span className="sr-only">
												Only using
											</span>
											{/* Placeholder for beta stat */}
										</div>
									</dd>
								</div>
							</div>
						</div>
						<div className="bg-gray-800 px-4 py-4 sm:px-6">
							<div className="text-sm">
								Wow! Useful stats soon^(tm)
								{/* <a
									href="/"
									className="font-medium text-green-600 hover:text-green-500"
								>
									{' '}
									View all
									<span className="sr-only">
										{' '}
										Avg. Open Rate stats
									</span>
								</a> */}
							</div>
						</div>
					</div>
				</dl>
			</ControlContent>
			<ControlContent>
				<h3 className="text-lg leading-6 font-medium text-green-200">
					Under Construction
				</h3>
				<div className="py-4">
					<div className="border-4 border-dashed border-gray-700 rounded-lg h-40" />
				</div>
			</ControlContent>
			<ControlContent>
				<h3 className="text-lg leading-6 font-medium text-green-200">
					Under Construction
				</h3>
				<div className="py-4">
					<div className="border-4 border-dashed border-gray-700 rounded-lg h-40" />
				</div>
			</ControlContent>
		</ControlPanel>
	);
};

export default ControlHome;
