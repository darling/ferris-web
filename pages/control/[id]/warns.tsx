// import { useContext } from 'react';
import ControlPanel from '../../../components/ControlPanel';
// import { GuildContext } from '../../../contexts/guild';

const ControlWarns = () => {
	// const guild = useContext(GuildContext);

	return (
		<ControlPanel>
			<h1 className="font-bold tracking-wide align-middle text-4xl text-green-200">
				{'Warning Page'}
			</h1>
			<p>
				Warnings is under construction, but you can still try things in
				real-time. Try the Discord warning commands out!
			</p>
		</ControlPanel>
	);
};

export default ControlWarns;
