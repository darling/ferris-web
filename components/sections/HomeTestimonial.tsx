export const HomeTestimonial = () => {
	return (
		<section className="py-12 overflow-hidden md:py-20 lg:py-24">
			<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<svg
					className="absolute top-full right-full transform translate-x-1/3 -translate-y-1/4 lg:translate-x-1/2 xl:-translate-y-1/2"
					width="404"
					height="404"
					fill="none"
					viewBox="0 0 404 404"
					role="img"
					aria-labelledby="svg-workcation"
				>
					<title id="svg-workcation">Workcation</title>
					<defs>
						<pattern
							id="ad119f34-7694-4c31-947f-5c9d249b21f3"
							x="0"
							y="0"
							width="20"
							height="20"
							patternUnits="userSpaceOnUse"
						>
							<rect
								x="0"
								y="0"
								width="4"
								height="4"
								className="text-green-200"
								fill="currentColor"
							></rect>
						</pattern>
					</defs>
					<rect
						width="404"
						height="404"
						fill="url(#ad119f34-7694-4c31-947f-5c9d249b21f3)"
					></rect>
				</svg>

				<div className="relative">
					<img
						className="mx-auto h-16"
						src="https://soyummy.com/wp-content/themes/soyummy/partials/header/assets/soyummy-logo@3x.png"
						alt="Workcation"
					/>
					<blockquote className="mt-10">
						<div className="max-w-3xl mx-auto text-center text-2xl leading-9 font-medium">
							<p>
								“While Ferris is a fairly new bot, its proven to
								be very helpful in server management. Of course
								there is always room for improvement, but the
								overall features and commands have made it
								easier to moderate servers.”
							</p>
						</div>
						<footer className="mt-8">
							<div className="md:flex md:items-center md:justify-center">
								<div className="md:flex-shrink-0">
									<img
										className="mx-auto h-10 w-10 rounded-full"
										src="/img/placeholder-crystal.png"
										alt=""
									/>
								</div>
								<div className="mt-3 text-center md:mt-0 md:ml-4 md:flex md:items-center">
									<div className="text-base font-medium">
										Dee
									</div>

									<svg
										className="hidden md:block mx-1 h-5 w-5 text-green-300"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path d="M11 0h3L9 20H6l5-20z"></path>
									</svg>

									<div className="text-base font-medium text-green-100">
										Owner of Yyummy!
									</div>
								</div>
							</div>
						</footer>
					</blockquote>
				</div>
			</div>
		</section>
	);
};
