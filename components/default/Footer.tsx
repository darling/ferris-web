import Link from 'next/link';

const navigation = {
	main: [
		{ name: 'About', href: '/about' },
		{ name: 'Discord', href: '/discord' },
		{ name: 'Pricing', href: '/pricing' },
		{ name: 'Privacy', href: '/privacy' },
		{ name: 'TOS', href: '/terms' },
		{ name: 'Documentation', href: '/docs' },
		{ name: 'Thank You!', href: '/thankyou' },
	],
	social: [
		{
			name: 'Twitter',
			href: 'https://twitter.com/FerrisOnDiscord',
			icon: (props: any) => (
				<svg fill="currentColor" viewBox="0 0 24 24" {...props}>
					<path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
				</svg>
			),
		},
		{
			name: 'GitHub',
			href: 'https://github.com/darling',
			icon: (props: any) => (
				<svg
					width="0.94em"
					height="1em"
					viewBox="0 0 480 512"
					{...props}
				>
					<path
						d="M186.1 328.7c0 20.9-10.9 55.1-36.7 55.1s-36.7-34.2-36.7-55.1s10.9-55.1 36.7-55.1s36.7 34.2 36.7 55.1zM480 278.2c0 31.9-3.2 65.7-17.5 95c-37.9 76.6-142.1 74.8-216.7 74.8c-75.8 0-186.2 2.7-225.6-74.8c-14.6-29-20.2-63.1-20.2-95c0-41.9 13.9-81.5 41.5-113.6c-5.2-15.8-7.7-32.4-7.7-48.8c0-21.5 4.9-32.3 14.6-51.8c45.3 0 74.3 9 108.8 36c29-6.9 58.8-10 88.7-10c27 0 54.2 2.9 80.4 9.2c34-26.7 63-35.2 107.8-35.2c9.8 19.5 14.6 30.3 14.6 51.8c0 16.4-2.6 32.7-7.7 48.2c27.5 32.4 39 72.3 39 114.2zm-64.3 50.5c0-43.9-26.7-82.6-73.5-82.6c-18.9 0-37 3.4-56 6c-14.9 2.3-29.8 3.2-45.1 3.2c-15.2 0-30.1-.9-45.1-3.2c-18.7-2.6-37-6-56-6c-46.8 0-73.5 38.7-73.5 82.6c0 87.8 80.4 101.3 150.4 101.3h48.2c70.3 0 150.6-13.4 150.6-101.3zm-82.6-55.1c-25.8 0-36.7 34.2-36.7 55.1s10.9 55.1 36.7 55.1s36.7-34.2 36.7-55.1s-10.9-55.1-36.7-55.1z"
						fill="currentColor"
					></path>
				</svg>
			),
		},
		{
			name: 'Reddit',
			href: 'https://reddit.com/r/FerrisOnDiscord',
			icon: (props: any) => (
				<svg width="1em" height="1em" viewBox="0 0 512 512" {...props}>
					<path
						d="M440.3 203.5c-15 0-28.2 6.2-37.9 15.9c-35.7-24.7-83.8-40.6-137.1-42.3L293 52.3l88.2 19.8c0 21.6 17.6 39.2 39.2 39.2c22 0 39.7-18.1 39.7-39.7s-17.6-39.7-39.7-39.7c-15.4 0-28.7 9.3-35.3 22l-97.4-21.6c-4.9-1.3-9.7 2.2-11 7.1L246.3 177c-52.9 2.2-100.5 18.1-136.3 42.8c-9.7-10.1-23.4-16.3-38.4-16.3c-55.6 0-73.8 74.6-22.9 100.1c-1.8 7.9-2.6 16.3-2.6 24.7c0 83.8 94.4 151.7 210.3 151.7c116.4 0 210.8-67.9 210.8-151.7c0-8.4-.9-17.2-3.1-25.1c49.9-25.6 31.5-99.7-23.8-99.7zM129.4 308.9c0-22 17.6-39.7 39.7-39.7c21.6 0 39.2 17.6 39.2 39.7c0 21.6-17.6 39.2-39.2 39.2c-22 .1-39.7-17.6-39.7-39.2zm214.3 93.5c-36.4 36.4-139.1 36.4-175.5 0c-4-3.5-4-9.7 0-13.7c3.5-3.5 9.7-3.5 13.2 0c27.8 28.5 120 29 149 0c3.5-3.5 9.7-3.5 13.2 0c4.1 4 4.1 10.2.1 13.7zm-.8-54.2c-21.6 0-39.2-17.6-39.2-39.2c0-22 17.6-39.7 39.2-39.7c22 0 39.7 17.6 39.7 39.7c-.1 21.5-17.7 39.2-39.7 39.2z"
						fill="currentColor"
					></path>
				</svg>
			),
		},
		{
			name: 'Patreon',
			href: 'https://patreon.com/FerrisOnDiscord',
			icon: (props: any) => (
				<svg width="1em" height="1em" viewBox="0 0 512 512" {...props}>
					<path
						d="M512 194.8c0 101.3-82.4 183.8-183.8 183.8c-101.7 0-184.4-82.4-184.4-183.8c0-101.6 82.7-184.3 184.4-184.3C429.6 10.5 512 93.2 512 194.8zM0 501.5h90v-491H0v491z"
						fill="currentColor"
					></path>
				</svg>
			),
		},
	],
};

const Footer = () => {
	return (
		<footer className="bg-gray-900">
			<div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
				<nav
					className="-mx-5 -my-2 flex flex-wrap justify-center"
					aria-label="Footer"
				>
					{navigation.main.map((item) => (
						<div key={item.name} className="px-5 py-2">
							<Link href={item.href}>
								<a className="text-base text-gray-500 transition-colors duration-200 hover:text-green-400">
									{item.name}
								</a>
							</Link>
						</div>
					))}
				</nav>
				<div className="mt-8 flex justify-center space-x-6">
					{navigation.social.map((item) => (
						<a
							key={item.name}
							href={item.href}
							className="text-gray-500 transition duration-200 hover:text-green-500"
						>
							<span className="sr-only">{item.name}</span>
							<item.icon className="h-6 w-6" aria-hidden="true" />
						</a>
					))}
				</div>
				<p className="mt-8 text-center text-base text-gray-500">
					&copy; 2021{' '}
					<span className="transition duration-200 hover:text-green-500 font-bold">
						Ferris.gg
					</span>
				</p>
			</div>
		</footer>
	);
};

export default Footer;
