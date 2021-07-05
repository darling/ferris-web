import { PencilAltIcon, TrashIcon } from '@heroicons/react/outline';
import classNames from 'classnames';
import React, { useContext, useState } from 'react';

import {
	ControlContent,
	ControlMainTitle,
} from '../../../components/control/ControlSidebar';
import EmbedCreator from '../../../components/control/EmbedCreator';
import ControlPanel from '../../../components/ControlPanel';
import { ConfigContext, GuildContext } from '../../../contexts/guild';
import { Embed } from '../../../interfaces/control';
import app, { db } from '../../../utils/auth/firebase';

const CustomCommands = () => {
	const guild = useContext(GuildContext);
	const config = useContext(ConfigContext);
	const [currentCommand, setCurrentCommand] = useState<string>();

	const commandList = Object.keys(config?.custom || {});

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
			<ControlMainTitle>
				Custom Commands for {guild?.name}
			</ControlMainTitle>
			<ControlContent>
				<h3 className="text-lg leading-6 font-medium text-green-200">
					Manage Existing Commands
				</h3>
				<ul className="divide-y divide-gray-700">
					{commandList.map((commandName) => {
						return (
							<li key={commandName} className="py-4">
								<div className="flex items-center space-x-4">
									<div className="flex-1 min-w-0">
										<p className="font-mono text-white truncate">
											<span className="text-green-300">
												{config?.prefix || ';'}
											</span>
											{commandName}
										</p>
										<p className="text-sm text-gray-500 truncate">
											command
										</p>
									</div>
									<div className="space-x-2">
										<button
											onClick={() => {
												setCurrentCommand(commandName);
											}}
											type="button"
											className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
										>
											<PencilAltIcon
												className="-ml-0.5 mr-2 h-4 w-4"
												aria-hidden="true"
											/>
											Edit
										</button>
										<button
											onClick={() => {
												db.collection('configs')
													.doc(`${guild?.id}`)
													.update({
														['custom.' +
														commandName]:
															app.firestore.FieldValue.delete(),
													});
											}}
											type="button"
											className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
										>
											<TrashIcon
												className="-ml-0.5 mr-2 h-4 w-4"
												aria-hidden="true"
											/>
											Delete
										</button>
									</div>
								</div>
							</li>
						);
					})}
				</ul>
			</ControlContent>
			<ControlContent>
				<h3 className="text-lg leading-6 font-medium text-green-200">
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
				</h3>
				<div className="mt-6 grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-6">
					<EmbedCreator
						editExisting={currentCommand}
						onSubmit={handleCreate}
					/>
					<button
						className={classNames(
							'bg-red-500 text-white p-3 rounded-md w-full col-span-4'
						)}
						hidden={!currentCommand}
						onClick={() => setCurrentCommand(undefined)}
					>
						Cancel editing
					</button>
				</div>
			</ControlContent>
		</ControlPanel>
	);
};

export default CustomCommands;
