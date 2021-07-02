import classNames from 'classnames';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React, { FC } from 'react';

import { CommandArgList } from '../../../components/docs/components/CommandArgList';
import { Markdown } from '../../../components/docs/components/Markdown';
import { DocsLayout } from '../../../components/docs/DocsLayout';
import commanddata from '../../../docs/commanddata.json';
import { ICommand } from '../../../interfaces/command';

const InlineCode: FC = (props) => {
	return (
		<code className={classNames('text-indigo-700 rounded-md')}>
			{props.children}
		</code>
	);
};

const CommandPage: FC<{
	command: ICommand;
}> = (props) => {
	return (
		<DocsLayout
		// sidebar={
		// 	<pre className="whitespace-pre-wrap">
		// 		<code>{JSON.stringify(props.command, null, 2)}</code>
		// 	</pre>
		// }
		>
			<div className="max-w-full prose prose-indigo">
				<h2>Description</h2>
				<Markdown
					data={
						props.command.description ||
						'No description written. Are you supposed to be here?'
					}
				/>
				{props.command.arguments ? (
					<>
						<h2
							className={classNames('mt-4', {
								hidden: props.command.arguments.length < 1,
							})}
						>
							Arguments
						</h2>
						<div
							className={classNames(
								{
									hidden: props.command.arguments.length < 1,
								},
								'mt-4'
							)}
						>
							<InlineCode>
								;{props.command.name}
								{props.command.arguments.map((arg) => {
									return (
										<span key={arg.name}>
											{' ('}
											{arg.name}
											{')'}
										</span>
									);
								})}
							</InlineCode>
							<CommandArgList command={props.command} />
						</div>
					</>
				) : null}
			</div>
		</DocsLayout>
	);
};

export default CommandPage;

export const getStaticPaths: GetStaticPaths = async () => {
	let paths: (
		| string
		| {
				params: ParsedUrlQuery;
				locale?: string | undefined;
		  }
	)[] = [];

	commanddata.forEach((command) => {
		if (command.name === 'test') return;
		paths.push({ params: { command: command.name } });
	});

	return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const commandName = params?.command;

	if (!commandName) {
		return { notFound: true };
	}

	const command = commanddata.find((cmd) => cmd.name == commandName);

	return { notFound: false, props: { command } };
};
