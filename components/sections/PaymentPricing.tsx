import Link from 'next/link';

export const PaymentPricing = () => {
	return (
		<>
			<div className="bg-gray-900">
				<div className="container mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
					<div className="pb-16 xl:flex xl:items-center xl:justify-between">
						<div>
							<h1 className="text-4xl font-extrabold sm:text-5xl sm:tracking-tight">
								<span className="">Support Ferris for </span>
								<span className="text-green-400">
									$3 a month
								</span>
							</h1>
							<p className="mt-5 text-xl text-white">
								Includes every feature we offer. Keep our lights
								on and support us monthly.
							</p>
						</div>
						<Link href="/profile">
							<a className="mt-8 w-full bg-green-400 border border-gray-700 border-transparent px-5 py-3 inline-flex items-center justify-center text-base font-medium rounded-md text-white hover:bg-green-700 sm:mt-10 sm:w-auto xl:mt-0">
								Get started today
							</a>
						</Link>
					</div>
					<div className="border-t border-gray-700 pt-16 xl:grid xl:grid-cols-3 xl:gap-x-8">
						<div>
							<h2 className="text-base font-semibold text-green-400 tracking-wide uppercase">
								POWER UP YOUR SERVER
							</h2>
							<p className="mt-2 text-3xl font-extrabold ">
								Upgrade Ferris to its fullest potential.
							</p>
							<p className="mt-4 text-lg text-white">
								Ferris takes money to host, by supporting us we
								can provide your server with the best experience
								possible. All extra revenue is geared towards
								Ferris as a whole.
							</p>
						</div>
						<div className="mt-4 sm:mt-8 md:mt-10 md:grid md:grid-cols-2 md:gap-x-8 xl:mt-0 xl:col-span-2">
							<ul className="divide-y divide-gray-700">
								<li className="py-4 flex md:py-0 md:pb-4">
									<svg
										className="flex-shrink-0 h-6 w-6 text-green-500"
										data-todo-x-description="Heroicon name: outline/check"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										aria-hidden="true"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M5 13l4 4L19 7"
										></path>
									</svg>
									<span className="ml-3 text-base text-white">
										Unlimited Custom Commands
									</span>
								</li>

								<li className="py-4 flex">
									<svg
										className="flex-shrink-0 h-6 w-6 text-green-500"
										data-todo-x-description="Heroicon name: outline/check"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										aria-hidden="true"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M5 13l4 4L19 7"
										></path>
									</svg>
									<span className="ml-3 text-base text-white">
										Unlimited Filter Tags
									</span>
								</li>

								<li className="py-4 flex">
									<svg
										className="flex-shrink-0 h-6 w-6 text-green-500"
										data-todo-x-description="Heroicon name: outline/check"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										aria-hidden="true"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M5 13l4 4L19 7"
										></path>
									</svg>
									<span className="ml-3 text-base text-white">
										Upgraded Control Panel
									</span>
								</li>

								<li className="py-4 flex">
									<svg
										className="flex-shrink-0 h-6 w-6 text-green-500"
										data-todo-x-description="Heroicon name: outline/check"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										aria-hidden="true"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M5 13l4 4L19 7"
										></path>
									</svg>
									<span className="ml-3 text-base text-white">
										In-depth user reporting
									</span>
								</li>

								<li className="py-4 flex">
									<svg
										className="flex-shrink-0 h-6 w-6 text-green-500"
										data-todo-x-description="Heroicon name: outline/check"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										aria-hidden="true"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M5 13l4 4L19 7"
										></path>
									</svg>
									<span className="ml-3 text-base text-white">
										(Coming Soon) Custom Themes
									</span>
								</li>
							</ul>
							{/* <ul className="border-t divide-gray-700 divide-y divide-gray-700 md:border-t-0">
								<li className="py-4 flex md:border-t-0 md:py-0 md:pb-4">
									<svg
										className="flex-shrink-0 h-6 w-6 text-green-500"
										data-todo-x-description="Heroicon name: outline/check"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										aria-hidden="true"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M5 13l4 4L19 7"
										></path>
									</svg>
									<span className="ml-3 text-base text-white">
										Vitae in pulvinar odio id utobortis in
										inter.
									</span>
								</li>

								<li className="py-4 flex">
									<svg
										className="flex-shrink-0 h-6 w-6 text-green-500"
										data-todo-x-description="Heroicon name: outline/check"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										aria-hidden="true"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M5 13l4 4L19 7"
										></path>
									</svg>
									<span className="ml-3 text-base text-white">
										Sed sed id viverra viverra augue eget
										massa.
									</span>
								</li>

								<li className="py-4 flex">
									<svg
										className="flex-shrink-0 h-6 w-6 text-green-500"
										data-todo-x-description="Heroicon name: outline/check"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										aria-hidden="true"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M5 13l4 4L19 7"
										></path>
									</svg>
									<span className="ml-3 text-base text-white">
										Urna, gravida amet, a, integer
										venenatis.
									</span>
								</li>

								<li className="py-4 flex">
									<svg
										className="flex-shrink-0 h-6 w-6 text-green-500"
										data-todo-x-description="Heroicon name: outline/check"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										aria-hidden="true"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M5 13l4 4L19 7"
										></path>
									</svg>
									<span className="ml-3 text-base text-white">
										Lobortis sed pharetra amet vitae
										eleifend.
									</span>
								</li>

								<li className="py-4 flex">
									<svg
										className="flex-shrink-0 h-6 w-6 text-green-500"
										data-todo-x-description="Heroicon name: outline/check"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										aria-hidden="true"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M5 13l4 4L19 7"
										></path>
									</svg>
									<span className="ml-3 text-base text-white">
										Ullamcorper blandit a consequat donec
										elit aoreet.
									</span>
								</li>
							</ul> */}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
