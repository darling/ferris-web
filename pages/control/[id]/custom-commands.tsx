import React, { useContext } from 'react';

import ControlPanel from '../../../components/ControlPanel';
import { GuildContext } from '../../../contexts/guild';
import { db } from '../../../utils/auth/firebase';

const CustomCommands = () => {
	const guild = useContext(GuildContext);

	const handleSubmit = async () => {
		db.collection('commands')
			.doc(guild?.id)
			.set(
				{
					test: { title: 'hello' },
					othertest: { title: 'whats up', description: 'tu mama' },
				}, // TODO: FINISH FORM AND DYNAMIC UPDATES OF MAP
				{ merge: true }
			);
	};

	return (
		<ControlPanel>
			<h1 className="font-bold tracking-wide align-middle text-4xl text-green-200">
				{'Custom Commands'}
			</h1>
			<button onClick={handleSubmit}>Send</button>
		</ControlPanel>
	);
};

export default CustomCommands;
