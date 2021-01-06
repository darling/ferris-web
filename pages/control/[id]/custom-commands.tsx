import { useContext, useEffect, useState } from 'react';

import EmbedCreator from '../../../components/control/EmbedCreator';
import ControlPanel from '../../../components/ControlPanel';
import { GuildContext } from '../../../contexts/guild';
import { Embed, GuildConfig } from '../../../interfaces/control';
import app, { db } from '../../../utils/auth/firebase';

const CustomCommands = () => {
	const guild = useContext(GuildContext);
	const [config, setConfig] = useState<GuildConfig>();

	const commandList = Object.keys(config?.custom || {});

	useEffect(() => {
		if (!guild?.id) return;
		console.log('FETCHING CONFIG', guild?.id);
		const close = db
			.collection('configs')
			.doc(guild.id)
			.onSnapshot(
				(snapshot) => {
					const newConfig = { ...snapshot.data() };
					setConfig(newConfig as GuildConfig);
				},
				(e) => {
					console.error(e);
				}
			);

		return close;
	}, [guild?.id]);

	const handleCreate = (embed: Embed, name: string): void => {
		let input: any = {};

		input.custom = {};

		input.custom[name] = {
			embed,
		};

		db.collection('configs').doc(guild?.id).set(input, { merge: true });
	};

	return (
		<ControlPanel>
			<h1 className="font-bold tracking-wide align-middle text-4xl text-green-200">
				{'Custom Commands'}
			</h1>
			<div className="flex flex-col gap-2 bg-gray-800 p-3 rounded-lg shadow-md my-2">
				{commandList.map((commandName) => {
					return (
						<div className="bg-gray-900 p-2 rounded-md">
							<div className="flex flex-row items-center justify-between">
								<h2 className="text-2xl font-bold font-mono">
									<span className="text-green-400">
										{config?.prefix || ';'}
									</span>
									{commandName}
								</h2>
								<button
									onClick={() => {
										db.collection('configs')
											.doc(`${guild?.id}`)
											.update({
												['custom.' +
												commandName]: app.firestore.FieldValue.delete(),
											});
									}}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										className="w-8 h-8 text-red-600"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
								</button>
							</div>
						</div>
					);
				})}
			</div>
			<div className="bg-gray-800 p-2 rounded-md">
				<h2 className="text-2xl font-bold">Create a new command</h2>
				<EmbedCreator onSubmit={handleCreate} />
			</div>
		</ControlPanel>
	);
};

export default CustomCommands;
