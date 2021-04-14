export const SectionHeading = (props: { heading: string }) => {
	return (
		<div className="pb-5 border-b border-gray-200">
			<h3 className="text-2xl leading-6 font-medium">{props.heading}</h3>
		</div>
	);
};
