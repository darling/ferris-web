interface Props {
	data: any;
}

const JSONstringify = ({ data }: Props) => {
	return (
		<pre className="bg-green-900 rounded-lg p-5">
			<code>{'DEBUG\n' + JSON.stringify(data, null, 4)}</code>
		</pre>
	);
};

export default JSONstringify;
