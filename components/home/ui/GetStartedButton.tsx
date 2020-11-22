import Link from 'next/link';

export const GetStartedButton = () => {
	return (
		<Link href="/discord">
			<a className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-green-800 transition duration-200 rounded shadow-md bg-green-200 hover:bg-white hover:text-green-500 focus:shadow-outline focus:outline-none">
				Get started
			</a>
		</Link>
	);
};
