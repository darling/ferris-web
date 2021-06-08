import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { DISCORD_URL_DATA } from '../../../../lib/axios';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.headers.authorization !== 'Bearer COT') {
		res.status(401).end();
		return;
	}

	if (!req.query.channel_id) {
		res.status(400).end();
		return;
	}

	await axios.post(
		`/channels/${req.query.channel_id}/messages`,
		req.body,
		DISCORD_URL_DATA
	);

	return res.status(200).json({ message: 'sent' });
};
