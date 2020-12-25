import { readdirSync, readFileSync } from 'fs';
import matter from 'gray-matter';
import { flatMap, startCase, truncate } from 'lodash';
// @ts-ignore
import renderToString from 'next-mdx-remote/render-to-string';
// @ts-ignore
import hydrate from 'next-mdx-remote/hydrate';
import { DocumentationLayout } from '../../components/docs/components/page-layout';
import { GetStartedButton } from '../../components/home/ui/GetStartedButton';
import CommandList from '../../components/docs/CommandList';

const path = process.cwd() + '/docs/';
const components = { GetStartedButton, CommandList };

export default function DocumentationPage(props: any) {
	const content = hydrate(props.mdxSource, { components });
	return (
		<DocumentationLayout data={props.data} paths={props.paths}>
			{content}
		</DocumentationLayout>
	);
}

// This function is ran by Next.js to determine which
// paths need to be created dynamically
export async function getStaticPaths() {
	const files = readdirSync(path, { withFileTypes: true });

	const paths = files.map((dir) => {
		if (dir.isDirectory()) {
			const files = readdirSync(path + dir.name, { withFileTypes: true });

			const output = files.map((file) => {
				return {
					params: { id: [dir.name, file.name.replace('.mdx', '')] },
				};
			});

			return output;
		}
		return { params: { id: [dir.name.replace('.mdx', '')] } };
	});

	return {
		paths: flatMap(paths),
		fallback: false,
	};
}

// params in getStaticPaths({params}) are from getStaticPaths.
// Next.js runs this function to determine what props to
// pass to our React component.
// In this case we see that we only have one possible path
// and that is the path to "my-first-blog-post".
export async function getStaticProps({ params }: any) {
	console.log('building', params.id);
	const source = readFileSync(path + (params.id.join('/') + '.mdx'), 'utf8');
	const { data, content } = matter(source, { excerpt: true });
	const mdxSource = await renderToString(content, { components });

	const files = readdirSync(path, { withFileTypes: true });

	const paths = flatMap(
		files.map((dir) => {
			if (dir.isDirectory()) {
				const files = readdirSync(path + dir.name, {
					withFileTypes: true,
				});

				const output = files.map((file) => {
					const fileSrc = readFileSync(
						path + '/' + dir.name + '/' + file.name,
						'utf8'
					);
					const frontMatter = matter(fileSrc, { excerpt: true });
					return {
						slug: file.name.replace('.mdx', ''),
						title: startCase(file.name.replace('.mdx', '')),
						description:
							truncate(frontMatter.data.description, {
								length: 70,
							}) || 'No description provided',
					};
				});

				return { [dir.name]: output };
			}
			const fileSrc = readFileSync(path + dir.name, 'utf8');
			const frontMatter = matter(fileSrc, { excerpt: true });
			return {
				slug: dir.name.replace('.mdx', ''),
				title: startCase(dir.name.replace('.mdx', '')),
				description:
					truncate(frontMatter.data.description, { length: 70 }) ||
					'No description provided',
			};
		})
	);

	return { props: { id: params.id, mdxSource, data, paths } };
}
