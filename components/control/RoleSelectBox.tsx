import { Listbox, Transition } from '@headlessui/react';
import { SelectorIcon, CheckIcon } from '@heroicons/react/solid';
import classNames from 'classnames';
import firebase from 'firebase';
import React, { useContext, Fragment, FC } from 'react';
import { GuildContext } from '../../contexts/guild';
import { db } from '../../utils/auth/firebase';

interface RoleSelectProps {
	children?: any;
	roleData: any;
	firebaseKey: string;
}

export const RoleSelectBox = (props: RoleSelectProps) => {
	const guild = useContext(GuildContext);

	const selectableRoles = Object.keys(guild?.roles || {}).map((roleId) => {
		const role = guild?.roles?.[roleId];
		return {
			label: role?.name || ':ERROR: non named role',
			value: roleId,
		};
	});

	return (
		<Listbox
			value={props.roleData}
			onChange={(newRole) => {
				if (!newRole) {
					db.collection('configs')
						.doc(guild?.id)
						.set(
							{
								[props.firebaseKey]:
									firebase.firestore.FieldValue.delete(),
							},
							{ merge: true }
						);
				} else {
					db.collection('configs')
						.doc(guild?.id)
						.set(
							{
								[props.firebaseKey]: newRole?.value,
							},
							{ merge: true }
						);
				}
			}}
		>
			{({ open }) => (
				<>
					<div className="mt-1 relative">
						<Listbox.Button className="bg-gray-800 relative w-full border border-gray-700 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm">
							<span
								className={classNames(
									'block truncate',
									props.roleData?.label
										? 'text-green-200'
										: 'text-gray-500'
								)}
							>
								{props.roleData?.label || 'Pick a role'}
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
								{selectableRoles.map((role) => (
									<Listbox.Option
										key={role.value}
										className={({ active }) =>
											classNames(
												active
													? 'text-gray-300 bg-green-600'
													: 'text-gray-300',
												'cursor-default select-none relative py-2 pl-3 pr-9'
											)
										}
										value={role}
									>
										{({ active }) => {
											const selected =
												props.roleData?.value ==
												role.value;
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
														{role.label}
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
