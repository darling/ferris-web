import { useContext } from 'react';
import ControlPanel from '../../../components/ControlPanel';
import JSONstringify from '../../../components/dev/JSONstringify';
import { GuildContext } from '../../../contexts/guild';

const ControlWarns = () => {
	const guild = useContext(GuildContext);

	return (
		<ControlPanel>
			<h1 className="font-bold tracking-wide align-middle text-4xl text-green-200">
				{'Config Home'}
			</h1>
			<JSONstringify data={guild} />
		</ControlPanel>
	);
};

export default ControlWarns;
