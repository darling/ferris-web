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
				<div className="md:w-3/5 flex flex-col">
					<h1 className="text-5xl font-bold tracking-wider text-green-200">
						{frontMatter.title}
					</h1>
					<hr className="border-gray-800 transition-colors duration-100 mb-3" />
					<div>{content}</div>
				</div>
			</div>
		</Layout>
	);
};
