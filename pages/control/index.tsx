import classNames from 'classnames';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { FailedAuth } from '../../components/auth/FailedAuth';
import Layout from '../../components/Layout';
import { useAuth } from '../../contexts/auth';
import { GuildConfig } from '../../interfaces/control';
import { db } from '../../utils/auth/firebase';

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
			<div className="pb-32 bg-green-500">
				<header className="py-10">
					<div className="container mx-auto px-4 sm:px-6 lg:px-8">
						<h1
							className={classNames(
								'text-3xl font-bold text-green-100'
							)}
						>
							Choose a community, {user?.displayName}
						</h1>
					</div>
				</header>
			</div>
			<div className="container mx-auto grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-5 rounded-lg -mt-32">
				{guilds ? (
					Object.entries(guilds)
						.sort((a, b) => Number(a[0]) - Number(b[0]))
						.map((guild) => {
							return (
								<Link
									key={guild[0]}
									href={`control/${guild[0]}`}
								>
									<div className="hover:bg-gray-700 bg-gray-800 hover:text-green-200 hover:shadow-lg cursor-pointer transition-all duration-100 h-40 p-4 rounded-xl flex flex-col items-center content-center">
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
										<span className="mt-3  font-bold">
											{guild[1].name}
										</span>
									</div>
								</Link>
							);
						})
				) : (
					<div className="bg-gray-800 hover:bg-gray-700 hover:text-green-200 hover:shadow-lg transition-all duration-100 h-40 p-4 rounded-xl flex flex-col prose text-green-300">
						<p>Uh oh!</p>
						<p>
							If you weren't expecting this, try to sign in once
							again!
						</p>
					</div>
				)}
			</div>
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<img src="/img/cta.png" alt="cta" className="max-h-96" />
			</div>
		</Layout>
	);
};

export default ControlIndex;
