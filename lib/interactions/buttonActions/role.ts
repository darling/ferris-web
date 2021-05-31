import axios from 'axios';

import { GuildConfig } from '../../../interfaces/control';
import { admin } from '../../../utils/auth/firebase-admin';
import { URL_DATA } from '../../axios';
import { Interaction, InteractionResponse } from '../../discord_types';
import { buttonActions } from '../button';

const buttonRole = async (body: Interaction): Promise<InteractionResponse> => {
	const snapshot = await admin
		.firestore()
		.collection('configs')
		.doc(`${body.guild_id}`)
		.get();

	const config: GuildConfig = snapshot.data() || {};

	const id = body.data?.custom_id?.replace('ROLE ', '').trim();

	if (id && config.selfrole?.includes(id) && body.member?.user)
		axios.post(
			`/role`,
			{
				role_id: id,
				guild_id: body.guild_id,
				user_id: body.member.user.id,
			},
			URL_DATA
		);

	return { type: 6 };
};

buttonActions.set('ROLE', buttonRole);
