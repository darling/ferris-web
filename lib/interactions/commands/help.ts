import { admin } from '../../../utils/auth/firebase-admin';
import { slashCommands } from '../command';

const buttons = [
	{ label: 'Homepage', url: 'https://ferris.gg/' },
	{ label: 'Docs & Commands', url: 'https://ferris.gg/docs' },
	{ label: 'Add Ferris', url: 'https://ferris.gg/add' },
	{ label: 'Join our Discord!', url: 'https://ferris.gg/discord' },
];

export const helpEmbed = async (body: any) => {
	let desc: string;

	if (body.guild_id) {
		const guildData = await admin
			.firestore()
			.collection('configs')
			.doc(body.guild_id)
			.get();

		desc = `Ferris is a high-caliber moderation bot used to improve Discord servers and help communities stay safe.\n\nThis server's prefix is: \`${
			guildData.data()?.['prefix'] || ';'
		}\`\n\nPlease make sure to check out our links in order to learn more about Ferris!`;
	} else {
		desc = `Thanks for your interest in our bot, ${body.user.username}!\n\nFerris is a high-caliber moderation bot used to improve Discord servers and help communities stay safe.\n\nPlease make sure to check out our links in order to learn more about Ferris!\n`;
		buttons.forEach((button) => {
			desc += `\n[${button.label}](${button.url})`;
		});
	}

	const embed = {
		title: 'Need help using Ferris?',
		description: desc,
		color: 53380,
		thumbnail: { url: 'https://cdn.ferris.gg/img/commands/help.png' },
	};

	console.log('reached');

	return {
		type: 4,
		data: {
			embeds: [embed],
			components: [
				{
					type: 1,
					components: [
						{
							type: 2,
							style: 5,
							url: 'https://ferris.gg/',
							label: 'Homepage',
						},
						{
							type: 2,
							style: 5,
							url: 'https://ferris.gg/docs',
							label: 'Docs & Commands',
						},
						{
							type: 2,
							style: 5,
							url: 'https://ferris.gg/add',
							label: 'Add Ferris',
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
							label: 'Join our Discord!',
						},
					],
				},
			],
			flags: 64,
		},
	};
};

slashCommands.set('help', helpEmbed);
