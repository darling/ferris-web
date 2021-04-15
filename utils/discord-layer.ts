import { DiscordUser } from '../interfaces';
import { fetchApi } from './auth/fetch';

const usersCollection = new Map<string, any>();

export const getUserInfo = async (id: string): Promise<DiscordUser> => {
	const isLocal = usersCollection.has(id);

	if (isLocal) {
		return usersCollection.get(id);
	}

	console.log('REQUEST', id);

	const res = await fetchApi('/discord-profile', { body: { id } });

	usersCollection.set(res.data.id, { ...res.data, cached: true });

	return res.data;
};
