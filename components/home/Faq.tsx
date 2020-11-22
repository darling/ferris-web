import { useState } from 'react';

const Item = ({ title, children }: any) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="border-b">
			<button
				aria-label="open item"
				title="open item"
				className="flex items-center justify-between w-full p-4 focus:outline-none"
				onClick={() => setIsOpen(!isOpen)}
			>
				<p className="text-lg font-medium">{title}</p>
				<div className="flex items-center justify-center w-8 h-8 rounded-full">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						className={`w-8 text-green-400 transition-all duration-200 ${
							isOpen ? 'transform rotate-180' : ''
						}`}
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M19 9l-7 7-7-7"
						/>
					</svg>
				</div>
			</button>
			{isOpen && (
				<div className="p-4 pt-0">
					<p className="text-green-200">{children}</p>
				</div>
			)}
		</div>
	);
};

export const Faq = () => {
	return (
		<div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
			<div className="max-w-xl sm:mx-auto lg:max-w-2xl">
				<div className="flex flex-col mb-16 sm:text-center">
					<div className="mb-6 sm:mx-auto">
						<div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-800">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								className="w-10 h-10 text-green-400"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						</div>
					</div>
					<div className="max-w-xl md:mx-auto sm:text-center lg:max-w-2xl">
						<h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-green-100 sm:text-4xl md:mx-auto">
							<span className="relative inline-block">
								<svg
									viewBox="0 0 52 24"
									fill="currentColor"
									className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-green-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
								>
									<defs>
										<pattern
											id="ec5d8ef5-b853-4714-b94f-df28ec98eeb7"
											x="0"
											y="0"
											width=".135"
											height=".30"
										>
											<circle cx="1" cy="1" r=".7" />
										</pattern>
									</defs>
									<rect
										fill="url(#ec5d8ef5-b853-4714-b94f-df28ec98eeb7)"
										width="52"
										height="24"
									/>
								</svg>
								<span className="relative">Why</span>
							</span>{' '}
							are there so many questions here?
						</h2>
						<p className="text-base text-green-200 md:text-lg">
							We wanted to be prepared for any questions you have!
							Check it out!
						</p>
					</div>
				</div>
				<div className="space-y-4">
					<Item title="Why should I use Ferris?">
						As a mod of a few servers with hundreds of thousands of
						members each, I can confidently say that using bots is a
						drag. I wanted real tools that felt natural to use, as
						well as functional within the "Discord" flow.
						<br />
						<br />
						Ferris was my solution; it serves as a reliable backbone
						that any guild can build off of.
					</Item>
					<Item title="What can Ferris actually do?">
						Ferris is a moderation bot! It can moderate and manage
						your community.
						<br />
						<br />
						If you want to know the details, check out the
						documentation site! There's a list of every Discord
						command we have on there, plus more on how to use the
						web panel to your advantage.
					</Item>
					<Item title="What does Ferris cost? Is there a pricing model?">
						Currently, we do accept donations, but using Ferris is
						completely free! Any future premium features would be
						completely optional and only cost enough to cover the
						costs for running Ferris.
					</Item>
					<Item title="What does a real-time web panel mean?">
						We provide a website app that gives you real-time
						information on your guild; this means that when you
						change any settings in Discord, the settings in the
						panel will change to reflect those made in Discord.
						<br />
						<br />
						This panel is powerful and will provide a great service
						that you can use to work on your guild.
					</Item>
					<Item title="What about my privacy?">
						Privacy and security are very important to us! Ferris
						doesn't collect, distribute, or use data beyond what we
						need to provide a functional service. Most Discord bots
						don't collect data, but we take it a step further to
						make sure your details are secured and secret.
					</Item>
					<Item title="What is in the future for Ferris?">
						At the moment, I don't know! If you want a say in the
						future of Ferris, please join the{' '}
						<a
							href="/discord"
							className="text-blue-300 hover:text-blue-100 transition-all duration-100 underline"
						>
							Ferris Support Server
						</a>{' '}
						and reach out to us!
					</Item>
				</div>
			</div>
		</div>
	);
};
