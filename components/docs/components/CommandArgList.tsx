import { Disclosure, Transition } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/solid';
import React, { FC } from 'react';
import { CommandArgument, ICommand } from '../../../interfaces/command';

import typedata from '../../../docs/typedata.json';
import classNames from 'classnames';

export const CommandArgList: FC<{ command: ICommand }> = (props) => {
	return (
		<div>
			{props.command.arguments?.map((arg) => {
				return <SingleArg arg={arg} />;
			})}
		</div>
	);
};

const SingleArg: FC<{ arg: CommandArgument }> = (props) => {
	return (
		<Disclosure as="div" className="my-2">
			{({ open }) => {
				return (
					<>
						<Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-indigo-900 bg-indigo-100 rounded-lg hover:bg-indigo-200 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-75">
							<span>{props.arg.name}</span>
							<ChevronUpIcon
								className={classNames(
									`${
										open ? 'transform rotate-180' : ''
									} w-5 h-5 text-purple-500`,
									'transition-all duration-150'
								)}
							/>
						</Disclosure.Button>
						<Transition
							show={open}
							enter="transition duration-100 ease-out"
							enterFrom="transform scale-95 opacity-0"
							enterTo="transform scale-100 opacity-100"
							leave="transition duration-75 ease-out"
							leaveFrom="transform scale-100 opacity-100"
							leaveTo="transform scale-95 opacity-0"
						>
							<Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
								<div className="border-gray-200 mb-4">
									<dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
										<div className="sm:col-span-1">
											<dt className="text-sm font-medium text-gray-500">
												Data Type
											</dt>
											<dd className="mt-1 text-sm text-gray-900">
												<code>{props.arg.type}</code>
											</dd>
										</div>
										<div className="sm:col-span-1">
											<dt className="text-sm font-medium text-gray-500">
												Required
											</dt>
											<dd className="mt-1 text-sm text-gray-900">
												{props.arg.required ?? true
													? 'true'
													: 'false'}
											</dd>
										</div>
										<div className="sm:col-span-2">
											<dt className="text-sm font-medium text-gray-500">
												What is a{' '}
												<code>{props.arg.type}</code>?
											</dt>
											<dd className="mt-1 text-sm text-gray-900">
												{typedata.find(
													(type) =>
														type.name ===
														props.arg.type
												)?.description ||
													"We don't know either LOL"}
											</dd>
										</div>
									</dl>
								</div>
								{props.arg.description}
								{props.arg.literals
									? '* This string only accepts the following options: ' +
									  props.arg.literals?.join(', ')
									: null}
							</Disclosure.Panel>
						</Transition>
					</>
				);
			}}
		</Disclosure>
	);
};
