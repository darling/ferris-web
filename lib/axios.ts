import { AxiosRequestConfig } from 'axios';

export const URL_DATA: AxiosRequestConfig = {
	baseURL:
		process.env.NODE_ENV == 'development'
			? 'http://localhost:8080'
			: 'https://iron.ferris.gg',
};
