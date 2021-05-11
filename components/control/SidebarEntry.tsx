import Link from 'next/link';
import { useRouter } from 'next/router';

interface Props {
	name: string;
	path?: string;
}

const SidebarEntry = ({ name, path = '/index' }: Props) => {
	const router = useRouter();

	const controlPage = router.pathname.split('/')[3] || 'index';

	let className =
		' hover:bg-gray-50 hover:text-gray-900 flex items-center px-3 py-2 text-sm font-medium rounded-md';
	className += path?.includes(controlPage)
		? ' bg-green-400 text-green-50'
		: ' text-gray-600';

	return (
		<Link
			href={
				'/control/' +
				router.query.id +
				(path.replace('index', '') || '')
			}
			replace
		>
			<a className={className}>
				{name}
				{path.includes('automod') ? (
					<span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-400 text-blue-800">
						New
					</span>
				) : null}
			</a>
		</Link>
	);
};

export default SidebarEntry;
