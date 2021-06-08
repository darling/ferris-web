import axios from 'axios';
import { take } from 'lodash';
import { NextApiRequest, NextApiResponse } from 'next';

import { DISCORD_URL_DATA } from '../../../lib/axios';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (
		req.body.guild_id &&
		req.body.channel &&
		req.body.role_list &&
		process.env.DISCORD_TOKEN
	) {
		const role_list: { role_name: string; role_id: string }[] = take(
			req.body.role_list,
			5
		);

		if (role_list.length < 1) return res.status(200).send('okay!');

		const descFormatlist = role_list
			.map((data) => {
				return `\`${data.role_name}\` (<@&${data.role_id}>)`;
			})
			.join('\n');

		const components = role_list.map((data) => {
			return {
				type: 2,
				style: 1,
				label: `Get ${data.role_name}`,
				custom_id: `ROLE ${data.role_id}`,
			};
		});

		await axios.post(
			`/channels/${req.body.channel}/messages`,
			{
				embed: {
					title: `Press a button to get a role!`,
					description: `${descFormatlist}${
						role_list.length == 1 ? ' is' : '\n\n ...are'
					} available.\n\nJust click the button below to get the role (or remove the role).`,
				},
				components: [
					{
						type: 1,
						components: components,
					},
				],
			},
			DISCORD_URL_DATA
		);
		return res.status(200).send('okay!');
	}
	return res.status(400).send('no');
};
