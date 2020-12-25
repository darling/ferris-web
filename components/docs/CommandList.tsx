import { useState } from 'react';

interface ICommandList {
	[category: string]: ICommand[];
}

interface ICommand {
	name: string;
	args?: IArgument[];
	description: string;
}

interface IArgument {
	name: string;
	type:
		| 'number'
		| 'string'
		| '...string'
		| 'boolean'
		| 'subcommand'
		| 'member'
		| 'role'
		| 'newschannel'
		| 'categorychannel'
		| 'textchannel'
		| 'command'
		| 'duration'
		| 'guild';
	required: boolean;
	description: string;
}

const commands: ICommandList = {
	general: [
		{
			name: 'help',
			description: 'The help menu for Ferris.',
			args: [
				{
					name: 'Command',
					type: 'command',
					required: false,
					description:
						'By entering a command name after a command, help will display information about the given command.',
				},
			],
		},
		{
			name: 'whois',
			description: 'Find information on a user or yourself.',
			args: [
				{
					name: 'Person',
					type: 'member',
					required: false,
					description:
						'Enter a user ID or mention to get information about a user. Not putting in information will bring up your user.',
				},
			],
		},
	],
	moderation: [
		{
			name: 'ban',
			description: 'Ban a given member with a reason.',
			args: [
				{
					name: 'member',
					type: 'member',
					required: true,
					description: 'The user that will be banned.',
				},
				{
					name: 'reason',
					type: '...string',
					required: false,
					description:
						"The reason that will be put for the ban. If given nothing just the user's id will be stored in the audit log.",
				},
			],
		},
		{
			name: 'kick',
			description: 'Kick a given member with a reason.',
			args: [
				{
					name: 'member',
					type: 'member',
					required: true,
					description: 'The user that will be kicked.',
				},
				{
					name: 'reason',
					type: '...string',
					required: false,
					description:
						"The reason that will be put for the kick. If given nothing just the user's id will be stored in the audit log.",
				},
			],
		},
	],
	automation: [
		{
			name: 'autorole',
			description:
				'Automatically gives a role to new members that join the discord server.',
			args: [
				{
					name: 'role',
					type: 'role',
					required: false,
					description:
						'The role to give to users. If no role is provided it deletes the given role.',
				},
			],
		},
	],
};

function CommandEntry({ command }: { command: ICommand }) {
	const [isOpen, setOpen] = useState<boolean>(false);
	const [prefix] = useState<string>(';');

	const toggleOpen = () => {
		setOpen(!isOpen);
	};

	const bgColor = isOpen ? 'text-green-50' : 'text-green-50';

	return (
		<div
			className={
				'transition-all duration-100 rounded-lg p-2 select-none bg-gray-800 ' +
				bgColor
			}
			onClick={() => toggleOpen()}
		>
			<span className="text-2xl tracking-wider font-mono">
				{prefix}
				{command.name}
			</span>
			<p className="text-md">{command.description}</p>
			<div hidden={!isOpen}>
				<p className="bg-gray-700 mt-2 p-2 rounded-lg font-mono text-xl shadow-md">
					{prefix}
					{command.name}
					{command.args?.map((arg) => {
						return (
							<span
								key={arg.name}
								className="hover:text-green-400 transition-all duration-100"
							>{` <${arg.type}>`}</span>
						);
					})}
				</p>
				{command.args?.map((arg) => {
					return (
						<div key={arg.name} className="py-2 rounded-md my-1">
							<span>
								{arg.name} ({arg.type})
							</span>
							<p className="text-sm">
								{arg.description}{' '}
								{arg.required
									? 'This arg is required.'
									: 'This arg is not required.'}
							</p>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default function CommandList() {
	const [searchTerm, setSearchTerm] = useState<string>('');
	const categories = Object.keys(commands);

	function searchBoxChange(newTerm: string) {
		setSearchTerm(newTerm);
	}

	return (
		<div className="w-full">
			<div>
				<input
					className="text-green-50 bg-gray-800 rounded-md p-2 w-full"
					placeholder={
						'Search for command names/descriptions here...'
					}
					value={searchTerm}
					onChange={(e) => searchBoxChange(e.target.value || '')}
				/>
			</div>
			{categories.map((category) => {
				if (
					commands[category].filter(
						(command) =>
							command.name.includes(searchTerm) ||
							command.description.includes(searchTerm)
					).length > 0
				)
					return (
						<div
							key={category}
							className="flex flex-col gap-1 py-2"
						>
							<h2 className="text-3xl font-bold py-2">
								{category}
							</h2>
							{commands[category]
								.filter(
									(command) =>
										command.name.includes(searchTerm) ||
										command.description.includes(searchTerm)
								)
								.map((command) => {
									return (
										<CommandEntry
											key={command.name}
											command={command}
										/>
									);
								})}
						</div>
					);
			})}
		</div>
	);
}
