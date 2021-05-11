import { Switch } from '@headlessui/react';
import classNames from 'classnames';
import React, { FC } from 'react';
import { useContext } from 'react';

import { AutomodTabs } from '../../../../components/control/AutomodWrapper';
import ControlPanel from '../../../../components/ControlPanel';
import { ConfigContext, GuildContext } from '../../../../contexts/guild';
import { db } from '../../../../utils/auth/firebase';

const DataPanel: FC = () => {
	return (
		<div>
			<div>
				<h3 className="text-lg leading-6 font-medium">Automod Data</h3>
			</div>
			<div className="mt-5 border-t border-gray-700">
				<dl className="sm:divide-y sm:divide-gray-700">
					<div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
						<dt className="text-sm font-medium text-gray-300">
							Just kidding
						</dt>
						<dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
							Under Construction
						</dd>
					</div>
				</dl>
			</div>
		</div>
	);
};

const AutomodToggle = () => {
	const config = useContext(ConfigContext);
	const guild = useContext(GuildContext);

	const enabled = config?.automod?.enabled || false;

	return (
		<Switch.Group as="div" className="flex items-center justify-between">
			<Switch.Label as="span" className="flex-grow flex flex-col" passive>
				<span className="text-sm font-medium">Toggle Automod</span>
				<span className="text-sm text-gray-500">
					Automod can be disabled and configured at the same time.
				</span>
			</Switch.Label>
			<Switch
				checked={enabled}
				onChange={() => {
					if (guild) {
						db.collection('configs')
							.doc(guild.id)
							.set(
								{ automod: { enabled: !enabled } },
								{ merge: true }
							);
					}
				}}
				className={classNames(
					enabled ? 'bg-green-600' : 'bg-gray-200',
					'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent border-gray-800 rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
				)}
			>
				<span className="sr-only">Use setting</span>
				<span
					className={classNames(
						enabled ? 'translate-x-5' : 'translate-x-0',
						'pointer-events-none relative inline-block h-5 w-5 rounded-full bg-gray-800 shadow transform ring-0 transition ease-in-out duration-200'
					)}
				>
					<span
						className={classNames(
							enabled
								? 'opacity-0 ease-out duration-100'
								: 'opacity-100 ease-in duration-200',
							'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity'
						)}
						aria-hidden="true"
					>
						<svg
							className="bg-gray-800 h-3 w-3 text-gray-400"
							fill="none"
							viewBox="0 0 12 12"
						>
							<path
								d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
								stroke="currentColor"
								strokeWidth={2}
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</span>
					<span
						className={classNames(
							enabled
								? 'opacity-100 ease-in duration-200'
								: 'opacity-0 ease-out duration-100',
							'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity'
						)}
						aria-hidden="true"
					>
						<svg
							className="bg-gray-800 h-3 w-3 text-green-600"
							fill="currentColor"
							viewBox="0 0 12 12"
						>
							<path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
						</svg>
					</span>
				</span>
			</Switch>
		</Switch.Group>
	);
};

interface Props {}

const AutomodIndex = (_props: Props) => {
	// const config = useContext(ConfigContext);

	return (
		<ControlPanel right={<DataPanel />}>
			<AutomodTabs />
			<div className="mt-2">
				<div>
					<h3 className="text-lg leading-6 font-medium text-green-300">
						General Config
					</h3>
					<p className="mt-1 text-sm text-gray-500">
						Automod may be a little complex to setup, but these
						settings are laid out to help.
					</p>
				</div>
				<div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
					<div className="sm:col-span-6">
						<AutomodToggle />
					</div>
				</div>
			</div>
		</ControlPanel>
	);
};

export default AutomodIndex;
