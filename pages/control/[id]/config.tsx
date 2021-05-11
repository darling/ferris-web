import { useContext } from 'react';

import { RoleSelectBox } from '../../../components/control/RoleSelectBox';
import { LoggingSettings } from '../../../components/control/Settings/LoggingSettings';
import ControlPanel from '../../../components/ControlPanel';
import { ConfigContext, GuildContext } from '../../../contexts/guild';
import { GuildConfig } from '../../../interfaces/control';
import { db } from '../../../utils/auth/firebase';

const FormSection = (props: {
	children: any;
	title: string;
	description: string;
}) => {
	return (
		<div className="pt-8">
			<div>
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

const FormLabel = (props: { children: any; htmlFor: any }) => {
	return (
		<div className="sm:col-span-3">
			<label
				htmlFor={props.htmlFor}
				className="block text-sm font-medium text-green-100"
			>
				{props.children}
			</label>
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
			{/* <SectionHeading heading="Config" /> */}
			<div className="space-y-8 divide-y divide-gray-800">
				<FormSection
					title="Server Config"
					description="General configuration for your server. Change simple
							things here like your prefix and whatnot."
				>
					<form onSubmit={changePrefix} className="sm:col-span-6">
						<FormLabel htmlFor="prefix">
							Prefix{' '}
							<span className="text-xs font-light text-gray-200">
								The prefix is currently{' '}
								<code className="font-mono bg-gray-800 p-1 rounded-sm font-normal">
									{config?.prefix || ';'}
								</code>
							</span>
						</FormLabel>
						<div className="mt-1">
							<input
								id="prefix"
								name="prefix"
								type="text"
								placeholder={'New prefix goes here ";"'}
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
						<FormLabel htmlFor="mutedrole">Muted Role</FormLabel>
						<RoleSelectBox
							roleData={mutedRole}
							firebaseKey={'muted_role'}
						/>
					</div>
				</FormSection>
				<FormSection
					title="Logging Settings"
					description="These are just options dedicated to logging options."
				>
					<LoggingSettings config={config as GuildConfig} />
				</FormSection>
			</div>
		</ControlPanel>
	);
};

export default ControlConfig;
