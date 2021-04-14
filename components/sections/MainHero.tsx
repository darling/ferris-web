import Link from 'next/link';
import { GetStartedButton } from '../home/ui/GetStartedButton';

export const MainHero = () => {
	return (
		<div className="relative overflow-hidden">
			<div className="pt-10 bg-gray-900 sm:pt-16 lg:pt-8 lg:pb-14 lg:overflow-hidden">
				<div className="mx-auto container">
					<div className="lg:grid lg:grid-cols-2">
						<div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center">
							<div className="lg:py-24">
								<Link href="/discord">
									<a className="inline-flex items-center text-white bg-gray-800 rounded-full p-1 pr-2 sm:text-base lg:text-sm xl:text-base hover:text-gray-200">
										<span className="px-3 py-0.5 text-white text-xs font-semibold leading-5 uppercase tracking-wide bg-green-500 rounded-full">
											In Beta
										</span>
										<span className="ml-4 text-sm">
											Join our Discord server
										</span>
										<svg
											className="ml-2 w-5 h-5 text-gray-500"
											data-todo-x-description="Heroicon name: solid/chevron-right"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20"
											fill="currentColor"
											aria-hidden="true"
										>
											<path
												fillRule="evenodd"
												d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
												clipRule="evenodd"
											></path>
										</svg>
									</a>
								</Link>
								<h1 className="mt-4 text-4xl tracking-tight font-extrabold text-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
									<span className="block">Protect your</span>
									<span className="block text-green-400">
										Discord Community
									</span>
								</h1>
								<p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
									Ferris is a high-caliber Discord bot created
									to secure and manage Discord servers of all
									sizes. Protect your members today.
								</p>
								<div className="mt-7">
									<form
										action="#"
										className="sm:max-w-xl sm:mx-auto lg:mx-0"
									>
										<GetStartedButton />
										<p className="mt-3 text-sm text-gray-300 sm:mt-4">
											Sign in with Discord and get started
											in seconds.
										</p>
									</form>
								</div>
							</div>
						</div>
						<div className="mt-12 -mb-16 sm:-mb-48 lg:m-0 lg:relative">
							<div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
								<img
									className="w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
									src="/img/ferris-hero.png"
									alt=""
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
