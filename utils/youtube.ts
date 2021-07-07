import axios, { AxiosRequestConfig } from 'axios';
import { truncate } from 'lodash';

import { IYTDoc } from '../interfaces/ytchannels';
import { admin } from './auth/firebase-admin';

const FEEDR_TOKEN = process.env.FEEDR_TOKEN || '';

const CALLBACK_URL =
	process.env.NODE_ENV == 'production'
		? 'https://ferris.gg'
		: `https://7f42b603bf5a.ngrok.io`;

export const getGuildSubs = async (guild: string) => {
	const snapshot = await admin
		.firestore()
		.collection('ytchannels')
		.doc(guild)
		.get();
	const doc = snapshot.data() as IYTDoc | undefined;

	return doc;
};

const config: AxiosRequestConfig = {
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
	},
	auth: {
		username: 'ferrissafetyfirst',
		password: FEEDR_TOKEN,
	},
};

export const setGuildSubs = async (
	guild: string,
	cid: string,
	premium: boolean
) => {
	const ref = admin.firestore().collection('ytchannels').doc(guild);

	const data = (await ref.get()).data() as IYTDoc | undefined;

	if ((data?.cid?.length || 0) < 3 || premium) {
		const params = new URLSearchParams();

		params.append('hub.mode', 'subscribe');
		params.append(
			'hub.topic',
			`https://www.youtube.com/feeds/videos.xml?channel_id=${cid}`
		);
		params.append('hub.callback', CALLBACK_URL + '/api/youtube');
		params.append('hub.verify', 'sync');
		params.append('format', 'json');

		const respo = await axios.post(
			'https://push.superfeedr.com/',
			params,
			config
		);

		if (respo.status === 204) {
			try {
				await ref.set(
					{
						cid: admin.firestore.FieldValue.arrayUnion(cid),
					},
					{ mergeFields: ['cid'] }
				);
			} catch (error) {
				console.error(error);
			}
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
};

export const delGuildSub = async (guild: string, cid: string) => {
	const ref = admin.firestore().collection('ytchannels').doc(guild);

	const params = new URLSearchParams();

	params.append('hub.mode', 'unsubscribe');
	params.append(
		'hub.topic',
		`https://www.youtube.com/feeds/videos.xml?channel_id=${cid}`
	);
	params.append('hub.callback', CALLBACK_URL + '/api/youtube');
	params.append('hub.verify', 'sync');

	const respo = await axios.post(
		'https://push.superfeedr.com/',
		params,
		config
	);

	if (respo.status === 204)
		try {
			await ref.update({
				cid: admin.firestore.FieldValue.arrayRemove(cid),
			});
		} catch (error) {
			console.error(error);
		}
};

export const changeGuildSubComment = async (guild: string, comment: string) => {
	const ref = admin.firestore().collection('ytchannels').doc(guild);

	await ref.update({
		content: truncate(comment, { length: 400, omission: '' }),
	});
};

export const changeGuildSubChannel = async (guild: string, channel: string) => {
	const ref = admin.firestore().collection('ytchannels').doc(guild);

	await ref.set(
		{
			channel,
		},
		{ mergeFields: ['channel'] }
	);
};
