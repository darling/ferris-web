import { ExternalLinkIcon } from '@heroicons/react/solid';
import Link from 'next/link';

export const AboutBanner = () => (
	<>
		<div className="bg-green-500">
			<div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
				<div className="text-center">
					<h2 className="text-base font-semibold text-white tracking-wide uppercase">
						Ferris.gg
					</h2>
					<p className="mt-1 text-4xl font-extrabold sm:text-5xl sm:tracking-tight lg:text-6xl">
						About Us
					</p>
					<p className="max-w-xl mt-5 mx-auto text-xl text-gray-100">
						We're just a small team of friends looking to make a
						service to improve communities.
					</p>
				</div>
			</div>
		</div>
	</>
);

export const AboutTeam = () => (
	<>
		<div className="">
			<div className="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
				<div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-8">
					<div className="space-y-5 sm:space-y-4">
						<h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
							Meet the team
						</h2>
						<p className=" text-gray-300">
							We make Ferris work. Feel free to join the Discord
							and say "hi" anytime.
						</p>
					</div>
					<div className="lg:col-span-2">
						<ul className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-12 sm:space-y-0 lg:gap-x-8">
							<li>
								<div className="flex items-center space-x-4 lg:space-x-6">
									<img
										className="w-16 h-16 rounded-full lg:w-20 lg:h-20"
										src="https://i.imgur.com/Ag9ATAr.gif"
										alt=""
									/>
									<div className="font-medium text-lg leading-6 space-y-1">
										<h3>Safe</h3>
										<p className="text-green-300">
											Lead Developer / Founder
										</p>
									</div>
								</div>
							</li>

							<li>
								<div className="flex items-center space-x-4 lg:space-x-6">
									<img
										className="w-16 h-16 rounded-full lg:w-20 lg:h-20"
										src="https://i.imgur.com/gSAwGmP.gif"
										alt=""
									/>
									<div className="font-medium text-lg leading-6 space-y-1">
										<h3>Matt</h3>
										<p className="text-green-300">
											Co-Founder / Developer
										</p>
									</div>
								</div>
							</li>

							<li>
								<div className="flex items-center space-x-4 lg:space-x-6">
									<img
										className="w-16 h-16  lg:w-20 lg:h-20"
										src="https://cdn.discordapp.com/attachments/789220935818412073/832078264511758336/profileIcon_snoo96e689f0-a293-4e45-b6b2-32c0b667bcc5-headshot.png"
										alt=""
									/>
									<div className="font-medium text-lg leading-6 space-y-1">
										<h3>Cut</h3>
										<p className="text-green-300">
											Manager
										</p>
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</>
);

export const AboutFaq = () => (
	<>
		<div className="relative bg-gray-800">
			<div className="h-56 bg-green-400 sm:h-72 md:absolute md:left-0 md:h-full md:w-1/2">
				<img
					className="w-full h-full object-cover"
					src="/img/security.png"
					alt=""
				/>
			</div>
			<div className="relative max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
				<div className="md:ml-auto md:w-1/2 md:pl-10">
					<h2 className="text-base font-semibold uppercase tracking-wider text-gray-300">
						Build your community
					</h2>
					<p className="mt-2 text-green-100 text-3xl font-extrabold tracking-tight sm:text-4xl">
						See what we have to offer
					</p>
					<p className="mt-3  text-gray-300">
						Every feature of Ferris is given love and built to be
						used. Try it out and see exactly what we stand for.
					</p>
					<p className="mt-3  text-gray-300">
						If anything is wrong, or if you need support, feel free
						to reach out to us.
					</p>
					<div className="mt-8">
						<div className="inline-flex rounded-md shadow">
							<Link href="/control">
								<a className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-white hover:bg-gray-50">
									Get Started
									<ExternalLinkIcon
										className="-mr-1 ml-3 h-5 w-5 text-gray-400"
										aria-hidden="true"
									/>
								</a>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	</>
);
