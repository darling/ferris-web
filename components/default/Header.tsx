import classNames from 'classnames';
import Link from 'next/link';
import { FC, useState } from 'react';

import HeaderProfile from './HeaderProfile';

const LINKS = [
	{ name: 'Documentation', href: '/docs' },
	{ name: 'Plans', href: '/pricing' },
	{ name: 'Discord Server', href: '/discord' },
	{ name: 'Add Ferris', href: '/add' },
];

const Header: FC<{ bgClassName?: string; textClassName?: string }> = ({
	bgClassName = 'bg-gray-900',
	textClassName = 'hover:text-green-400 text-gray-500',
}) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<div className={bgClassName + ' transition duration-200'}>
			<div className="px-4 py-5 mx-auto container md:px-24 lg:px-5 relative flex items-center justify-between">
				<div className="flex items-center">
					<Link href="/" aria-label="Ferris">
						<img
							height="30"
							width="100"
							src="/img/logo.png"
							alt="Logo"
							className="cursor-pointer inline-flex items-center mr-8 transition-colors duration-200 rounded-sm hover:bg-gray-800 p-3"
						/>
					</Link>
					<ul className="items-center hidden space-x-8 lg:flex">
						{LINKS.map((link) => (
							<li key={link.name}>
								<Link href={link.href}>
									<a
										aria-label={link.name}
										className={
											'font-medium tracking-wide transition-colors duration-200 ' +
											textClassName
										}
									>
										{link.name}
									</a>
								</Link>
							</li>
						))}
					</ul>
				</div>
				<ul className="items-center hidden space-x-8 lg:flex">
					<HeaderProfile className="hidden md:contents" />
				</ul>
				<div className="lg:hidden">
					<button
						aria-label="Open Menu"
						title="Open Menu"
						className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-green-50 focus:bg-green-50"
						onClick={() => setIsMenuOpen(true)}
					>
						<svg
							className={classNames(
								'w-5 hover:text-gray-800',
								textClassName
									.split(' ')
									.filter((t) => t.startsWith('text-'))
									.join()
							)}
							viewBox="0 0 24 24"
						>
							<path
								fill="currentColor"
								d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
							/>
							<path
								fill="currentColor"
								d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
							/>
							<path
								fill="currentColor"
								d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
							/>
						</svg>
					</button>
					{isMenuOpen && (
						<div className="absolute top-0 left-0 w-full z-50">
							<div className="p-5 bg-gray-50 border rounded shadow-sm">
								<div className="flex items-center justify-between mb-4">
									<div>
										<a
											href="/"
											aria-label="Ferris"
											title="Ferris"
											className="inline-flex items-center"
										>
											<img
												height="30"
												width="100"
												src="/img/logo.svg"
												alt="Logo"
												className="cursor-pointer inline-flex items-center mr-8"
											/>
										</a>
									</div>
									<div>
										<button
											aria-label="Close Menu"
											title="Close Menu"
											className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
											onClick={() => setIsMenuOpen(false)}
										>
											<svg
												className="w-5 text-gray-600"
												viewBox="0 0 24 24"
											>
												<path
													fill="currentColor"
													d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
												/>
											</svg>
										</button>
									</div>
								</div>
								<nav>
									<ul className="space-y-4">
										<li>
											<Link href="/docs">
												<a
													aria-label="Documentation"
													className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-green-400"
												>
													Documentation
												</a>
											</Link>
										</li>
										<li>
											<Link href="/pricing">
												<a
													aria-label="Plans"
													className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-green-400"
												>
													Plans
												</a>
											</Link>
										</li>
										<li>
											<Link href="/discord">
												<a
													aria-label="Discord Server"
													className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-green-400"
												>
													Discord Server
												</a>
											</Link>
										</li>
										<li>
											<Link href="/add">
												<a
													aria-label="Add Ferris"
													className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-green-400"
												>
													Add Ferris
												</a>
											</Link>
										</li>
										<li>
											<HeaderProfile className="justify-between text-green-900 shadow-none p-0 rounded-md" />
										</li>
									</ul>
								</nav>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Header;
