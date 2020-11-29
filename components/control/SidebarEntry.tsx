import Link from 'next/link';
import { useRouter } from 'next/router';

interface Props {
	name: string;
	path?: string;
}

const SidebarEntry = ({ name, path }: Props) => {
	const router = useRouter();

	let className =
		'rounded p-2 mt-2 mx-2 transition-all duration-100 active:-translate-y-1';
	className += router.pathname.endsWith(path || ']')
		? ' bg-green-400 text-green-100 shadow-2xl hover:bg-green-300'
		: ' bg-gray-700 shadow-md hover:shadow-xl active:shadow-none hover:bg-green-300 hover:text-green-800';

	return (
		<Link href={'/control/' + router.query.id + (path || '')} replace>
			<a className={className}>{name}</a>
		</Link>
	);
};

export default SidebarEntry;
