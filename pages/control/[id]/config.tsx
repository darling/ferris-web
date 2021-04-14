import { useContext, useEffect, useState } from 'react';
import Select from 'react-select';

import { LoggingSettings } from '../../../components/control/Settings/LoggingSettings';
import ControlPanel from '../../../components/ControlPanel';
import { SectionHeading } from '../../../components/ui-atoms/SectionHeading';
import { GuildContext } from '../../../contexts/guild';
import { db } from '../../../utils/auth/firebase';
import { selectStyleDark } from '../../../utils/select-styles';

const ControlConfig = () => {
	const guild = useContext(GuildContext);
	const [config, setConfig] = useState<any>();
	const [autoRole, setAutoRole] = useState<{
		label: string;
		value: string;
	}>();
	const [mutedRole, setMutedRole] = useState<{
		label: string;
		value: string;
	}>();
	// const [newPrefix, setNewPrefix] = useState<string>('');

	const selectableRoles = Object.keys(guild?.roles || {}).map((roleId) => {
		const role = guild?.roles?.[roleId];
		return {
			label: role?.name,
			value: roleId,
		};
	});

	useEffect(() => {
		if (!guild?.id) return;
		console.log('FETCHING CONFIG', guild?.id);
		const close = db
			.collection('configs')
			.doc(guild.id)
			.onSnapshot(
				(snapshot) => {
					console.log('NEW DATA', snapshot.data());
					const newConfig = { ...snapshot.data() };
					setConfig(newConfig || null);
					if (newConfig?.auto_role) {
						const role = guild?.roles?.[newConfig.auto_role];
						if (role) {
							setAutoRole({
								label: role.name,
								value: newConfig.auto_role,
							});
						}
					}
					if (newConfig?.muted_role) {
						const role = guild?.roles?.[newConfig.muted_role];
						if (role) {
							setMutedRole({
								label: role.name,
								value: newConfig.muted_role,
							});
						}
					}
				},
				(e) => {
					console.error(e);
				}
			);

		return close;
	}, [guild?.id]);

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
			<SectionHeading heading="Config" />
			<div>
				<div className="my-5">
					<h2 className="text-3xl font-bold tracking-wider  mb-1">
						Prefix
					</h2>
					<hr />
				</div>
				<div className="flex flex-col">
					<p>
						The prefix is currently{' '}
						<code className="bg-gray-800 rounded-md px-1">
							{config?.prefix || ';'}
						</code>
						.
					</p>
					<form
						onSubmit={changePrefix}
						className="flex flex-row gap-2 mt-2"
					>
						<input
							className="rounded-lg bg-gray-800 px-2 py-1"
							type="text"
							name="prefix-change"
							id="prefix-change"
						/>
						<button
							className="bg-green-600 text-white px-2 py-1 rounded-lg"
							type="submit"
						>
							Change
						</button>
					</form>
				</div>
			</div>
			<div>
				<div className="my-5">
					<h2 className="text-3xl font-bold tracking-wider  mb-1">
						Member Role
					</h2>
					<hr />
				</div>
				<div className="flex flex-col">
					<p>Auto assign a member role to new members.</p>
					<Select
						styles={selectStyleDark}
						value={autoRole}
						onChange={(newRole) => {
							db.collection('configs').doc(guild?.id).set(
								{
									auto_role: newRole?.value,
								},
								{ merge: true }
							);
						}}
						options={selectableRoles || []}
					/>
				</div>
			</div>
			<div>
				<div className="my-5">
					<h2 className="text-3xl font-bold tracking-wider  mb-1">
						Muted Role
					</h2>
					<hr />
				</div>
				<div className="flex flex-col">
					<p>Role used to mute members.</p>
					<Select
						styles={selectStyleDark}
						value={mutedRole}
						onChange={(newRole) => {
							db.collection('configs').doc(guild?.id).set(
								{
									muted_role: newRole?.value,
								},
								{ merge: true }
							);
						}}
						options={selectableRoles || []}
					/>
				</div>
			</div>
			<LoggingSettings config={config} />
		</ControlPanel>
	);
};

export default ControlConfig;
