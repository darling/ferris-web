import { AxiosRequestConfig } from 'axios';

export const URL_DATA: AxiosRequestConfig = {
	baseURL:
		process.env.NODE_ENV == 'development'
			? 'http://localhost:8080'
			: 'https://iron.ferris.gg',
};

export const DISCORD_URL_DATA: AxiosRequestConfig = {
	baseURL: 'https://discord.com/api',
	headers: {
		Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
		'Content-Type': 'application/json',
	},
};
