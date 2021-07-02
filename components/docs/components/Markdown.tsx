// import classNames from 'classnames';
import Link from 'next/link';
import React, { FC, ReactElement } from 'react';

import rereact from 'rehype-react';
import parse from 'remark-parse';
import rehtml from 'remark-rehype';
import unified from 'unified';
// import { Section } from '../DocsLayout';

// const InlineCode: FC = (props) => {
// 	return (
// 		<code className={classNames('text-indigo-700 rounded-md')}>
// 			{props.children}
// 		</code>
// 	);
// };

// const Paragraph: FC = (props) => {
// 	return <p>{props.children}</p>;
// };

// const Quote: FC = (props) => {
// 	return (
// 		<blockquote className="pl-2 py-2 border-l-2 border-indigo-300 italic text-gray-500 hover:bg-indigo-50">
// 			{props.children}
// 		</blockquote>
// 	);
// };

const HyperLink: FC<any> = (props) => {
	return (
		<Link href={props.href}>
			<a className="bg-indigo-100 text-indigo-500 hover:text-indigo-800 px-1">
				{props.children}
			</a>
		</Link>
	);
};

// const Image: FC<any> = (props) => {
// 	console.log(props);
// 	return (
// 		<>
// 			<img className="rounded-xl sm:mt-8 mt-4 w-full" src={props.src} />
// 			<span className="italic text-sm text-gray-700 sm:mb-8 mb-4 ">
// 				{props.alt}
// 			</span>
// 		</>
// 	);
// };

export const Markdown: FC<{ data: string }> = (props) => {
	return (
		// gap-4 pb-4
		<div className="flex flex-col prose prose-indigo">
			{(unified()
				.use(parse)
				.use(rehtml)
				.use(rereact, {
					components: {
						// 	code: InlineCode,
						// 	p: Paragraph,
						// 	blockquote: Quote,
						a: HyperLink,
						// 	h2: Section,
						// 	img: Image,
					},
					Fragment: React.Fragment,
					createElement: React.createElement,
				})
				.processSync(props.data).result as ReactElement) || (
				<p>Error - Unable to parse</p>
			)}
		</div>
	);
};
