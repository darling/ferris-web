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

	if (
		![
			'811237223432716288',
			'811230822740656160',
			'811481583852453899',
			'811229604102012989',
			'811229489827676210',
			'811083847391117312',
			'749118105942229024',
			'787926485209972798',
			'761480630021783563',
			'761480669078749195',
			'787917171640631298',
			'851673889908981801',
		].includes(req.query.channel_id as string)
	) {
		return res.status(403).json('Access Denied');
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
