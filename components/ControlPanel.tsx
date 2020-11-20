import { useContext } from 'react';
import { useAuth } from '../contexts/auth';
import { GuildContext } from '../contexts/guild';
import Sidebar from './control/Sidebar';
import Layout from './Layout';

const ControlPanel = (props: any) => {
	const guild = useContext(GuildContext);
	const user = useAuth();
	// const router = useRouter();

	if (!user) {
		console.error('NO AUTH');
		return <Layout>Not authenticated</Layout>;
	}

	if (user && !guild) {
		return (
			<Layout>
				<p className="animate-pulse">Loading</p>
			</Layout>
		);
	}

	if (guild?.blocked) {
		return (
			<Layout>
				<p className="">Access Denied</p>
			</Layout>
		);
	}

	return (
		<Layout>
			<div className="flex flex-col items-start md:flex-row">
				<Sidebar
					entries={[
						{ name: 'Home' },
						{ name: 'Config', path: '/config' },
						{ name: 'Warns', path: '/warns' },
					]}
					guildName={guild?.name}
					guildIcon={guild?.icon}
				/>
				<div className="mt-2 mx-2 md:w-4/5">{props.children}</div>
			</div>
		</Layout>
	);
};

export default ControlPanel;
