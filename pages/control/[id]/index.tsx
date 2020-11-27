import { useContext } from 'react';
import ControlPanel from '../../../components/ControlPanel';
import { GuildContext } from '../../../contexts/guild';
import { SmallHero } from './../../../components/SmallHero';

const ControlBox = (props: any) => {
	return (
		<div className={`bg-gray-800 p-3 rounded-md mr-3 ${props.className}`}>
			<h5 className="text-sm tracking-wider">{props.title}</h5>
			<h4 className="text-3xl font-bold">{props.value}</h4>
		</div>
	);
};

const ControlHome = () => {
	const guild = useContext(GuildContext);
	return (
		<ControlPanel>
			<h1 className="font-bold tracking-wide align-middle text-4xl text-green-200">
				{'Control Home'}
			</h1>
			<div className="flex flex-row w-full">
				<ControlBox
					className="w-1/3"
					title="Member Count"
					value={guild?.member_count}
				/>
				<ControlBox
					className="w-1/3"
					title="Warning Count"
					value={Object.keys(guild?.warns || {}).length}
				/>
				<ControlBox
					className="w-1/3"
					title="Roles"
					value={Object.keys(guild?.roles || {}).length}
				/>
			</div>
			<p>
				As a small demo, the statistics above update in{' '}
				<u>real time!</u> Try catching them change :)
			</p>
			<SmallHero
				title="Thank you for trying out the panel!"
				description="The only 'working' tab is the config tab, please try it out. Also, please check out our discord server for updates. The panel is so new that we had to put this here to show you that it's not empty."
				href="/discord"
			/>
		</ControlPanel>
	);
};

export default ControlHome;
