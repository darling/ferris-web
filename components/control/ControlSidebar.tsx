/* This example requires Tailwind CSS v2.0+ */
import React, { FC, Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
	CalendarIcon,
	FolderIcon,
	HomeIcon,
	InboxIcon,
	MenuIcon,
	UsersIcon,
	XIcon,
} from '@heroicons/react/outline';
import classNames from 'classnames';
import Link from 'next/link';
import { useAuth } from '../../contexts/auth';
import { FailedAuth } from '../auth/FailedAuth';
import { useRouter } from 'next/router';
import Footer from '../default/Footer';

const navigation = [
	{ name: 'Home', href: '/index', icon: HomeIcon },
	{ name: 'Config', href: '/config', icon: UsersIcon },
	{ name: 'Warnings', href: '/warns', icon: FolderIcon },
	{ name: 'Automod', href: '/automod', icon: CalendarIcon },
	{
		name: 'Custom Commands',
		href: '/custom-commands',
		icon: InboxIcon,
	},
];

const secondaryNavigation = [
	{ name: 'Premium', href: '/premium' },
	{ name: 'Our Discord', href: '/discord' },
	{ name: 'Add Ferris', href: '/add' },
	{ name: 'Control Panel', href: '/control' },
];

export const ControlSideBar: FC = (props) => {
	const auth = useAuth();
	if (!auth) return <FailedAuth></FailedAuth>;

	const router = useRouter();
	const [sidebarOpen, setSidebarOpen] = useState(false);

	const pageName = router.pathname.split('/')[3] || 'index';

	return (
		<div className="h-screen flex overflow-hidden bg-gray-900">
			<Transition.Root show={sidebarOpen} as={Fragment}>
				<Dialog
					as="div"
					static
					className="fixed inset-0 flex z-40 md:hidden"
					open={sidebarOpen}
					onClose={setSidebarOpen}
				>
					<Transition.Child
						as={Fragment}
						enter="transition-opacity ease-linear duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="transition-opacity ease-linear duration-300"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
					</Transition.Child>
					<Transition.Child
						as={Fragment}
						enter="transition ease-in-out duration-300 transform"
						enterFrom="-translate-x-full"
						enterTo="translate-x-0"
						leave="transition ease-in-out duration-300 transform"
						leaveFrom="translate-x-0"
						leaveTo="-translate-x-full"
					>
						<div className="relative flex-1 flex flex-col max-w-xs w-full bg-gray-800">
							<Transition.Child
								as={Fragment}
								enter="ease-in-out duration-300"
								enterFrom="opacity-0"
								enterTo="opacity-100"
								leave="ease-in-out duration-300"
								leaveFrom="opacity-100"
								leaveTo="opacity-0"
							>
								<div className="absolute top-0 right-0 -mr-12 pt-2">
									<button
										className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
										onClick={() => setSidebarOpen(false)}
									>
										<span className="sr-only">
											Close sidebar
										</span>
										<XIcon
											className="h-6 w-6 text-green-200"
											aria-hidden="true"
										/>
									</button>
								</div>
							</Transition.Child>
							<div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
								<div className="flex-shrink-0 flex items-center px-4">
									<Link href="/" aria-label="Ferris">
										<img
											height="30"
											width="100"
											src="/img/logo.png"
											alt="Logo"
											className="cursor-pointer inline-flex items-center mr-8 transition-colors duration-200 rounded-sm hover:bg-gray-800 p-3"
										/>
									</Link>
								</div>
								<nav className="mt-5 px-2 space-y-1">
									{navigation.map((item) => (
										<Link
											key={item.name}
											href={{
												pathname:
													'/control/[id]' +
													item.href.replace(
														'index',
														''
													),
												query: router.query,
											}}
										>
											<a
												key={item.name}
												className={classNames(
													item.href.includes(pageName)
														? 'bg-gray-900 text-white'
														: 'text-gray-300 hover:bg-gray-700 hover:text-white',
													'group flex items-center px-2 py-2 text-base font-medium rounded-md'
												)}
											>
												<item.icon
													className={classNames(
														item.href.includes(
															pageName
														)
															? 'text-gray-300'
															: 'text-gray-400 group-hover:text-gray-300',
														'mr-4 flex-shrink-0 h-6 w-6'
													)}
													aria-hidden="true"
												/>
												{item.name}
											</a>
										</Link>
									))}
								</nav>
							</div>
							<div className="flex-shrink-0 flex bg-gray-700 p-4">
								<Link href="/profile">
									<a className="flex-shrink-0 group block">
										<div className="flex items-center">
											<div>
												<img
													className="inline-block h-10 w-10 rounded-full"
													src={auth.photoURL}
													alt=""
												/>
											</div>
											<div className="ml-3">
												<p className="text-base font-medium text-white">
													{auth.displayName}
												</p>
												<p className="text-sm font-medium text-gray-400 group-hover:text-gray-300">
													View profile
												</p>
											</div>
										</div>
									</a>
								</Link>
							</div>
						</div>
					</Transition.Child>
					<div className="flex-shrink-0 w-14">
						{/* Force sidebar to shrink to fit close icon */}
					</div>
				</Dialog>
			</Transition.Root>

			{/* Static sidebar for desktop */}
			<div className="hidden md:flex md:flex-shrink-0">
				<div className="flex flex-col w-64">
					<div className="flex flex-col h-0 flex-1 bg-gray-800">
						<div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
							<div className="flex items-center flex-shrink-0 px-4">
								<Link href="/" aria-label="Ferris">
									<img
										height="30"
										width="100"
										src="/img/logo.png"
										alt="Logo"
										className="cursor-pointer inline-flex items-center mr-8 transition-colors duration-200 rounded-sm hover:bg-gray-800 p-3"
									/>
								</Link>
							</div>
							<nav>
								<div className="mt-5 flex-1 px-2 bg-gray-800 space-y-1">
									{navigation.map((item) => (
										<Link
											key={item.name}
											href={{
												pathname:
													'/control/[id]' +
													item.href.replace(
														'index',
														''
													),
												query: router.query,
											}}
										>
											<a
												key={item.name}
												className={classNames(
													item.href.includes(pageName)
														? 'bg-gray-900 text-white'
														: 'text-gray-300 hover:bg-gray-700 hover:text-white',
													'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
												)}
											>
												<item.icon
													className={classNames(
														item.href.includes(
															pageName
														)
															? 'text-gray-300'
															: 'text-gray-400 group-hover:text-gray-300',
														'mr-3 flex-shrink-0 h-6 w-6'
													)}
													aria-hidden="true"
												/>
												{item.name}
											</a>
										</Link>
									))}
								</div>
								<div className="flex-1 px-2 mt-8">
									<h3
										className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider"
										id="projects-headline"
									>
										Other Links
									</h3>
									<div
										className="mt-4 space-y-1"
										aria-labelledby="projects-headline"
									>
										{secondaryNavigation.map((item) => (
											<Link
												href={item.href}
												key={item.name}
											>
												<a
													key={item.name}
													className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-500 hover:bg-gray-700 hover:text-white"
												>
													<span className="truncate">
														{item.name}
													</span>
												</a>
											</Link>
										))}
									</div>
								</div>
							</nav>
						</div>
						<div className="flex-shrink-0 flex bg-gray-700 p-4">
							<a
								href="#"
								className="flex-shrink-0 w-full group block"
							>
								<div className="flex items-center">
									<div>
										<img
											className="inline-block h-9 w-9 rounded-full"
											src={auth.photoURL}
											alt=""
										/>
									</div>
									<div className="ml-3">
										<p className="text-sm font-medium text-white">
											{auth.displayName}
										</p>
										<p className="text-xs font-medium text-gray-300 group-hover:text-gray-200">
											View profile
										</p>
									</div>
								</div>
							</a>
						</div>
					</div>
				</div>
			</div>
			<div className="flex flex-col w-0 flex-1 overflow-hidden">
				<div className="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
					<button
						className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-green-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
						onClick={() => setSidebarOpen(true)}
					>
						<span className="sr-only">Open sidebar</span>
						<MenuIcon className="h-6 w-6" aria-hidden="true" />
					</button>
				</div>
				<main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
					<div className="py-6">
						<div className="min-h-screen space-y-8">
							{props.children}
						</div>
						<Footer />
					</div>
				</main>
			</div>
		</div>
	);
};

export const ControlContent: FC = (props) => {
	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
			{props.children}
		</div>
	);
};

export const ControlMainTitle: FC = (props) => {
	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<h1 className="text-2xl font-semibold text-gray-100">
				{props.children || 'Title Goes Here'}
			</h1>
		</div>
	);
};

export const ControlCard: FC<{ title: string; desc: string }> = (props) => {
	return (
		<div className="max-w-7xl mx-auto sm:px-6 lg:px-8 my-4">
			<div className="bg-gray-800 px-4 py-5 border-b border-gray-700 sm:px-6 sm:rounded-t-lg">
				<h3 className="text-lg leading-6 font-medium text-green-100">
					{props.title}
				</h3>
				<p className="mt-1 text-sm text-gray-200">{props.desc}</p>
			</div>
			<div className="bg-gray-700 border-gray-700 sm:px-6 sm:rounded-b-lg">
				{props.children}
			</div>
		</div>
	);
};
