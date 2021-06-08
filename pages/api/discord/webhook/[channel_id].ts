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

	const results = await axios.post(
		`/channels/${req.query.channel_id}/messages`,
		req.body,
		DISCORD_URL_DATA
	);

	if (results.status !== 200) {
		return res.status(results.status).json(results.data);
	} else {
		return res.status(200).json({ message: 'sent' });
	}
};
