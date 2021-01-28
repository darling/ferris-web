import Link from 'next/link';
import { GetStartedButton } from './ui/GetStartedButton';

export const HomeHero = () => {
	return (
		<div className="relative px-4 pt-16 mx-auto lg:py-32 md:px-8 sm:max-w-xl md:max-w-full">
			<div className="max-w-xl mx-auto lg:max-w-full">
				<div className="mb-16 lg:max-w-lg lg:mb-0">
					<div className="max-w-xl mb-6">
						<div>
							<p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-green-900 uppercase rounded-full bg-green-400">
								In Beta
							</p>
						</div>
						<h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl sm:leading-none">
							Let Ferris protect your{' '}
							<span className="inline-block text-green-400">
								Community
							</span>
							.
						</h2>
						<p className="text-base text-green-200 md:text-lg">
							Ferris is a Discord bot created to secure and manage
							Discord servers of all sizes.
						</p>
					</div>
					<div className="flex items-center">
						<GetStartedButton />
					</div>
				</div>
			</div>
			<div className="flex justify-center h-full overflow-hidden lg:w-2/3 xl:w-1/2 lg:absolute lg:justify-start lg:bottom-0 lg:right-0 lg:items-end">
				<img
					src="/img/front-banner-dark.png"
					className="object-cover object-top w-full h-64 max-w-xl -mb-16 rounded lg:ml-64 xl:ml-8 lg:-mb-24 xl:-mb-28 lg:h-auto lg:max-w-screen-md"
					alt=""
				/>
			</div>
		</div>
	);
};

