import axios from 'axios';
import { clamp, compact, take } from 'lodash';

import { GuildConfig, GuildInfo } from '../../../interfaces/control';
import { admin } from '../../../utils/auth/firebase-admin';
import { URL_DATA } from '../../axios';
import { Embed, Interaction, InteractionResponse } from '../../discord_types';
import { slashCommands } from '../command';

export const getEmbed = async (
	body: Partial<Interaction>
): Promise<InteractionResponse> => {
	const embed: Embed = {
		title: 'Select whatever roles you would like from the list!',
		thumbnail: { url: 'https://cdn.ferris.gg/img/commands/add.png' },
	};

	const guild_id = body.guild_id;

	if (!guild_id)
		return { type: 4, data: { content: 'Error, not in a guild.' } };

	const ax_res = await axios.get(`/permissions/${guild_id}`, URL_DATA);

	const permissions: number = ax_res.data.message;

	if (
		!(
			(permissions & 0x0010000000) == 0x0010000000 ||
			(permissions & 0x0000000008) == 0x0000000008
		)
	) {
		return {
			type: 4,
			data: {
				embeds: [
					{
						title: "There's an Error!",
						description:
							'Ferris needs the correct permissions in order to work! Please let the staff know that I need the `MANAGE_ROLES` permission. Thanks!',
						image: {
							url: 'https://cdn.ferris.gg/img/commands/placeholder.png',
						},
					},
				],
				flags: 64,
			},
		};
	}

	const snapshotConfig = await admin
		.firestore()
		.collection('configs')
		.doc(guild_id)
		.get();
	const guildConfig: GuildConfig = snapshotConfig.data() || {};
	const snapshotData = await admin
		.firestore()
		.collection('guilds')
		.doc(guild_id)
		.get();
	const guildData: GuildInfo = (snapshotData.data() as GuildInfo) || {};

	const roles = compact(
		guildConfig.selfrole?.map((id) => {
			const name = guildData.roles?.[id].name;
			if (name)
				return {
					label: name || 'BROKEN CONTACT SAFE',
					value: id,
					emoji: {
						name: 'atsymbol',
						id: '860072198085279784',
					},
				};
		})
	);

	return {
		type: 4,
		data: {
			flags: 64,
			embeds: [embed],
			components: [
				{
					type: 1,
					components: [
						{
							type: 3,
							custom_id: 'ROLE_SELECT',
							// @ts-expect-error
							options: take(roles, 25),
							placeholder: 'Choose a role (or a few)',
							min_values: 1,
							max_values: clamp(roles.length, 1, 25),
						},
					],
				},
				{
					type: 1,
					components: [
						{
							type: 2,
							style: 5,
							url: 'https://ferris.gg/discord',
							label: 'Any issues? Join the Discord!',
						},
					],
				},
			],
			// flags: 64,
		},
	};
};

slashCommands.set('get', getEmbed);
