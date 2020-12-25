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
		{
			name: 'invite',
			description: 'Invite Ferris to your own Discord Server.',
		},
		{
			name: 'ping',
			description: 'Check if Ferris can respond and see your message.',
		},
		{
			name: 'privacy',
			description: 'Get the bots privacy policy.',
		},
		{
			name: 'createrole',
			description: 'Create a role that has no permissions.',
			args: [
				{
					name: 'name',
					type: 'string',
					required: true,
					description:
						'The name of the role you want to make. No spaces.',
				},
				{
					name: 'color',
					type: 'string',
					required: false,
					description:
						'The Hex value of the color. Ideally it would be something like "FFFFFF" but you can try other options.',
				},
			],
		},
		{
			name: 'deleterole',
			description: 'Delete a role.',
			args: [
				{
					name: 'role',
					type: 'role',
					required: true,
					description: 'The mention or ID of the role to be deleted',
				},
			],
		},
		{
			name: 'setrole',
			description: 'Give a role to a member.',
			args: [
				{
					name: 'member',
					type: 'member',
					required: true,
					description: 'The mention or ID of the member.',
				},
				{
					name: 'role',
					type: 'role',
					required: true,
					description: 'The mention or ID of the role.',
				},
			],
		},
		{
			name: 'removerole',
			description: 'Remove a role from a member.',
			args: [
				{
					name: 'member',
					type: 'member',
					required: true,
					description: 'The mention or ID of the member.',
				},
				{
					name: 'role',
					type: 'role',
					required: true,
					description: 'The mention or ID of the role.',
				},
			],
		},
		{
			name: 'hoistrole',
			description: 'Toggle the hoist property of any managable role.',
			args: [
				{
					name: 'role',
					type: 'role',
					required: true,
					description: 'The mention or ID of the role.',
				},
			],
		},
		{
			name: 'rolecolor',
			description: 'Edit a roles color.',
			args: [
				{
					name: 'role',
					type: 'role',
					required: true,
					description: 'The mention or ID of the role to be edited.',
				},
				{
					name: 'color',
					type: 'string',
					required: false,
					description:
						'The Hex value of the color. Ideally it would be something like "FFFFFF" but you can try other options.',
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
		{
			name: 'purge',
			description: 'Remove a given amount of messages.',
			args: [
				{
					name: 'amount',
					type: 'number',
					required: true,
					description:
						'The amount of messages to be removed. Ideally it would be something like 20 or such, but can be adjusted.',
				},
			],
		},
		{
			name: 'mute',
			description: 'Mute a user by giving them an assigned role.',
			args: [
				{
					name: 'member',
					type: 'member',
					required: true,
					description: 'The member to be muted.',
				},
				{
					name: 'time',
					type: 'duration',
					required: true,
					description:
						'The amount of time. An example could be something like "2h"',
				},
				{
					name: 'reason',
					type: '...string',
					required: false,
					description:
						"Given reason for muting a member. If no reason given the user's id will be used.",
				},
			],
		},
		{
			name: 'muterole',
			description: 'Assign the role used to mute members.',
			args: [
				{
					name: 'role',
					type: 'role',
					required: false,
					description:
						'The mention or ID of the role. If no given role, the mute role will be removed.',
				},
			],
		},
		{
			name: 'unmute',
			description: 'Unmute a member.',
			args: [
				{
					name: 'member',
					type: 'member',
					required: true,
					description:
						'Unmutes a member from mention or ID. This will close the case and remove the role, not just remove the role.',
				},
			],
		},
		{
			name: 'warn',
			description: 'Warn a member.',
			args: [
				{
					name: 'member',
					type: 'member',
					required: true,
					description: 'Mention or ID of member to warn',
				},
				{
					name: 'reason',
					type: '...string',
					required: false,
					description:
						"Given reason for muting a member. If no reason given the user's id will be used.",
				},
			],
		},
		{
			name: 'listwarns',
			description: 'List a users infractions.',
			args: [
				{
					name: 'member',
					type: 'member',
					required: true,
					description: 'Mention or ID of member',
				},
			],
		},
		{
			name: 'delwarn',
			description: 'List a users infractions.',
			args: [
				{
					name: 'member',
					type: 'member',
					required: true,
					description: 'Mention or ID of member',
				},
				{
					name: 'warning',
					type: 'number',
					required: true,
					description:
						'The number gotten from listwarns command to delete.',
				},
			],
		},
	],
	logging: [
		{
			name: 'setlogchannel',
			description: 'Set the channel used to log.',
			args: [
				{
					name: 'channel',
					type: 'textchannel',
					required: true,
					description: 'Mention or ID of channel',
				},
			],
		},
		{
			name: 'stoplogging',
			description: 'Temporarily stop logging.',
		},
		{
			name: 'startlogging',
			description: 'Start logging.',
		},
	],
	configuration: [
		{
			name: 'setprefix',
			description: 'Set/get the prefix for your server.',
			args: [
				{
					name: 'prefix',
					type: 'string',
					required: false,
					description:
						'Put the prefix you would like to change to. No spaces.',
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
