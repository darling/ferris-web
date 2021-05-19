import React, { FC } from 'react';
import { Markdown } from '../../components/docs/components/Markdown';
import { DocsLayout } from '../../components/docs/DocsLayout';

const DocsHome: FC = () => {
	const data =
		'## Thank you for your interest in the guide\n\nThere is no guide for now though. If you would like to write one please feel free to join the [Discord Server](/discord).';
	return (
		<DocsLayout>
			<Markdown data={data} />
		</DocsLayout>
	);
};

export default DocsHome;
