// @ts-ignore
import hydrate from 'next-mdx-remote/hydrate';
import Layout from '../Layout';
import { components } from '../../components/docs/style/components';
import DocumentationSideBar from './DocumentationSideBar';
import { CustomHead } from '../default/Head';

interface Props {
	children: any;
	frontMatter: any;
	docList: any;
}

export const DocumentationPage = ({
	children,
	frontMatter,
	docList,
}: Props) => {
	const content = hydrate(children, { components });

	return (
		<Layout title={frontMatter.title + ' | Ferris Documentation'}>
			<CustomHead
				title={frontMatter.title + ' | Ferris Documentation'}
				desc={frontMatter.description}
			/>
			<div className="flex flex-col md:flex-row">
				<DocumentationSideBar docList={docList} />
				<div className="md:w-4/5">{content}</div>
			</div>
		</Layout>
	);
};
