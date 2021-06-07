import { Disclosure, Switch, Transition } from '@headlessui/react';
import React, { FC, useContext } from 'react';
import classNames from 'classnames';
import { ConfigContext, GuildContext } from '../../contexts/guild';
import { db } from '../../utils/auth/firebase';
import firebase from 'firebase';

export const RoleToggleList: FC<{ className?: string }> = (props) => {
	const guild = useContext(GuildContext);
	const config = useContext(ConfigContext);

	console.log(guild);

	return (
		<Disclosure>
			{({ open }) => (
				<>
					<Disclosure.Button
						className={classNames(
							'bg-gray-800 rounded-md p-2',
							props.className
						)}
					>
						{open ? 'Hide' : 'Show'} Roles
					</Disclosure.Button>
					<div className="col-span-6">
						<Transition
							show={open}
							enter="transition duration-100 ease-out"
							enterFrom="transform scale-95 opacity-0"
							enterTo="transform scale-100 opacity-100"
							leave="transition duration-75 ease-out"
							leaveFrom="transform scale-100 opacity-100"
							leaveTo="transform scale-95 opacity-0"
						>
							<Disclosure.Panel className="grid grid-cols-1 sm:gap-y-6 gap-x-4 sm:grid-cols-2">
								{Object.keys(guild?.roles || {}).map(
									(role_id) => {
										if (role_id === guild?.id) return <></>;

										const enabled =
											!!config?.selfrole?.includes(
												role_id
											);

										return (
											<div
												key={role_id}
												className={classNames(
													'bg-gray-800 p-2 sm:rounded-md odd:bg-gray-700 sm:odd:bg-gray-800',
													'flex flex-row items-center justify-between'
												)}
											>
												<span>
													{guild?.roles?.[role_id]
														.name ||
														':ERROR: No name found?'}
												</span>
												<Switch
													checked={enabled}
													onChange={async (
														newState
													) => {
														await db
															.collection(
																'configs'
															)
															.doc(guild?.id)
															.set(
																{
																	selfrole:
																		newState
																			? firebase.firestore.FieldValue.arrayUnion(
																					role_id
																			  )
																			: firebase.firestore.FieldValue.arrayRemove(
																					role_id
																			  ),
																},
																{
																	merge: true,
																}
															);
													}}
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
																	strokeWidth={
																		2
																	}
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
											</div>
										);
									}
								)}
							</Disclosure.Panel>
						</Transition>
					</div>
				</>
			)}
		</Disclosure>
	);
};
