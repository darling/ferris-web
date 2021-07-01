import axios from 'axios';
import { difference } from 'lodash';

import { GuildConfig } from '../../../interfaces/control';
import { admin } from '../../../utils/auth/firebase-admin';
import { URL_DATA } from '../../axios';
import { Embed, Interaction, InteractionResponse } from '../../discord_types';
import { componentActions } from '../button';

const embed: Embed = {
	title: 'Success!',
	description:
		'You should recieve a dm with the record of what roles were toggled for you.',
	color: 8843180,
	thumbnail: { url: 'https://cdn.ferris.gg/img/commands/add.png' },
};

const buttonRole = async (body: Interaction): Promise<InteractionResponse> => {
	const snapshot = await admin
		.firestore()
		.collection('configs')
		.doc(`${body.guild_id}`)
		.get();

	const config: GuildConfig = snapshot.data() || {};

	const id = body.data?.custom_id?.replace('ROLE ', '').trim();

	if (id && config.selfrole?.includes(id) && body.member?.user)
		await axios.post(
			`/role`,
			{
				role_id: [id],
				guild_id: body.guild_id,
				user_id: body.member.user.id,
			},
			URL_DATA
		);

	return { type: 6 };
};

componentActions.set('ROLE', buttonRole);

const selectRole = async (body: Interaction): Promise<InteractionResponse> => {
	const snapshot = await admin
		.firestore()
		.collection('configs')
		.doc(`${body.guild_id}`)
		.get();

	const config: GuildConfig = snapshot.data() || {};

	const data = body.data;

	if (!data)
		return { type: 4, data: { content: 'Error, please contact safe' } };

	if (
		difference(data.values, config.selfrole || []).length === 0 &&
		body.member?.user
	) {
		try {
			await axios.post(
				`/role`,
				{
					role_id: data.values || [],
					guild_id: body.guild_id,
					user_id: body.member.user.id,
				},
				URL_DATA
			);
		} catch (error) {
			console.error(error.response.data);
		}
		return {
			type: 7,
			data: { flags: 64, embeds: [embed], components: [] },
		};
	} else {
		return {
			type: 4,
			data: {
				flags: 64,
				content: "Some of these roles aren't obtainable anymore.",
			},
		};
	}

	// const id = body.data?.custom_id?.replace('ROLE ', '').trim();

	// if (id && config.selfrole?.includes(id) && body.member?.user)
	// 	axios.post(
	// 		`/role`,
	// 		{
	// 			role_id: id,
	// 			guild_id: body.guild_id,
	// 			user_id: body.member.user.id,
	// 		},
	// 		URL_DATA
	// 	);

	return { type: 6 };
};

componentActions.set('ROLE_SELECT', selectRole);
