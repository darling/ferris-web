import { useContext } from 'react';

import ControlPanel from '../../../components/ControlPanel';
import { SectionHeading } from '../../../components/ui-atoms/SectionHeading';
import { GuildContext } from '../../../contexts/guild';

const ControlHome = () => {
	const guild = useContext(GuildContext);

	return (
		<ControlPanel>
			<SectionHeading heading="Control Panel Home" />
			<div className="py-4">
				<dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2">
					<div className="flex flex-col bg-gray-700 overflow-hidden shadow rounded-lg">
						<div className="flex-grow px-4 py-5 sm:p-6">
							<div className="flex items-center">
								<div className="flex-shrink-0 bg-green-500 rounded-md p-3">
									<svg
										className="h-6 w-6 text-white"
										data-todo-x-description="Heroicon name: outline/users"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										aria-hidden="true"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
										></path>
									</svg>
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
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-6 w-6 text-white"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
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
			</div>
		</ControlPanel>
	);
};

export default ControlHome;
