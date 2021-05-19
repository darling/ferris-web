import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import classNames from 'classnames';
import { capitalize, dropRight } from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC, Fragment, useEffect, useState } from 'react';

import Layout from '../Layout';

export interface DocProps {
	title?: string;
	sidebar?: any;
}

const Breadcrumbs: FC = () => {
	const router = useRouter();

	return (
		<div hidden={router.pathname.endsWith('docs')}>
			<nav className="sm:hidden" aria-label="Back">
				<Link href="/docs/commands">
					<a className="flex items-center text-sm font-medium text-gray-200 hover:text-white">
						<ChevronLeftIcon
							className="flex-shrink-0 -ml-1 mr-1 h-5 w-5 text-green-200"
							aria-hidden="true"
						/>
						Back
					</a>
				</Link>
			</nav>
			<nav className="hidden sm:flex" aria-label="Breadcrumb">
				<ol className="flex items-center space-x-4">
					{router.asPath
						.replace('/', '')
						.split('/')
						.map((pathSegName, i, route) => {
							return (
								<Breadcrumb
									first={i < 1}
									href={
										'/' +
										dropRight(
											route,
											route.length - 1 - i
										).join('/')
									}
								>
									{pathSegName}
								</Breadcrumb>
							);
						})}
				</ol>
			</nav>
		</div>
	);
};

const Breadcrumb: FC<{ children: string; first?: boolean; href: string }> = ({
	children,
	first = false,
	href,
}) => {
	return (
		<li>
			<div className="flex items-center">
				<ChevronRightIcon
					className={classNames(
						'flex-shrink-0 h-5 w-5 text-green-200',
						{ hidden: first }
					)}
					aria-hidden="true"
				/>
				<Link href={href}>
					<a
						className={classNames(
							'text-sm font-medium duration-200 transition-colors text-gray-200 hover:text-white',
							{ 'ml-4': !first }
						)}
					>
						{children}
					</a>
				</Link>
			</div>
		</li>
	);
};

export const Section: FC<{ className?: string }> = (props) => {
	return (
		<div
			className={classNames(
				'pb-5 border-b border-gray-200',
				props.className
			)}
		>
			<h3 className="text-lg leading-6 font-medium text-gray-900">
				{props.children}
			</h3>
		</div>
	);
};

export const DocsLayout: FC<DocProps> = ({ children, title, sidebar }) => {
	const router = useRouter();

	const hasSidebar = sidebar !== undefined;

	const [pageTitle, setPageTitle] = useState('Documentation');

	useEffect(() => {
		setPageTitle(
			title ||
				router.asPath
					.split('/')
					.pop()
					?.replace('docs', 'Documentation Home') ||
				''
		);
	}, [router]);

	return (
		<Layout
			headerClassName="bg-indigo-500"
			linkClassName="text-gray-200 hover:text-indigo-700"
			title={`${capitalize(pageTitle)} — Ferris Documentation`}
		>
			<div className="pb-32 bg-indigo-500">
				<header className="py-10">
					<div className="container mx-auto px-4 sm:px-6 lg:px-8">
						<Breadcrumbs />
						<h1
							className={classNames(
								'text-3xl font-bold text-green-100',
								{
									'animate-pulse':
										pageTitle === 'Documentation',
								}
							)}
						>
							{capitalize(pageTitle)}
						</h1>
					</div>
				</header>
			</div>

			<main className="-mt-32">
				<div className="container mx-auto pb-12 px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8 text-gray-800">
						{/* Left column */}
						<div className="grid grid-cols-1 gap-4 lg:col-span-2">
							<section aria-labelledby="section-1-title">
								<h2 className="sr-only" id="section-1-title">
									Basic Data
								</h2>
								<div className="rounded-lg bg-white overflow-hidden shadow">
									<div className="p-6">
										<Fragment>{children}</Fragment>
									</div>
								</div>
							</section>
						</div>

						{/* Right column */}
						<div
							className={classNames('grid grid-cols-1 gap-4', {
								hidden: !hasSidebar,
							})}
						>
							<section aria-labelledby="section-2-title">
								<h2 className="sr-only" id="section-2-title">
									Sidebar
								</h2>
								<div className="rounded-lg bg-white overflow-hidden shadow">
									<div className="p-6">{sidebar}</div>
								</div>
							</section>
						</div>
					</div>
				</div>
			</main>
		</Layout>
	);
};
