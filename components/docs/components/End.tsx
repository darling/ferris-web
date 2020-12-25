import Link from 'next/link';

export default function DocumentationEnd() {
	return (
		<div className="text-sm mt-5">
			<Link href="/docs">
				<a>Return Home</a>
			</Link>
		</div>
	);
}
