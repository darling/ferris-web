function a(props: any) {
	return <a>{props.children}</a>;
}
function blockquote(props: any) {
	return <blockquote>{props.children}</blockquote>;
}
function code(props: any) {
	return (
		<pre className="bg-gray-800 py-2 px-3 rounded-md my-2 shadow-lg">
			<code>{props.children}</code>
		</pre>
	);
}
function em(props: any) {
	return <em>{props.children}</em>;
}
function h1(props: any) {
	return (
		<div className="flex flex-row items-center">
			<h1
				id={props.children.replace(/\s+/g, '-').toLowerCase()}
				className="text-5xl font-bold tracking-wider"
			>
				{props.children}
			</h1>
			<a href={'#' + props.children.replace(/\s+/g, '-').toLowerCase()}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					className="w-8 h-8 ml-3 text-gray-800 hover:text-green-300 transition-all duration-100"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
					/>
				</svg>
			</a>
		</div>
	);
}
function h2(props: any) {
	return (
		<h2 className="text-3xl font-semibold tracking-wide">
			{props.children}
		</h2>
	);
}
function h3(props: any) {
	return <h3 className="text-2xl tracking-wide">{props.children}</h3>;
}
function h4(props: any) {
	return <h4 className="text-xl tracking-wide">{props.children}</h4>;
}
function h5(props: any) {
	return <h5 className="text-lg">{props.children}</h5>;
}
function h6(props: any) {
	return <h6 className="">{props.children}</h6>;
}
function hr() {
	return (
		<hr className="border-gray-800 transition-colors duration-100 mb-3" />
	);
}
function inlineCode(props: any) {
	return (
		<code className="inline bg-gray-800 text-green-400 px-2 py-1 rounded-md shadow-lg">
			{props.children}
		</code>
	);
}
function p(props: any) {
	return <p className="">{props.children}</p>;
}
function img(props: any) {
	console.log(props);
	return (
		<img
			className="w-1/2 h-auto rounded-xl"
			src={props.src}
			alt={props.alt}
		/>
	);
}
export const components = {
	a,
	blockquote,
	code,
	em,
	h1,
	h2,
	h3,
	h4,
	h5,
	h6,
	hr,
	inlineCode,
	p,
	img,
};
