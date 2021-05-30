import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import { DISCORD_URL_DATA } from '../../../lib/axios';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (
		req.body.guild_id &&
		req.body.channel &&
		req.body.role_id &&
		req.body.role_name &&
		process.env.DISCORD_TOKEN
	) {
		await axios.post(
			`/channels/${req.body.channel}/messages`,
			{
				embed: {
					title: `Press the button to get the role!`,
					description: `The \`${req.body.role_name}\` role (<@&${req.body.role_id}>) is availiable.\n\nJust click the button below to get it (or remove it).`,
				},
				components: [
					{
						type: 1,
						components: [
							{
								type: 2,
								style: 1,
								label: `Get ${req.body.role_name}`,
								custom_id: `ROLE ${req.body.role_id}`,
							},
						],
					},
				],
			},
			DISCORD_URL_DATA
		);
		return res.status(200).send('okay!');
	}
	return res.status(400).send('no');
};
