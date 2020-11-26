export const SmallHero = ({ title, href = '/', description }: any) => {
	return (
		<div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
			<div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-gray-600 lg:w-20 lg:h-20">
				<svg
					className="w-10 h-10 text-green-500 lg:w-16 lg:h-16"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
			</div>
			<div className="flex flex-col lg:flex-row">
				<div className="mb-6 lg:mb-0 lg:w-1/2 lg:pr-5">
					<h2 className="mb-5 font-sans text-3xl font-bold tracking-tight text-green-300 sm:text-4xl sm:leading-none">
						{title}
					</h2>
					<a
						href={href}
						aria-label=""
						className="inline-flex items-center font-semibold transition-colors duration-200 text-green-500 hover:text-green-800"
					>
						Learn more
					</a>
				</div>
				<div className="lg:w-1/2">
					<p className="text-base text-green-100">{description}</p>
				</div>
			</div>
		</div>
	);
};
