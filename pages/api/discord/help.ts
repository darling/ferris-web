import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { helpEmbed } from '../../../lib/interactions/commands/help';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.body.guild_id && req.body.channel && process.env.DISCORD_TOKEN) {
		const { data } = await helpEmbed({ guild_id: req.body.guild_id });
		const components = data.components;
		const embed = data.embeds.pop();
		await axios.post(
			`https://discord.com/api/channels/${req.body.channel}/messages`,
			{ embed, components },
			{
				headers: {
					Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
					'Content-Type': 'application/json',
				},
			}
		);
		return res.status(200).send('okay!');
	}
	return res.status(400).send('no');
};
