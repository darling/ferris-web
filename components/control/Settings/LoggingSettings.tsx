import { groupBy, startCase } from 'lodash';
import { useContext, useEffect, useState } from 'react';
import { GuildContext } from '../../../contexts/guild';
import { LoggingTypes, typesAsArray } from '../../../interfaces/logging';
import { db } from '../../../utils/auth/firebase';
import ToggleSwitch from './../../ui/ToggleSwitch';
import { SmallHero } from './../../SmallHero';
import { GuildConfig } from '../../../interfaces/control';

export const LoggingSettings = ({ config }: { config: GuildConfig }) => {
	const guild = useContext(GuildContext);

	const [button, setButtonState] = useState(config?.logging?.enabled);

	useEffect(() => {
		setButtonState(config?.logging?.enabled);
	}, [config]);

	function toggleEnabled(type: boolean) {
		db.collection('configs')
			.doc(guild?.id)
			.set({ logging: { enabled: type } }, { merge: true })
			.catch((e) => {
				console.error(e);
			});
	}

	function toggleLogConfigProperty(type: LoggingTypes): void {
		const types: LoggingTypes[] = config?.logging?.subs || [];

		if (types.includes(type)) {
			types.splice(types.indexOf(type), 1);
		} else {
			types.push(type);
		}

		setNewLogConfig(types);
	}

	function breakCategories(logEvents: LoggingTypes[]) {
		return Object.entries(groupBy(logEvents, (t) => t.split('_')[0])).sort(
			(a, b) => b[1].length - a[1].length
		);
	}

	function setNewLogConfig(subs: LoggingTypes[]): void {
		db.collection('configs')
			.doc(guild?.id)
			.set({ logging: { subs: subs } }, { merge: true })
			.catch((e) => {
				console.error(e);
			});
	}

	if (!config?.logging) {
		return (
			<div className="sm:col-span-6">
				<SmallHero
					title="Please enable logging in your server."
					description="You need to enable logging initially through the 'setlogchannel' command. After that, you can change the settings here."
					href="/docs/commands"
				/>
			</div>
		);
	}

	return (
		<div className="sm:col-span-6">
			<div className="rounded-md bg-blue-50 p-4">
				<div className="flex">
					<div className="flex-shrink-0">
						<svg
							className="h-5 w-5 text-blue-400"
							data-todo-x-description="Heroicon name: solid/information-circle"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							aria-hidden="true"
						>
							<path
								fillRule="evenodd"
								d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
								clipRule="evenodd"
							></path>
						</svg>
					</div>
					<div className="ml-3 flex-1 md:flex md:justify-between">
						<p className="text-sm text-blue-700">
							Because of Discord's Support team, we are left
							hanging on some features such as muting, and
							specific logging. So just keep that in mind until
							Discord comes around and enables some permissions.
						</p>
					</div>
				</div>
			</div>
			<div className="rounded-md bg-blue-50 p-4 mt-2">
				<div className="flex">
					<div className="flex-shrink-0">
						<svg
							className="h-5 w-5 text-blue-400"
							data-todo-x-description="Heroicon name: solid/information-circle"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							aria-hidden="true"
						>
							<path
								fillRule="evenodd"
								d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
								clipRule="evenodd"
							></path>
						</svg>
					</div>
					<div className="ml-3 flex-1 md:flex md:justify-between">
						<p className="text-sm text-blue-700">
							Also this (the logging) UI will be redone soon.
						</p>
					</div>
				</div>
			</div>
			<p className="text-lg mt-2 tracking-wide mb-2 flex flex-row items-center">
				<ToggleSwitch
					toggleFunction={toggleEnabled}
					initialState={config?.logging?.enabled}
				/>
				Logging is currently {button ? 'enabled' : 'disabled'}.{' '}
			</p>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-2/3 md:mx-0 md:w-full">
				{breakCategories(typesAsArray).map((category) => {
					return (
						<div
							key={category[0]}
							className="bg-gray-800 p-2 rounded-lg"
						>
							<p className="font-bold text-2xl tracking-wider">
								{startCase(category[0].toLowerCase())}
							</p>
							<div className="flex flex-col gap-2 pt-2">
								{category[1].map((logType) => {
									return (
										<div
											key={logType}
											className="w-full flex flex-row items-center justify-between bg-gray-700 rounded-xl p-2"
										>
											<p>
												{startCase(
													logType
														.toLowerCase()
														.replace(
															category[0].toLowerCase(),
															''
														)
												)}
											</p>
											<ToggleSwitch
												toggleFunction={() => {
													toggleLogConfigProperty(
														logType
													);
												}}
												initialState={config?.logging?.subs?.includes(
													logType
												)}
											/>
										</div>
									);
								})}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};
