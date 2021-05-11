import { DiscordUser } from '../interfaces';
import { fetchApi } from './auth/fetch';

// const usersCollection = new Map<
// 	string,
// 	(DiscordUser & { loading: false }) | { loading: true }
// >();

export const getUserInfo = async (id: string): Promise<DiscordUser> => {
	const isLocal = !!localStorage.getItem(id);

	if (isLocal) {
		return JSON.parse(localStorage.getItem(id) || '') as DiscordUser;
	}

	console.log('REQUEST', id);

	const res = await fetchApi('/discord-profile', { body: { id } });

	localStorage.setItem(
		res.data.id,
		JSON.stringify({ ...res.data, cached: true })
	);

	return res.data;
};

export const discordProfilePic = (id: string, avatar: string): string => {
	return `https://cdn.discordapp.com/avatars/${id}/${avatar}.${
		avatar.startsWith('a_') ? 'gif' : 'png'
	}`;
};
