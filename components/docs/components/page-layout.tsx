import Layout from '../../Layout';
import DocumentationEnd from './End';
import DocumentationSidebar from './Sidebar';

export function DocumentationLayout(props: any) {
	console.log(props);
	return (
		<Layout>
			<div className="flex flex-col md:flex-row md:w-4/5 md:mx-auto">
				<DocumentationSidebar paths={props.paths} />
				<div className="flex flex-col w-full">
					<h1 className="text-5xl md:text-6xl font-bold mb-6">
						{props.data.title}
					</h1>
					<div className="flex flex-col gap-2 md:gap-5 text-lg">
						{props.children}
					</div>
					<DocumentationEnd />
				</div>
			</div>
		</Layout>
	);
}
