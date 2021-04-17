export const SectionHeading = (props: { heading: string }) => {
	return (
		<div className="pb-5 border-b border-gray-700 sm:flex sm:items-center sm:justify-between">
			<h3 className="text-lg leading-6 font-medium">{props.heading}</h3>
		</div>
	);
};
