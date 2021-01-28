import Link from 'next/link';
import { GetStartedButton } from './ui/GetStartedButton';

export const HomeFeatures = () => {
	return (
		<div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
			<div className="flex flex-col lg:flex-row">
				<div className="max-w-xl pr-16 mx-auto mb-10">
					<h2 className="mb-6 text-3xl font-bold leading-none text-green-300">
						Use a bot that works.
					</h2>
					<p className="mb-6">
						Build a server with the best utilities available. From a
						real-time web panel to rich and improved commands,
						Ferris has all the features that it needs to protect
						your community.
					</p>
					<div className="flex items-center">
						<GetStartedButton />
						<Link href="/docs">
							<a className="ml-6 inline-flex items-center font-semibold transition-colors duration-200 text-green-400 hover:text-green-800">
								Learn more
							</a>
						</Link>
					</div>
				</div>
				<div className="grid gap-5 row-gap-5 sm:grid-cols-2">
					<div className="max-w-md">
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
						<h3 className="mb-2 font-semibold leading-5">
							Security from the start
						</h3>
						<p className="text-sm text-green-100">
							Ferris was developed with security in mind. Ferris
							won't collect, use, or distribute any data beyond
							what will serve your needs.
						</p>
					</div>
					<div className="max-w-md">
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
						<h3 className="mb-2 font-semibold leading-5">
							Real-time data
						</h3>
						<p className="text-sm text-green-100">
							Discord offers real-time chat. It's time that bots
							keep up. Ferris uses a database configured to send
							data in less than a micro-second.
						</p>
					</div>
					<div className="max-w-md md:hidden">
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
						<h3 className="mb-2 font-semibold leading-5">
							Build a platform
						</h3>
						<p className="text-sm text-green-100">
							Use Ferris to run social events, control giveaways,
							and help announce messages. Ferris offers a number
							of utilities for you to work on building a better
							community.
						</p>
					</div>
					<div className="max-w-md md:hidden">
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
						<h3 className="mb-2 font-semibold leading-5">
							Responsive developers
						</h3>
						<p className="text-sm text-green-100">
							Join the Ferris Support Discord Server to contact
							the developers of Ferris. Get the features you want,
							made for you, for your server.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export const HomeFirstContent = () => {
	return (
		<div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
			<div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
				<h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-white sm:text-4xl md:mx-auto">
					<span className="relative inline-block">
						<svg
							viewBox="0 0 52 24"
							fill="currentColor"
							className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
						>
							<defs>
								<pattern
									id="2feffae2-9edf-414e-ab8c-f0e6396a0fc1"
									x="0"
									y="0"
									width=".135"
									height=".30"
								>
									<circle cx="1" cy="1" r=".7" />
								</pattern>
							</defs>
							<rect
								fill="url(#2feffae2-9edf-414e-ab8c-f0e6396a0fc1)"
								width="52"
								height="24"
							/>
						</svg>
						<span className="relative">Ferris</span>
					</span>{' '}
					will change the way that your run your community.
				</h2>
				<p className="text-base  text-green-200 md:text-lg">
					Ferris was built with other bots and large Discord servers
					in mind. With growing features, Ferris will be the solution
					for community safety and growth.
				</p>
			</div>
			<div className="grid max-w-screen-lg gap-8 lg:grid-cols-2 sm:mx-auto">
				<div className="grid grid-cols-2 gap-5">
					<img
						className="object-cover w-full h-56 col-span-2 rounded shadow-lg"
						src="https://i.imgur.com/sDxwzD7.png"
						alt=""
					/>
					<img
						className="object-cover w-full h-48 rounded shadow-lg"
						src="https://i.imgur.com/N4XsOfG.png"
						alt=""
					/>
					<img
						className="object-cover w-full h-48 rounded shadow-lg"
						src="https://i.imgur.com/a0Ww8ya.png"
						alt=""
					/>
				</div>
				<div className="flex flex-col justify-center">
					<div className="pb-4 mb-4 border-b">
						<h6 className="mb-2 font-semibold leading-5">
							Discord first approach
						</h6>
						<p className="text-sm  text-green-200">
							Commands are created to save time for tasks such as
							banning, moderation. Putting Discord first means
							that you don't have to think about permissions and
							user interaction with the bot.
						</p>
					</div>
					<div className="pb-4 mb-4 border-b">
						<h6 className="mb-2 font-semibold leading-5">
							Real-time architecture
						</h6>
						<p className="text-sm text-green-200">
							Ferris is unique becuase of its real-time systems.
							Warnings, punishments, logging is all accesible from
							the control panel and will update with changes
							within your Discord server.
						</p>
					</div>
					<div>
						<h6 className="mb-2 font-semibold leading-5">
							Easy to use, free forever
						</h6>
						<p className="text-sm text-green-200">
							The control panel and the bot commands are created
							to be intuitive and easy to use, but powerful and
							gives control to the users for managing their own
							guilds.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};
