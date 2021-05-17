export const ControlBase = (props: any) => {
	return (
		<>
			<div className="overflow-y-auto">
				<div className="min-h-screen">
					<div className="py-6">
						<div className="max-w-3xl mx-auto sm:px-6 lg:container lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
							<div className="px-4 md:p-0 lg:block lg:col-span-3 xl:col-span-2">
								<nav
									aria-label="Sidebar"
									className=" sticky top-6 divide-y divide-gray-300"
								>
									{props.sidebar}
								</nav>
							</div>
							<main className="lg:col-span-9 xl:col-span-6">
								<div className="">{props.children}</div>
							</main>
							<aside className="hidden xl:block xl:col-span-4">
								<div className=" sticky top-6 space-y-4">
									{props.optionalRight}
								</div>
							</aside>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
