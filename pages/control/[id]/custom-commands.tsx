import React, { useContext } from 'react';
import ControlPanel from '../../../components/ControlPanel';
import { GuildContext } from '../../../contexts/guild';

const CustomCommands = () => {
	const guild = useContext(GuildContext);
	return (
		<ControlPanel>
			<h1 className="font-bold tracking-wide align-middle text-4xl text-green-200">
				{'Custom Commands'}
			</h1>
		</ControlPanel>
	);
};

export default CustomCommands;
