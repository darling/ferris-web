import Link from 'next/link';

const PricingPerk = ({ children }: any) => {
	return (
		<li className="flex items-center">
			<div className="mr-3">
				<svg
					className="w-4 h-4 text-green-400"
					viewBox="0 0 24 24"
					strokeLinecap="round"
					strokeWidth="2"
				>
					<polyline
						fill="none"
						stroke="currentColor"
						points="6,12 10,16 18,8"
					/>
					<circle
						cx="12"
						cy="12"
						fill="none"
						r="11"
						stroke="currentColor"
					/>
				</svg>
			</div>
			<p className="font-medium text-gray-700">{children}</p>
		</li>
	);
};

export const PricingCards = () => {
	return (
		<div className="relative w-full h-full">
			<div className="absolute hidden w-full bg-gray-800 lg:block h-96" />
			<div className="relative px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
				<div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
					<h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-50 sm:text-4xl md:mx-auto">
						<span className="relative inline-block">
							<svg
								viewBox="0 0 52 24"
								fill="currentColor"
								className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-gray-400 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
							>
								<defs>
									<pattern
										id="2c67e949-4a23-49f7-bf27-ca140852cf21"
										x="0"
										y="0"
										width=".135"
										height=".30"
									>
										<circle cx="1" cy="1" r=".7" />
									</pattern>
								</defs>
								<rect
									fill="url(#2c67e949-4a23-49f7-bf27-ca140852cf21)"
									width="52"
									height="24"
								/>
							</svg>
							<span className="relative">Affordable</span>
						</span>{' '}
						for everyone
					</h2>
					<p className="text-base text-green-200 md:text-lg">
						Ferris costs money, but with your help we can keep the
						lights on and provide the service for free, for
						everyone.
					</p>
				</div>
				<div className="grid max-w-screen-md gap-10 md:grid-cols-2 sm:mx-auto">
					<div>
						<div className="p-8 bg-gray-100 rounded">
							<div className="mb-4 text-center">
								<p className="text-xl font-medium tracking-wide text-gray-900">
									Starter Plan
								</p>
								<div className="flex items-center justify-center">
									<p className="mr-2 text-5xl font-semibold text-gray-900 lg:text-6xl">
										Free
									</p>
									<p className="text-lg text-gray-500">
										forever
									</p>
								</div>
							</div>
							<ul className="mb-8 space-y-2">
								<PricingPerk>Essential Commands</PricingPerk>
								<PricingPerk>Real-time Web Panel</PricingPerk>
								<PricingPerk>Logging</PricingPerk>
								<PricingPerk>Support</PricingPerk>
								<PricingPerk>Our Love</PricingPerk>
							</ul>
							<Link href="/control">
								<button
									name="Add Ferris"
									type="submit"
									className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-gray-100 transition duration-200 rounded shadow-md bg-green-400 hover:bg-white hover:text-gray-900 focus:shadow-outline focus:outline-none"
								>
									Get Started
								</button>
							</Link>
						</div>
						<div className="w-11/12 h-2 mx-auto bg-gray-100 rounded-b opacity-75" />
						<div className="w-10/12 h-2 mx-auto bg-gray-100 rounded-b opacity-50" />
						<div className="w-9/12 h-2 mx-auto bg-gray-100 rounded-b opacity-25" />
					</div>
					<div>
						<div className="p-8 bg-green-100 rounded">
							<div className="mb-4 text-center">
								<p className="text-xl font-medium tracking-wide text-gray-900">
									Premium Plan
								</p>
								<div className="flex items-center justify-center">
									<p className="mr-2 text-5xl font-semibold text-gray-900 lg:text-6xl">
										$3
									</p>
									<p className="text-lg text-gray-500">
										/ month
									</p>
								</div>
							</div>
							<ul className="mb-8 space-y-2">
								<PricingPerk>
									Everything in the Starter Plan, Plus...
								</PricingPerk>
								<PricingPerk>Fast, Private Support</PricingPerk>
								<PricingPerk>Custom Commands</PricingPerk>
							</ul>
							<Link href="/profile">
								<button
									type="submit"
									className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-gray-100 transition duration-200 rounded shadow-md bg-green-400 hover:bg-white hover:text-gray-900 focus:shadow-outline focus:outline-none"
								>
									Subscribe
								</button>
							</Link>
						</div>
						<div className="w-11/12 h-2 mx-auto bg-green-100 rounded-b opacity-75" />
						<div className="w-10/12 h-2 mx-auto bg-green-100 rounded-b opacity-50" />
						<div className="w-9/12 h-2 mx-auto bg-green-100 rounded-b opacity-25" />
					</div>
				</div>
			</div>
		</div>
	);
};
