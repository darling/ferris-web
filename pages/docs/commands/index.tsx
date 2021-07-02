import { SearchIcon } from '@heroicons/react/solid';
import { filter, orderBy, truncate } from 'lodash';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import React, { FC, useState } from 'react';

import { DocsLayout } from '../../../components/docs/DocsLayout';
import commanddata from '../../../docs/commanddata.json';
import { CommandArgument, ICommand } from '../../../interfaces/command';

const PREFIX = ';';

const CommandArgDisplay: FC<{ arg: CommandArgument }> = (props) => {
	const arg = props.arg;
	const required = arg.required ?? true;

	return (
		<span className="text-gray-500">
			{required ? ' <' : ' ('}
			{arg.name}
			{required ? '>' : ')'}
		</span>
	);
};

const CommandsPage: FC<{
	commanddata: ICommand[];
}> = (props) => {
	const [searchTerm, setSearchTerm] = useState('');

	return (
		<DocsLayout>
			<div className="max-w-full prose prose-indigo">
				<h1>Getting Started with Commands</h1>
				<p>
					Click on any of the commands to view a list that includes
					all possible options.
				</p>
				<p>
					Our handy search bar provides more information about each
					command including how-tos/guides related specifically
					towards different tasks within our system. Please contact us
					if you need help understanding something
				</p>
				<h2>Command List</h2>
				<div>
					<div className="max-w-md w-full pb-5">
						<label htmlFor="search" className="sr-only">
							Search
						</label>
						<div className="relative focus-within:text-gray-600">
							<div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
								<SearchIcon
									className="h-5 w-5"
									aria-hidden="true"
								/>
							</div>
							<input
								id="search"
								className="block w-full bg-indigo-100 py-2 pl-10 pr-3 border border-transparent rounded-md leading-5 text-gray-900 focus:outline-none focus:bg-indigo-200 focus:border-transparent focus:placeholder-gray-500 focus:ring-2 sm:text-sm"
								placeholder="Search"
								type="search"
								name="search"
								value={searchTerm}
								onChange={(e) =>
									setSearchTerm(e.currentTarget.value)
								}
							/>
						</div>
					</div>
				</div>
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
					{orderBy(
						filter(props.commanddata, (cmd) =>
							cmd.name.includes(searchTerm)
						),
						[(cmd) => cmd.name]
					).map((command) => {
						if (command.name === 'test') return;
						return (
							<Link
								key={command.name}
								href={`/docs/commands/${command.name}`}
							>
								<div className="relative rounded-lg border cursor-pointer bg-gray-100 px-6 pb-6 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500">
									<div className="flex flex-col">
										<p className="font-mono">
											{PREFIX}
											{command.name}
											{command.arguments?.map((arg) => {
												return (
													<CommandArgDisplay
														arg={arg}
													/>
												);
											})}
										</p>
										<span className="text-sm text-gray-500">
											{truncate(command.description, {
												length: 50,
											})}
										</span>
									</div>
								</div>
							</Link>
						);
					})}
				</div>
			</div>
		</DocsLayout>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	return { props: { commanddata } };
};

export default CommandsPage;
