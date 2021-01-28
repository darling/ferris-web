import { useContext } from 'react';

import ControlPanel from '../../../components/ControlPanel';
import { GuildContext } from '../../../contexts/guild';

const ControlHome = () => {
	const guild = useContext(GuildContext);

	return (
		<ControlPanel>
			<h1 className="font-bold tracking-wide align-middle text-3xl md:text-6xl text-green-200">
				{'Control Home'}
			</h1>
			<div className="flex flex-col md:flex-row gap-2">
				<div className="flex-grow flex flex-col items-center md:bg-gray-800 p-4 rounded-lg">
					<h2 className="">Member Count</h2>
					<p className="font-mono font-bold text-6xl">
						{guild?.member_count}
					</p>
				</div>
				<div className="flex-grow flex flex-col items-center md:bg-gray-800 p-4 rounded-lg">
					<h2 className="">Role Count</h2>
					<p className="font-mono font-bold text-6xl">
						{Object.keys(guild?.roles || {}).length}
					</p>
				</div>
				<div className="flex-grow flex flex-col items-center md:bg-gray-800 p-4 rounded-lg">
					<h2 className="">Channel Count</h2>
					<p className="font-mono font-bold text-6xl">
						{Object.keys(guild?.channels || {}).length}
					</p>
				</div>
			</div>
			<p className="md:w-1/2">
				These statistics update in real-time! Try watching them change,
				or change the settings for your server through the buttons on
				the side-bar. <br />
				<br /> Thank you for using Ferris!
			</p>
		</ControlPanel>
	);
};

export default ControlHome;
