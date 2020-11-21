export const HomeFaq = () => {
	return (
		<div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
			<div className="max-w-xl sm:mx-auto lg:max-w-2xl">
				<div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
					<h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none text-green-100 sm:text-4xl md:mx-auto">
						<span className="relative inline-block">
							<svg
								viewBox="0 0 52 24"
								fill="currentColor"
								className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-green-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
							>
								<defs>
									<pattern
										id="70326c9b-4a0f-429b-9c76-792941e326d5"
										x="0"
										y="0"
										width=".135"
										height=".30"
									>
										<circle cx="1" cy="1" r=".7" />
									</pattern>
								</defs>
								<rect
									fill="url(#70326c9b-4a0f-429b-9c76-792941e326d5)"
									width="52"
									height="24"
								/>
							</svg>
							<span className="relative">Why</span>
						</span>{' '}
						are there a ton of questions here?
					</h2>
					<p className="text-base text-green-200 md:text-lg">
						We wanted to be prepared for any questions you have!
						Check them out!
					</p>
				</div>
			</div>
			<div className="max-w-screen-xl sm:mx-auto">
				<div className="grid grid-cols-1 gap-16 row-gap-8 lg:grid-cols-2">
					<div className="space-y-8">
						<div>
							<p className="mb-4 text-xl font-medium">
								Why should I use Ferris?
							</p>
							<p className="text-green-200">
								As a mod of a few servers with hundreds of
								thousands of members each, I can confidently say
								that using bots is a drag. I wanted real tools
								that felt natural to use, as well as functional
								within the "Discord" flow.
								<br />
								<br />
								Ferris was my solution; it serves as a reliable
								backbone that any guild can build off of.
							</p>
						</div>
						<div>
							<p className="mb-4 text-xl font-medium">
								What can Ferris actually do?
							</p>
							<p className="text-green-200">
								Ferris is a moderation bot! It can moderate and
								manage your community.
								<br />
								<br />
								If you want to know the details, check out the
								documentation site! There's a list of every
								Discord command we have on there, plus more on
								how to use the web panel to your advantage.
							</p>
						</div>
						<div>
							<p className="mb-4 text-xl font-medium">
								What does Ferris cost? Is there a pricing model?
							</p>
							<p className="text-green-200">
								Currently, we do accept donations, but using
								Ferris is completely free! Any future premium
								features would be completely optional and only
								cost enough to cover the costs for running
								Ferris.
							</p>
						</div>
					</div>
					<div className="space-y-8">
						<div>
							<p className="mb-4 text-xl font-medium">
								What does a real-time web panel mean?
							</p>
							<p className="text-green-200">
								We provide a website app that gives you real-
								time information on your guild; this means that
								when you change any settings in Discord, the
								settings in the panel will change to reflect
								those made in Discord.
								<br />
								<br />
								This panel is powerful and will provide a great
								service that you can use to work on your guild.
							</p>
						</div>
						<div>
							<p className="mb-4 text-xl font-medium">
								What about my privacy?
							</p>
							<p className="text-green-200">
								Fortunately for you, privacy is just as
								important to me as it is for you. Ferris doesn't
								collect, distribute, or use data outside of what
								we need to give you a good service. Most Discord
								bots don't collect data, but we take it a step
								further to make sure your details are secured
								and secret.
							</p>
						</div>
						<div>
							<p className="mb-4 text-xl font-medium">
								What is in the future for Ferris?
							</p>
							<p className="text-green-200">
								At the moment, I don't know! If you want a say
								in the future of Ferris, please join the Support
								server and reach out to us! At the moment, I
								don't know! If you want a say in the Future of
								Ferris, please join the Support server and reach
								out to us!
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
