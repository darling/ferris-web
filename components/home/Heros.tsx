import Link from 'next/link';
import { GetStartedButton } from './ui/GetStartedButton';

export const HomeHero = () => {
	return (
		<div className="relative flex flex-col-reverse px-4 p-8 md:p-16 mx-auto lg:block lg:flex-col lg:py-32 xl:py-48 md:px-8 sm:max-w-xl md:max-w-full">
			<div className="z-0 flex justify-center h-full overflow-hidden lg:pt-24 lg:pb-16 lg:pr-8 xl:pr-0 lg:w-1/2 lg:absolute lg:justify-end lg:bottom-0 lg:left-0 lg:items-center">
				<img
					src="/img/front-banner.png"
					width={710}
					height={540}
					className="object-right hidden md:flex lg:w-auto lg:h-full"
					alt="front example vector"
				/>
			</div>
			<div className="relative flex justify-end max-w-xl mx-auto lg:max-w-screen-xl">
				<div className="lg:pr-5 lg:max-w-lg lg:mb-0">
					<div className="max-w-xl mb-6">
						<h1 className="max-w-lg mb-6 font-sans text-3xl font-bold text-green-100 sm:text-4xl sm:leading-none">
							Let Ferris protect your{' '}
							<br className="hidden md:block" />{' '}
							<span className="inline-block text-green-400">
								community
							</span>
							.
						</h1>
						<h2 className="text-base text-green-100 md:text-lg">
							Ferris is a Discord bot created to secure and manage
							Discord servers of all sizes.
						</h2>
					</div>
					<form>
						<div className="flex items-center mt-4">
							<GetStartedButton />
							<Link href="/docs">
								<a className="ml-6 inline-flex items-center font-semibold transition-colors duration-200 text-green-400 hover:text-green-800">
									Learn more
								</a>
							</Link>
						</div>
					</form>
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
