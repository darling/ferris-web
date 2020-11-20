import { useContext } from 'react';
import ControlPanel from '../../../components/ControlPanel';
import JSONstringify from '../../../components/dev/JSONstringify';
import { GuildContext } from '../../../contexts/guild';

const ControlWarns = () => {
	const guild = useContext(GuildContext);

	return (
		<ControlPanel>
			<p>Warning Page</p>
			{Object.entries(guild?.warns || {}).map((entry) => {
				const [uid, reasons] = entry;
				return (
					<div className="m-4 ml-0 p-2 bg-gray-700 rounded-lg">
						{uid}
						<br />
						{Object.entries(reasons).map((reason) => {
							const [timestamp, meta] = reason;
							return <p>{JSON.stringify(meta)}</p>;
						})}
					</div>
				);
			})}
			<JSONstringify data={guild} />
		</ControlPanel>
	);
};

export default ControlWarns;
