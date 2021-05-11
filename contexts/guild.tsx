import { useRouter } from 'next/router';
import { createContext, useEffect, useState } from 'react';
import { GuildConfig, GuildInfo } from '../interfaces/control';
import { db } from '../utils/auth/firebase';

export const GuildContext = createContext<GuildInfo | null>(null);
export const ConfigContext = createContext<GuildConfig | null>(null);

const GuildProvider = (props: any) => {
	const [guild, setGuild] = useState<GuildInfo | null>(null);
	const [config, setConfig] = useState<GuildConfig | null>(null);
	const router = useRouter();
	const { query } = router;

	useEffect(() => {
		const id = `${query.id}`;

		if (!id) {
			return;
		}

		console.log('Opening connection for guild', id);
		const guildDoc = db.collection('guilds').doc(id);
		const closeGuild = guildDoc.onSnapshot(
			(snapshot) => {
				console.log('database response');
				const data = snapshot.data();
				setGuild({
					...data,
					id: id,
					hasFerris: snapshot.exists,
				} as GuildInfo);
			},
			() => {
				console.log('permission denied');
				setGuild({
					blocked: true,
					member_count: 0,
					hasFerris: false,
				});
			}
		);

		const configDoc = db.collection('configs').doc(id);
		const closeConfig = configDoc.onSnapshot(
			(snapshot) => {
				console.log('database response');
				const data = snapshot.data();
				setConfig({
					...data,
				} as GuildConfig);
			},
			() => {
				console.log('permission denied');
				setConfig(null);
			}
		);

		return () => {
			console.log('closing connection');
			setGuild(null);
			setConfig(null);
			closeGuild();
			closeConfig();
		};
	}, [query.id]);

	return (
		<GuildContext.Provider value={guild}>
			<ConfigContext.Provider value={config}>
				{props.children}
			</ConfigContext.Provider>
		</GuildContext.Provider>
	);
};

export default GuildProvider;
