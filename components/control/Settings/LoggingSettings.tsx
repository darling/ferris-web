import { Switch } from '@headlessui/react';
import classNames from 'classnames';
import { groupBy, startCase } from 'lodash';
import { useContext } from 'react';

import { GuildContext } from '../../../contexts/guild';
import { GuildConfig } from '../../../interfaces/control';
import { LoggingTypes, typesAsArray } from '../../../interfaces/logging';
import { db } from '../../../utils/auth/firebase';
import { InfoWarningBubble } from '../../ui-atoms/InfoWarningBubble';
import { SmallHero } from './../../SmallHero';

function startsWithVowel(word: string) {
	return /[aeiou]/i.test(word[0]);
}

export const LoggingSettings = ({ config }: { config: GuildConfig }) => {
	const guild = useContext(GuildContext);

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

	if (!config?.logging || !config?.logging?.subs) {
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

	const enabled = config?.logging?.enabled || false;

	return (
		<div className="sm:col-span-6">
			<InfoWarningBubble>
				Discord is still getting back to us on certian features. Please
				understand if mute logs or punishment logs don't work yet.
			</InfoWarningBubble>
			<Switch.Group
				as="div"
				className="flex items-center justify-between my-2"
			>
				<Switch.Label
					as="span"
					className="flex-grow flex flex-col"
					passive
				>
					<span className="text-sm font-medium text-gray-300">
						Logging
					</span>
					<span className="text-sm text-gray-500">
						Enable and disable logging entirely using this setting.
					</span>
				</Switch.Label>
				<Switch
					checked={enabled}
					onChange={toggleEnabled}
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
			<ul className="divide-y divide-gray-800">
				{breakCategories(typesAsArray).map((category) => {
					const categoryLabel = startCase(category[0].toLowerCase());
					return (
						<li key={category[0]} className="py-4">
							{categoryLabel}
							{category[1].map((logType) => {
								const enabled = config?.logging?.subs?.includes(
									logType
								);

								const changeCallback = () => {
									toggleLogConfigProperty(logType);
								};

								const eventLabel = startCase(
									logType
										.toLowerCase()
										.replace(category[0].toLowerCase(), '')
								);

								if (enabled === undefined) return <>Error</>;

								return (
									<Switch.Group
										key={logType}
										as="div"
										className="flex items-center justify-between my-2"
									>
										<Switch.Label
											as="span"
											className="flex-grow flex flex-col"
											passive
										>
											<span className="text-sm font-medium text-gray-300">
												{eventLabel}
											</span>
											<span className="text-sm text-gray-500">
												When a
												{startsWithVowel(categoryLabel)
													? 'n'
													: ''}{' '}
												{categoryLabel.toLowerCase()}{' '}
												gives a
												{startsWithVowel(eventLabel)
													? 'n'
													: ''}{' '}
												"{eventLabel.replace('_', '')}"
												event.
											</span>
										</Switch.Label>
										<Switch
											checked={enabled}
											onChange={changeCallback}
											className={classNames(
												enabled
													? 'bg-green-600'
													: 'bg-gray-200',
												'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent border-gray-800 rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
											)}
										>
											<span className="sr-only">
												Use setting
											</span>
											<span
												className={classNames(
													enabled
														? 'translate-x-5'
														: 'translate-x-0',
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
							})}
						</li>
					);
				})}
			</ul>
		</div>
	);
};
