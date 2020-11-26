import { groupBy, startCase } from 'lodash';
import { useContext, useEffect, useState } from 'react';
import { GuildContext } from '../../../contexts/guild';
import { LoggingTypes, typesAsArray } from '../../../interfaces/logging';
import app from '../../../utils/auth/firebase';
import ToggleSwitch from './../../ui/ToggleSwitch';
import { SmallHero } from './../../SmallHero';

function logTypeToBit(type: LoggingTypes): number {
	const bit = 1 << typesAsArray.indexOf(type);
	return bit;
}

export const LoggingSettings = () => {
	const guild = useContext(GuildContext);
	const [button, setButtonState] = useState(
		guild?.config?.log_channel?.enabled
	);

	useEffect(() => {
		setButtonState(guild?.config?.log_channel?.enabled);
	}, [guild?.config]);

	function toggleEnabled(type: boolean) {
		app.database()
			.ref(`guilds/${guild!.id}/config/log_channel`)
			.update({ enabled: type })
			.catch((e) => {
				console.error(e);
			});
	}

	function toggleLogConfigProperty(type: LoggingTypes): void {
		const typeValue = logTypeToBit(type);

		const newSubs = (guild?.config?.log_channel?.subs || 0) ^ typeValue;

		setNewLogConfig(newSubs);
	}

	function breakCategories(logEvents: LoggingTypes[]) {
		return Object.entries(groupBy(logEvents, (t) => t.split('_')[0])).sort(
			(a, b) => b[1].length - a[1].length
		);
	}

	function setNewLogConfig(subs: number): void {
		app.database()
			.ref(`guilds/${guild!.id}/config/log_channel`)
			.update({ subs: subs })
			.catch((e) => {
				console.error(e);
			});
	}

	if (!guild?.config?.log_channel) {
		return (
			<>
				<div className="my-5">
					<h2 className="text-3xl font-bold tracking-wider mb-1">
						Logging
					</h2>
					<hr />
				</div>
				<SmallHero
					title="Please enable logging in your server."
					description="You need to enable logging initially through the 'setlogchannel' command. After that, you can change the settings here."
					href="/docs/commands"
				/>
			</>
		);
	}

	return (
		<div>
			<div className="my-5">
				<h2 className="text-3xl font-bold tracking-wider mb-1">
					Logging
				</h2>
				<hr />
			</div>
			<p className="text-lg tracking-wide mb-2 flex flex-row items-center">
				<ToggleSwitch
					toggleFunction={toggleEnabled}
					initialState={guild?.config?.log_channel?.enabled}
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
												initialState={
													(guild?.config?.log_channel
														?.subs || 0) &
													logTypeToBit(logType)
														? true
														: false
												}
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
