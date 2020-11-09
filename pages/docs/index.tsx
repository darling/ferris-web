import { readFileSync } from 'fs';
import Layout from './../../components/Layout';
import matter from 'gray-matter';
import { GetStaticProps } from 'next';
// @ts-ignore
import renderToString from 'next-mdx-remote/render-to-string';
import { join } from 'path';
import { DocumentationPage } from '../../components/docs/DocumentationPage';
import { getFiles } from '../../lib/docs';

export default function DocumentPage({ mdxSource, frontMatter, docList }: any) {
	return (
		<DocumentationPage docList={docList} frontMatter={frontMatter}>
			{mdxSource}
		</DocumentationPage>
	);
}

const docFilePosition = join(process.cwd(), 'docs');

export const getStaticProps: GetStaticProps = async () => {
	const source = readFileSync(
		join(process.cwd(), 'docs', `index.mdx`),
		'utf8'
	);
	const { data, content } = matter(source);
	const files: string[] = getFiles(docFilePosition);

	const output = files.map((file) => {
		const fileData = readFileSync(file);
		const { data } = matter(fileData);

		return data;
	});

	const mdxSource = await renderToString(content);
	return { props: { mdxSource, frontMatter: data, docList: output } };
};
