import Link from 'next/link';
import { useRouter } from 'next/router';

interface Props {
	name: string;
	path?: string;
}

const SidebarEntry = ({ name, path }: Props) => {
	const router = useRouter();

	let className =
		' hover:bg-gray-50 hover:text-gray-900 flex items-center px-3 py-2 text-sm font-medium rounded-md';
	className += router.pathname.endsWith(path || ']')
		? ' bg-green-400 text-green-50'
		: ' text-gray-600';

	return (
		<Link href={'/control/' + router.query.id + (path || '')} replace>
			<a className={className}>{name}</a>
		</Link>
	);
};

export default SidebarEntry;
