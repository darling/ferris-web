import admin from 'firebase-admin';
import { NextApiRequest, NextApiResponse } from 'next';
import nacl from 'tweetnacl';

const PUBLIC_KEY =
	'3e9acfbb546dbef42a019147c63c1c26983589790dc9b81e0fcdaa17cd17333d';

export const config = {
	api: {
		bodyParser: false,
	},
};

const parseRawbody = (req: any) => {
	return new Promise<string>((resolve) => {
		if (!req.body) {
			let buffer = '';
			req.on('data', (chunk: any) => {
				buffer += chunk;
			});

			req.on('end', () => {
				resolve(Buffer.from(buffer).toString());
			});
		}
	});
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const sig = req.headers['x-signature-ed25519'];
	const timestamp = req.headers['x-signature-timestamp'];
	const rawBody = await parseRawbody(req);
	const body = JSON.parse(rawBody);

	const isVerified = nacl.sign.detached.verify(
		Buffer.from(timestamp + rawBody),
		Buffer.from(sig as string, 'hex'),
		Buffer.from(PUBLIC_KEY, 'hex')
	);

	if (!isVerified) {
		return res.status(401).end('invalid request signature');
	}

	if (body['type'] === 1) {
		res.status(200).json({ type: 1 });
		return;
	}

	if (body['type'] === 2) {
		switch (body['data']['name']) {
			case 'help':
				return res.status(200).json({
					type: 4,
					data: {
						embeds: [
							{
								title: 'Help',
								description:
									"If you'd like information on the bot, please check out our websites.",
								url: 'https://ferris.gg',
								color: 16777215,
								footer: {
									text: 'footer text',
								},
								thumbnail: {
									url: 'https://i.imgur.com/owBJxsP.png',
								},
								author: {
									name:
										body.member.user.username +
										'#' +
										body.member.user.discriminator,
								},
								fields: [
									{
										name: 'Commands',
										value:
											'https://ferris.gg/docs/commands',
									},
									{
										name: 'Website',
										value: 'https://ferris.gg/',
									},
								],
							},
						],
					},
				});
				break;
			case 'log':
				return res.status(200).json({
					type: 4,
					data: {
						content: "This feature isn't done yet",
						// embeds: [
						// 	{
						// 		title: 'Whois',
						// 		color: 16777215,
						// 		footer: {
						// 			text: 'footer text',
						// 		},
						// 		thumbnail: {
						// 			url: 'https://i.imgur.com/owBJxsP.png',
						// 		},
						// 		author: {
						// 			name:
						// 				body.member.user.username +
						// 				'#' +
						// 				body.member.user.discriminator,
						// 		},
						// 		fields: [
						// 			{
						// 				name: 'Commands',
						// 				value:
						// 					'https://ferris.gg/docs/commands',
						// 			},
						// 			{
						// 				name: 'Website',
						// 				value: 'https://ferris.gg/',
						// 			},
						// 		],
						// 	},
						// ],
					},
				});
				break;
			default:
				console.log(body);

				const doc = await admin
					.firestore()
					.collection('commands')
					.doc(body.guild_id)
					.get();

				const docData = doc.data() || {};

				let chosenCommand = docData[body['data']['name']] || undefined;

				if (chosenCommand['description']) {
					chosenCommand['description'] = chosenCommand[
						'description'
					].replace(/\\n/g, '\n');
				}

				if (chosenCommand) {
					return res.status(200).json({
						type: 4,
						data: {
							embeds: [chosenCommand],
						},
					});
				} else {
					return res.status(200).end();
				}
				break;
		}
	}

	return res.status(401).send('Please authenticate... :(');
};
