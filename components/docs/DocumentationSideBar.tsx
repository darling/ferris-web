import groupBy from 'lodash/groupBy';
import Link from 'next/link';

interface Props {
	docList: DocProps[];
}

interface DocProps {
	title: string;
	description: string;
	slug: string;
	category: string;
	order: number;
}

function SideBarEntry(props: Partial<DocProps>) {
	return (
		<Link href={'/docs/' + (props.slug || '')}>
			<a className="mt-2 py-2 px-3 rounded bg-gray-800 mr-1">
				{props.title || 'No title'}
			</a>
		</Link>
	);
}

export default function DocumentationSideBar({ docList }: Props) {
	let pages = groupBy(docList, 'category');
	const topPages = pages['undefined'] || [];
	const bottomPages = pages['bottom'] || [];
	delete pages['undefined'];
	delete pages['bottom'];

	console.log(pages);

	return (
		<div className="md:w-1/5 md:h-screen flex flex-col md:mr-2 md:mt-2">
			<h3 className="text-sm font-bold tracking-widest select-none">
				DOCUMENTATION
			</h3>
			{topPages
				.sort((a, b) => (a.order || 100) - (b.order || 100))
				.map((e) => {
					console.log('order', e.title);
					return <SideBarEntry {...e} />;
				})}
			{Object.keys(pages).map((categories) => {
				return (
					<>
						<h4 className="text-sm font-bold tracking-widest select-none mt-2">
							{categories.toUpperCase()}
						</h4>
						{pages[categories]
							.sort((a, b) => b.order || 100 - a.order || 100)
							.map((entry) => (
								<SideBarEntry {...entry} />
							))}
					</>
				);
			})}
			{bottomPages.map((e) => {
				return <SideBarEntry {...e} />;
			})}
		</div>
	);
}
