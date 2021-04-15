import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import auth from '../../utils/auth/api-auth';
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 600 });

cache.set(
	'637804742935838751',
	{
		avatar: '08731c864258b776329c00edf6afeed9',
		bot: true,
		discriminator: '4559',
		id: '637804742935838751',
		public_flags: 65536,
		username: 'Ferris',
		cached: true,
	},
	0
);

cache.set(
	'141075183271280641',
	{
		avatar: '7fc8737ec329d9a24730b2a54e75be49',
		discriminator: '0001',
		id: '141075183271280641',
		public_flags: 0,
		username: 'Safe',
		cached: true,
	},
	0
);

const WEB_TOKEN = 'Nzg5OTQwOTQ3OTYyMDM2MjY0.X95X1g.N4ZD90IPXGiqMwNWHWfOrKMpPSA';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const userAuth = await auth(req, res);

	if (userAuth) {
		if (req.body.id) {
			const { id } = req.body;
			let output = {};

			if (!cache.has(id)) {
				console.log('getting new fetch', id);

				const userRes = await axios.get(
					`https://discord.com/api/users/${id}`,
					{
						headers: { Authorization: `Bot ${WEB_TOKEN}` },
					}
				);

				const data = userRes.data;

				cache.set(id, { ...data, cached: true });
				output = { ...data, cached: false };
			} else {
				output = (await cache.get(id)) || {
					error: 'THIS SHOULD NEVER COME UP',
				};
			}

			res.json({ data: output });
		} else {
			res.json({ error: 'Please give proper params' });
		}

		return;
	} else {
		res.json({ auth: false });
		return;
	}
};
