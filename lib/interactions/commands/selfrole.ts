import axios from 'axios';
import { firestore } from 'firebase-admin';
import { compact, intersection } from 'lodash';

import { admin } from '../../../utils/auth/firebase-admin';
import { DISCORD_URL_DATA, SELF_URL_DATA } from '../../axios';
import { Interaction, InteractionResponse, Role } from '../../discord_types';
import { slashCommands } from '../command';

export const selfroleHandler = async (
	body: Interaction
): Promise<InteractionResponse> => {
	// Selfrole has a set of sub commands that come in handy if you want to do different things. Unfortunately it just means more work for us.

	let response: InteractionResponse = {
		type: 4,
		data: {
			embeds: [
				{
					title: 'Error',
					description:
						"Sorry it seems like you need to join the Discord. You getting this message shouldn't be possible",
				},
			],
			flags: 64,
		},
	};

	if (!body.guild_id) {
		return {
			type: 4,
			data: {
				embeds: [
					{
						title: 'Error',
						description: 'Are you giving this command in DMs?',
					},
				],
				flags: 64,
			},
		};
	}

	if (
		(268435488 & Number(body.member?.permissions)) !== 268435488 && // Has both manage guilds and roles
		body.data?.options?.[0].name !== 'list'
	) {
		return {
			type: 4,
			data: {
				embeds: [
					{
						title: 'Error',
						description: 'Missing permissions?',
					},
				],
				flags: 64,
			},
		};
	}

	const doc = await admin
		.firestore()
		.collection('configs')
		.doc(body.guild_id);
	let roles;
	let newIds;

	switch (body.data?.options?.[0].name) {
		case 'add':
			roles = body.data.options.pop()?.options;

			newIds = compact(
				roles?.map((role) => {
					return role.value;
				})
			);

			await doc.set(
				{
					selfrole: firestore.FieldValue.arrayUnion(...newIds),
				},
				{ merge: true }
			);

			response = {
				type: 4,
				data: {
					embeds: [
						{
							title: 'Role Added',
							color: 16777214,
						},
					],
				},
			};

			break;
		case 'remove':
			roles = body.data.options.pop()?.options;

			newIds = compact(
				roles?.map((role) => {
					return role.value;
				})
			);

			await doc.set(
				{
					selfrole: firestore.FieldValue.arrayRemove(...newIds),
				},
				{ merge: true }
			);

			response = {
				type: 4,
				data: {
					embeds: [
						{
							title: 'Role Removed',
							color: 16777214,
						},
					],
				},
			};

			break;
		case 'list':
			const guildRoleList = (
				await axios.get(
					`/guilds/${body.guild_id}/roles`,
					DISCORD_URL_DATA
				)
			).data as Role[];

			console.log(guildRoleList);

			const selfroles: string[] | undefined = (await doc.get()).data()
				?.selfrole;

			if (selfroles) {
				const roleList = compact(
					selfroles.map((id) =>
						guildRoleList.find((role) => role.id === id)
					)
				)
					?.map((role) => `\`${role?.name}\` (<@&${role?.id}>)`)
					.join('\n');

				response = {
					type: 4,
					data: {
						embeds: [
							{
								title: 'Self Role List',
								description: `${roleList}`,
								color: 16777214,
							},
						],
					},
				};
			}
			break;
		case 'display':
			const guildRolesList = (
				await axios.get(
					`/guilds/${body.guild_id}/roles`,
					DISCORD_URL_DATA
				)
			).data as Role[];

			const snapshot = await doc.get();
			const data = snapshot.data();

			if (data?.selfrole) {
				const selfrole: string[] = data?.selfrole;

				const requestedRoles = compact(
					body.data.options.pop()?.options?.map((option) => {
						if (option.type === 8) return option.value as string;
					})
				);

				const rolesToWorkWith = intersection(requestedRoles, selfrole);

				const fullRoles = compact(
					rolesToWorkWith.map((id) =>
						guildRolesList.find((role) => role.id === id)
					)
				);

				await axios.post(
					'/api/discord/display',
					{
						guild_id: body.guild_id,
						channel: body.channel_id,
						role_list: fullRoles.map((role) => {
							return { role_name: role.name, role_id: role.id };
						}),
					},
					SELF_URL_DATA
				);

				response = {
					type: 4,
					data: {
						content: 'The popup has been displayed.',
						flags: 64,
					},
				};
			}

			break;
		default:
			break;
	}

	return response;
};

slashCommands.set('selfrole', selfroleHandler);
