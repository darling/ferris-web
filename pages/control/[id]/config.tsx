import { InformationCircleIcon } from '@heroicons/react/outline';
import classNames from 'classnames';
import Link from 'next/link';
import React, { useContext } from 'react';

import { ControlMainTitle } from '../../../components/control/ControlSidebar';
import { RoleSelectBox } from '../../../components/control/RoleSelectBox';
import { RoleToggleList } from '../../../components/control/RoleToggleList';
import { LoggingSettings } from '../../../components/control/Settings/LoggingSettings';
import ControlPanel from '../../../components/ControlPanel';
import { ConfigContext, GuildContext } from '../../../contexts/guild';
import { GuildConfig } from '../../../interfaces/control';
import { db } from '../../../utils/auth/firebase';

export const FormSection = (props: {
	children: any;
	title: string;
	description: string;
}) => {
	return (
		<div className="p-6 -mx-6 rounded-lg">
			<div className="border-b border-gray-700 py-4">
				<h3 className="text-lg leading-6 font-medium text-green-200">
					{props.title}
				</h3>
				<p className="mt-1 text-sm text-gray-500">
					{props.description}
				</p>
			</div>
			<div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
				{props.children}
			</div>
		</div>
	);
};

export const FormLabel = (props: { children: any; htmlFor?: any }) => {
	const classname = classNames('block text-sm font-medium text-gray-200');

	return (
		<div className="sm:col-span-3">
			{props.htmlFor ? (
				<label htmlFor={props.htmlFor} className={classname}>
					{props.children}
				</label>
			) : (
				<p className={classname}>{props.children}</p>
			)}
		</div>
	);
};

const ControlConfig = () => {
	const guild = useContext(GuildContext);
	const config = useContext(ConfigContext);

	const roles = guild?.roles || {};

	const autoRole = config?.auto_role
		? { label: roles[config.auto_role].name, value: config.auto_role }
		: undefined;

	const mutedRole = config?.muted_role
		? { label: roles[config.muted_role].name, value: config.muted_role }
		: undefined;

	function changePrefix(event: any) {
		event.preventDefault();

		if (event.target[0].value.length) {
			db.collection('configs')
				.doc(guild?.id)
				.set({ prefix: event.target[0].value }, { merge: true });
		}
	}

	return (
		<ControlPanel>
			<ControlMainTitle>
				{guild?.name} <span className="text-green-100">Config</span>
			</ControlMainTitle>
			<div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
				<main className="lg:col-span-12 xl:col-span-7">
					<FormSection
						title="Server Config"
						description="General configuration for your server. Change simple
							things here like your prefix and whatnot."
					>
						<form
							onSubmit={changePrefix}
							className="col-span-6 md:col-span-3"
						>
							<FormLabel htmlFor="prefix">Prefix </FormLabel>
							<div className="mt-1">
								<input
									id="prefix"
									name="prefix"
									type="text"
									placeholder={`New prefix goes here "${
										config?.prefix || ';'
									}"`}
									className="bg-gray-800 shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-700 rounded-md"
								/>
							</div>
							<div className="pt-5">
								<div className="flex justify-end">
									<button
										type="submit"
										className="ml-3 inline-flex justify-center py-2 px-4 shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
									>
										Update
									</button>
								</div>
							</div>
						</form>
					</FormSection>
					<FormSection
						title="Role Config"
						description="Set roles for specific actions."
					>
						<div className="sm:col-span-3">
							<FormLabel htmlFor="autorole">Autorole</FormLabel>
							<RoleSelectBox
								roleData={autoRole}
								firebaseKey={'auto_role'}
							/>
						</div>
						<div className="sm:col-span-3">
							<FormLabel htmlFor="mutedrole">
								Muted Role
							</FormLabel>
							<RoleSelectBox
								roleData={mutedRole}
								firebaseKey={'muted_role'}
							/>
						</div>
					</FormSection>
					<FormSection
						title="Selfroles"
						description="Users can grab the listed roles at any time."
					>
						<div className="sm:col-span-3">
							<FormLabel htmlFor="autorole">
								Manage Selfroles
							</FormLabel>
						</div>
						<RoleToggleList className="sm:col-span-6" />
					</FormSection>
					<FormSection
						title="Logging Settings"
						description="These are just options dedicated to logging options."
					>
						<LoggingSettings config={config as GuildConfig} />
					</FormSection>
				</main>
				<aside className="hidden xl:block xl:col-span-5">
					<div className="sticky top-6 space-y-4 ">
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
										Ferris is in beta, feel free to stop by
										the Discord and see what's new!
									</p>
									<p className="mt-3 text-sm md:mt-0 md:ml-6">
										<Link href="/discord">
											<a className="whitespace-nowrap font-medium text-blue-700 hover:text-blue-600">
												Details{' '}
												<span aria-hidden="true">
													&rarr;
												</span>
											</a>
										</Link>
									</p>
								</div>
							</div>
						</div>
					</div>
				</aside>
			</div>
		</ControlPanel>
	);
};

export default ControlConfig;
