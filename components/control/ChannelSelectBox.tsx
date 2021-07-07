import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import classNames from 'classnames';
import React, { Fragment, useContext } from 'react';

import { GuildContext } from '../../contexts/guild';
import { Channel } from '../../interfaces/control';

interface ChannelSelectProps {
	children?: any;
	channelData: any;
	type?: string;
	id?: string;
	onChange: (newId: Channel) => void;
}

export const ChannelSelectBox = (props: ChannelSelectProps) => {
	const guild = useContext(GuildContext);

	const selectableChannels = Object.keys(guild?.channels || {})
		.map((channelId) => {
			const channel = guild?.channels?.[channelId];

			return {
				label: channel?.name || ':ERROR: non named channel',
				value: channelId,
				type: channel?.type,
			};
		})
		.filter((channel) => channel.type === 'text');

	return (
		<Listbox
			value={props.channelData}
			onChange={(newChannel) => {
				props.onChange(newChannel);
			}}
		>
			{({ open }) => (
				<>
					<div className="mt-1 relative">
						<Listbox.Button
							id={props.id}
							className="bg-gray-800 relative w-full border border-gray-700 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm"
						>
							<span
								className={classNames(
									'block truncate',
									props.channelData?.label
										? 'text-green-200'
										: 'text-gray-500'
								)}
							>
								{props.channelData?.label || 'Pick a channel'}
							</span>
							<span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
								<SelectorIcon
									className="h-5 w-5 text-gray-400"
									aria-hidden="true"
								/>
							</span>
						</Listbox.Button>

						<Transition
							show={open}
							as={Fragment}
							leave="transition ease-in duration-100"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Listbox.Options
								static
								className="absolute z-50 mt-1 w-full bg-gray-800 shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
							>
								<Listbox.Option
									className={({ active, selected }) =>
										classNames(
											selected ? 'hidden' : '',
											active
												? 'text-gray-200 bg-green-600'
												: 'text-gray-200',
											'cursor-default select-none relative py-2 pl-3 pr-9'
										)
									}
									value={undefined}
								>
									<b>NO ROLE</b>
								</Listbox.Option>
								{selectableChannels.map((channel) => (
									<Listbox.Option
										key={channel.value}
										className={({ active }) =>
											classNames(
												active
													? 'text-gray-300 bg-green-600'
													: 'text-gray-300',
												'cursor-default select-none relative py-2 pl-3 pr-9'
											)
										}
										value={channel}
									>
										{({ active }) => {
											const selected =
												props.channelData?.value ==
												channel.value;
											return (
												<>
													<span
														className={classNames(
															selected
																? 'font-semibold'
																: 'font-normal',
															'block truncate'
														)}
													>
														{channel.label}
													</span>

													{selected ? (
														<span
															className={classNames(
																active
																	? 'text-white'
																	: 'text-green-600',
																'absolute inset-y-0 right-0 flex items-center pr-4'
															)}
														>
															<CheckIcon
																className="h-5 w-5"
																aria-hidden="true"
															/>
														</span>
													) : null}
												</>
											);
										}}
									</Listbox.Option>
								))}
							</Listbox.Options>
						</Transition>
					</div>
				</>
			)}
		</Listbox>
	);
};