export const HomeFeatureFirst = () => {
	return (
		<div className="px-4 py-16 mx-auto container md:px-24 lg:px-8 lg:py-20">
			<div className="flex flex-col mb-6 lg:flex-row md:mb-10">
				<div className="lg:w-1/2">
					<h2 className="max-w-md mb-6 font-sans text-3xl font-bold tracking-tight text-green-200 sm:text-4xl sm:leading-none xl:max-w-lg">
						Use a bot that performs under pressure.
					</h2>
				</div>
				<div className="lg:w-1/2">
					<p className="text-base text-gray-100 md:text-lg">
						Build a server with the best utilities available. From a
						real-time web panel to rich and improved commands,
						Ferris has all the features that it needs to protect
						your community.
					</p>
				</div>
			</div>
			<div className="grid gap-8 row-gap-10 sm:grid-cols-2 lg:grid-cols-4">
				<div>
					<div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gray-800">
						<svg
							className="w-8 h-8 text-green-300"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
								clipRule="evenodd"
							/>
						</svg>
					</div>
					<h6 className="mb-2 font-semibold leading-5">
						Security First
					</h6>
					<p className="mb-3 text-sm text-green-100">
						All of our commands are tied to Discord permissions for
						easy use.
					</p>
					<ul className="mb-4 -ml-1 space-y-2">
						<li className="flex items-start">
							<span className="mr-1">
								<svg
									className="w-5 h-5 mt-px text-green-400"
									stroke="currentColor"
									viewBox="0 0 52 52"
								>
									<polygon
										strokeWidth="4"
										strokeLinecap="round"
										strokeLinejoin="round"
										fill="none"
										points="29 13 14 29 25 29 23 39 38 23 27 23"
									/>
								</svg>
							</span>
							Role management
						</li>
						<li className="flex items-start">
							<span className="mr-1">
								<svg
									className="w-5 h-5 mt-px text-green-400"
									stroke="currentColor"
									viewBox="0 0 52 52"
								>
									<polygon
										strokeWidth="4"
										strokeLinecap="round"
										strokeLinejoin="round"
										fill="none"
										points="29 13 14 29 25 29 23 39 38 23 27 23"
									/>
								</svg>
							</span>
							User punishments
						</li>
						<li className="flex items-start">
							<span className="mr-1">
								<svg
									className="w-5 h-5 mt-px text-green-400"
									stroke="currentColor"
									viewBox="0 0 52 52"
								>
									<polygon
										strokeWidth="4"
										strokeLinecap="round"
										strokeLinejoin="round"
										fill="none"
										points="29 13 14 29 25 29 23 39 38 23 27 23"
									/>
								</svg>
							</span>
							Guild features
						</li>
					</ul>
				</div>
				<div>
					<div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gray-800">
						<svg
							className="w-8 h-8 text-green-300"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
							<path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
							<path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
						</svg>
					</div>
					<h6 className="mb-2 font-semibold leading-5">
						Real-time Data
					</h6>
					<p className="mb-3 text-sm text-green-100">
						Ferris' control panel offers real-time values for your
						guild. Instantly see changes when they're made.
					</p>
					<ul className="mb-4 -ml-1 space-y-2">
						<li className="flex items-start">
							<span className="mr-1">
								<svg
									className="w-5 h-5 mt-px text-green-400"
									stroke="currentColor"
									viewBox="0 0 52 52"
								>
									<polygon
										strokeWidth="4"
										strokeLinecap="round"
										strokeLinejoin="round"
										fill="none"
										points="29 13 14 29 25 29 23 39 38 23 27 23"
									/>
								</svg>
							</span>
							Statistics
						</li>
						<li className="flex items-start">
							<span className="mr-1">
								<svg
									className="w-5 h-5 mt-px text-green-400"
									stroke="currentColor"
									viewBox="0 0 52 52"
								>
									<polygon
										strokeWidth="4"
										strokeLinecap="round"
										strokeLinejoin="round"
										fill="none"
										points="29 13 14 29 25 29 23 39 38 23 27 23"
									/>
								</svg>
							</span>
							Settings
						</li>
						<li className="flex items-start">
							<span className="mr-1">
								<svg
									className="w-5 h-5 mt-px text-green-400"
									stroke="currentColor"
									viewBox="0 0 52 52"
								>
									<polygon
										strokeWidth="4"
										strokeLinecap="round"
										strokeLinejoin="round"
										fill="none"
										points="29 13 14 29 25 29 23 39 38 23 27 23"
									/>
								</svg>
							</span>
							Commands
						</li>
					</ul>
				</div>
				<div className="hidden md:block">
					<div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gray-800">
						<svg
							className="w-8 h-8 text-green-300"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
								clipRule="evenodd"
							/>
						</svg>
					</div>
					<h6 className="mb-2 font-semibold leading-5">
						Responsive Developers
					</h6>
					<p className="mb-3 text-sm text-green-100">
						Join the Ferris Support Discord Server to contact the
						developers of Ferris.
					</p>
					<ul className="mb-4 -ml-1 space-y-2">
						<li className="flex items-start">
							<span className="mr-1">
								<svg
									className="w-5 h-5 mt-px text-green-400"
									stroke="currentColor"
									viewBox="0 0 52 52"
								>
									<polygon
										strokeWidth="4"
										strokeLinecap="round"
										strokeLinejoin="round"
										fill="none"
										points="29 13 14 29 25 29 23 39 38 23 27 23"
									/>
								</svg>
							</span>
							Request features
						</li>
						<li className="flex items-start">
							<span className="mr-1">
								<svg
									className="w-5 h-5 mt-px text-green-400"
									stroke="currentColor"
									viewBox="0 0 52 52"
								>
									<polygon
										strokeWidth="4"
										strokeLinecap="round"
										strokeLinejoin="round"
										fill="none"
										points="29 13 14 29 25 29 23 39 38 23 27 23"
									/>
								</svg>
							</span>
							Stats
						</li>
						<li className="flex items-start">
							<span className="mr-1">
								<svg
									className="w-5 h-5 mt-px text-green-400"
									stroke="currentColor"
									viewBox="0 0 52 52"
								>
									<polygon
										strokeWidth="4"
										strokeLinecap="round"
										strokeLinejoin="round"
										fill="none"
										points="29 13 14 29 25 29 23 39 38 23 27 23"
									/>
								</svg>
							</span>
							Feedback
						</li>
					</ul>
				</div>
				<div className="hidden md:block">
					<div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gray-800">
						<svg
							className="w-8 h-8 text-green-300"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								d="M2 5a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm14 1a1 1 0 11-2 0 1 1 0 012 0zM2 13a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2zm14 1a1 1 0 11-2 0 1 1 0 012 0z"
								clipRule="evenodd"
							/>
						</svg>
					</div>
					<h6 className="mb-2 font-semibold leading-5">
						Build a platform
					</h6>
					<p className="mb-3 text-sm text-green-100">
						Ferris offers a number of utilities for you to work on
						building a better community.
					</p>
					<ul className="mb-4 -ml-1 space-y-2">
						<li className="flex items-start">
							<span className="mr-1">
								<svg
									className="w-5 h-5 mt-px text-green-400"
									stroke="currentColor"
									viewBox="0 0 52 52"
								>
									<polygon
										strokeWidth="4"
										strokeLinecap="round"
										strokeLinejoin="round"
										fill="none"
										points="29 13 14 29 25 29 23 39 38 23 27 23"
									/>
								</svg>
							</span>
							Commands
						</li>
						<li className="flex items-start">
							<span className="mr-1">
								<svg
									className="w-5 h-5 mt-px text-green-400"
									stroke="currentColor"
									viewBox="0 0 52 52"
								>
									<polygon
										strokeWidth="4"
										strokeLinecap="round"
										strokeLinejoin="round"
										fill="none"
										points="29 13 14 29 25 29 23 39 38 23 27 23"
									/>
								</svg>
							</span>
							Events
						</li>
						<li className="flex items-start">
							<span className="mr-1">
								<svg
									className="w-5 h-5 mt-px text-green-400"
									stroke="currentColor"
									viewBox="0 0 52 52"
								>
									<polygon
										strokeWidth="4"
										strokeLinecap="round"
										strokeLinejoin="round"
										fill="none"
										points="29 13 14 29 25 29 23 39 38 23 27 23"
									/>
								</svg>
							</span>
							Engagement
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export const HomeEndHero = () => {
	return (
		<div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
			<div className="max-w-xl sm:mx-auto lg:max-w-2xl">
				<div className="flex flex-col mb-16 sm:text-center sm:mb-0">
					<Link href="/">
						<div className="mb-6 sm:mx-auto">
							<div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-800">
								<svg
									className="w-10 h-10 text-green-100"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
								</svg>
							</div>
						</div>
					</Link>
					<div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
						<h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-green-100 sm:text-4xl md:mx-auto">
							<span className="relative inline-block">
								<svg
									viewBox="0 0 52 24"
									fill="currentColor"
									className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-green-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
								>
									<defs>
										<pattern
											id="e77df901-b9d7-4b9b-822e-16b2d410795b"
											x="0"
											y="0"
											width=".135"
											height=".30"
										>
											<circle cx="1" cy="1" r=".7" />
										</pattern>
									</defs>
									<rect
										fill="url(#e77df901-b9d7-4b9b-822e-16b2d410795b)"
										width="52"
										height="24"
									/>
								</svg>
								<span className="relative">Still</span>
							</span>{' '}
							have questions?
						</h2>
						<p className="text-base text-green-100 md:text-lg">
							Try Ferris for free! Ferris is still under
							development, so please make sure to check out the
							Ferris Support Server to input constructive
							criticism or suggest new features.
						</p>
					</div>
					<div>
						<GetStartedButton />
					</div>
				</div>
			</div>
		</div>
	);
};
