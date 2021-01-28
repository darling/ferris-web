import clsx from 'clsx';
import { useContext, useEffect, useState } from 'react';

import EmbedCreator from '../../../components/control/EmbedCreator';
import ControlPanel from '../../../components/ControlPanel';
import { GuildContext } from '../../../contexts/guild';
import { Embed, GuildConfig } from '../../../interfaces/control';
import app, { db } from '../../../utils/auth/firebase';

const CustomCommands = () => {
	const guild = useContext(GuildContext);
	const [config, setConfig] = useState<GuildConfig>();
	const [currentCommand, setCurrentCommand] = useState<string>();

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
		setCurrentCommand(undefined);
	};

	return (
		<ControlPanel>
			<h1 className="font-bold tracking-wide align-middle text-4xl text-green-200">
				{'Custom Commands'}
			</h1>
			<div className="flex flex-col gap-2 bg-gray-800 p-3 rounded-lg shadow-md my-2">
				{commandList.map((commandName) => {
					return (
						<div
							key={commandName}
							className="bg-gray-900 p-2 rounded-md"
						>
							<div className="flex flex-row items-center justify-between">
								<h2 className="text-2xl font-bold font-mono">
									<span className="text-green-400">
										{config?.prefix || ';'}
									</span>
									{commandName}
								</h2>
								<div className="flex flex-row gap-2">
									<button
										onClick={() => {
											setCurrentCommand(commandName);
										}}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											className="w-8 h-8 text-green-200"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
											/>
										</svg>
									</button>
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
						</div>
					);
				})}
			</div>
			<div className="bg-gray-800 p-2 rounded-md">
				<h2 className="text-2xl md:text-4xl font-bold">
					{!!currentCommand ? (
						<>
							Manage{' '}
							<span className="text-green-400 font-mono">
								{config?.prefix || ';'}
							</span>
							<span className="font-mono">{currentCommand}</span>
						</>
					) : (
						'Create a new command'
					)}
				</h2>
				<EmbedCreator
					editExisting={currentCommand}
					onSubmit={handleCreate}
				/>
				<button
					className={clsx(
						'bg-red-500',
						'text-white',
						'p-3',
						'rounded-md',
						'w-full',
						'mt-2'
					)}
					hidden={!currentCommand}
					onClick={() => setCurrentCommand(undefined)}
				>
					Cancel editing
				</button>
			</div>
		</ControlPanel>
	);
};

export default CustomCommands;
