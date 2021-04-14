import Link from 'next/link';
import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { useAuth } from '../../contexts/auth';
import { db } from '../../utils/auth/firebase';
import { FailedAuth } from '../../components/auth/FailedAuth';
import { GuildConfig } from '../../interfaces/control';

function guildIconExtension(hash: string): string {
	return hash.startsWith('a_') ? 'gif' : 'png';
}

const ControlIndex = () => {
	const [guilds, setGuilds] = useState<GuildConfig | {}>({});
	const user = useAuth();

	useEffect(() => {
		if (!user) {
			console.warn('user not logged in');
			return;
		}

		const ref = db.collection('users').doc(user.uid);

		const close = ref.onSnapshot((snapshot) => {
			console.log('fetching user guilds');
			console.log(snapshot.data());
			setGuilds(snapshot.data()?.guilds as GuildConfig);
		});

		return () => {
			close();
		};
	}, [user]);

	if (!user) {
		return <FailedAuth />;
	}

	return (
		<Layout title="Control Panel | Ferris Bot">
			<div className="p-5 mx-auto container">
				<h1 className="font-bold text-4xl">
					Welcome back, {user.displayName}!
				</h1>
				<h3>
					Hello! If you don't see any servers and think that's a
					mistake, please re-login! Thanks!
				</h3>
			</div>
			<div className="container mx-auto grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-5 rounded-lg">
				{guilds ? (
					Object.entries(guilds)
						.sort((a, b) => Number(a[0]) - Number(b[0]))
						.map((guild) => {
							return (
								<Link
									key={guild[0]}
									href={`control/${guild[0]}`}
								>
									<div className="hover:bg-gray-700 hover:text-green-200 hover:shadow-lg cursor-pointer transition-all duration-100 h-40 p-4 rounded-xl flex flex-col items-center content-center">
										<img
											src={
												guild[1].icon
													? `https://cdn.discordapp.com/icons/${
															guild[0]
													  }/${
															guild[1].icon
													  }.${guildIconExtension(
															guild[1].icon
													  )}`
													: `/img/placeholder-crystal.png`
											}
											alt="guild"
											className="rounded-full h-24 w-24"
										/>
										<p className="mt-3">{guild[1].name}</p>
									</div>
								</Link>
							);
						})
				) : (
					<div className="hover:bg-gray-700 hover:text-green-200 hover:shadow-lg transition-all duration-100 h-40 p-4 rounded-xl flex flex-col items-center content-center">
						<img
							src={`/img/placeholder-crystal.png`}
							alt="guild"
							className="rounded-full h-24 w-24"
						/>
						<p className="mt-3">No Guilds</p>
					</div>
				)}
			</div>
		</Layout>
	);
};

export default ControlIndex;
