import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import HeaderProfile from './HeaderProfile';

const Header = () => {
	const [open, setOpen] = useState<boolean>(true);

	return (
		<header className="relative bg-gray-900 border-b-2 border-gray-800">
			<div className="container mx-auto px-4 md:px-6 py-2 text-green-100">
				<div className="lg:hidden">
					<div className="flex flex-row h-20 justify-between transition-all duration-300">
						<Link href="/">
							<Image
								height="30"
								width="100"
								src="/img/logo.svg"
							/>
						</Link>
						<button onClick={() => setOpen(!open)}>
							<svg
								className="w-8 h-8"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fillRule="evenodd"
									d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
									clipRule="evenodd"
								/>
							</svg>
						</button>
					</div>
					<div
						className={`flex flex-col mt-2 transition-all duration-150 ${
							open ? 'hidden' : ''
						}`}
					>
						<nav className="flex flex-col mb-2">
							<a
								href="https://discord.com/api/oauth2/authorize?client_id=637804742935838751&permissions=2134207679&scope=bot"
								className="mr-3 px-3 py-2 rounded mb-2 border border-green-800"
							>
								Add Ferris
							</a>
							<Link href="/">
								<a className="mr-3 px-3 py-2 rounded mb-2 border border-gray-800">
									Home
								</a>
							</Link>
							<Link href="/docs">
								<a className="mr-3 px-3 py-2 rounded mb-2 border border-gray-800">
									Documentation
								</a>
							</Link>
							<Link href="/pricing">
								<a className="mr-3 px-3 py-2 rounded mb-2 border border-gray-800">
									Plans
								</a>
							</Link>
							<a
								href="https://discord.gg/A3ZjXAn"
								className="mr-3 px-3 py-2 rounded mb-2 border border-gray-800"
							>
								Discord Server
							</a>
						</nav>
						<HeaderProfile />
					</div>
				</div>
				<div className="hidden lg:contents">
					<div className="flex flex-row justify-between items-center">
						<Link href="/">
							<Image
								height="30"
								width="100"
								src="/img/logo.svg"
							/>
						</Link>
						<nav className="flex-none">
							<a
								target="_blank"
								href="https://discord.com/api/oauth2/authorize?client_id=637804742935838751&permissions=2134207679&scope=bot"
								className="mr-3 px-3 py-2 rounded shadow-md hover:bg-white hover:text-gray-900 bg-green-400 transition-all duration-150"
							>
								Add Ferris
							</a>
							<Link href="/">
								<a className="mr-3 px-3 py-2 rounded hover:bg-gray-800">
									Home
								</a>
							</Link>
							<Link href="/docs">
								<a className="mr-3 px-3 py-2 rounded mb-2 hover:bg-gray-800">
									Documentation
								</a>
							</Link>
							<Link href="/pricing">
								<a className="mr-3 px-3 py-2 rounded hover:bg-gray-800">
									Plans
								</a>
							</Link>
							<a
								href="https://discord.gg/A3ZjXAn"
								className="mr-3 px-3 py-2 rounded hover:bg-gray-800"
							>
								Discord Server
							</a>
						</nav>
						<HeaderProfile />
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
