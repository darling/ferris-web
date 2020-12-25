import { toUpper } from 'lodash';
import Link from 'next/link';

function SidebarItem({ entry }: any) {
	return (
		<Link href={entry.slug}>
			<a className="bg-gray-700 p-2 rounded-lg shadow-lg">
				{entry.title}
			</a>
		</Link>
	);
}

function SidebarCategory({ category }: any) {
	const title = Object.keys(category)[0];
	const entries: any[] = category[title];
	return (
		<div className="border-solid border-green-200 border-l-2 flex flex-col rounded-l-sm shadow-xl">
			<div className="flex flex-row">
				<span className="text-green-200 ml-2 text-sm tracking-wider select-none">
					{toUpper(title)}
				</span>
			</div>
			<div className="flex flex-col gap-2 p-2">
				{entries.map((entry) => {
					return (
						<Link href={title + '/' + entry.slug}>
							<a className="bg-gray-700 p-2 rounded-lg shadow-lg">
								{entry.title}
							</a>
						</Link>
					);
				})}
			</div>
		</div>
	);
}

export default function DocumentationSidebar({ paths }: any) {
	return (
		<div className="md:w-1/4 md:flex-shrink-0 px-5 pt-3">
			<div className="bg-gray-800 p-3 rounded-lg shadow-2xl flex flex-col gap-2">
				<div>
					<span className="font-bold tracking-wide text-2xl select-none transition-all duration-100 hover:shadow-xl hover:text-green-300">
						Ferris Documentation
					</span>
				</div>
				{paths.map((entry: any) => {
					if (entry.title) {
						return <SidebarItem key={entry.title} entry={entry} />;
					}
					return (
						<SidebarCategory
							key={Object.keys(entry)[0]}
							category={entry}
						/>
					);
				})}
			</div>
		</div>
	);
}
