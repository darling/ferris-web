import { readdirSync, readFileSync, statSync } from 'fs';
import matter from 'gray-matter';
import { GetStaticPaths, GetStaticProps } from 'next';
// @ts-ignore
import hydrate from 'next-mdx-remote/hydrate';
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

export const getStaticPaths: GetStaticPaths = async () => {
	const paths: { params: { slug: string[] } }[] = [];
	const files: string[] = getFiles(docFilePosition);

	console.log('files', files);

	files.forEach((file) => {
		const slug = file
			.replace(docFilePosition, '')
			.replace('.mdx', '')
			.split('/');

		slug.shift();

		paths.push({
			params: {
				slug,
			},
		});
	});

	console.log('paths', JSON.stringify(paths));

	return {
		fallback: false,
		paths,
	};
};

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
	const source = readFileSync(
		join(process.cwd(), 'docs', `${params.slug.join('/') || 'index'}.mdx`),
		'utf8'
	);
	const { data, content } = matter(source);
	const mdxSource = await renderToString(content);
	const files: string[] = getFiles(docFilePosition);

	const output = files.map((file) => {
		const fileData = readFileSync(file);
		const { data } = matter(fileData);

		return data;
	});

	return {
		props: {
			mdxSource,
			frontMatter: data,
			docList: output,
		},
	};
};
