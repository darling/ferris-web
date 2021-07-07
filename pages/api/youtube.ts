import axios from 'axios';
import { flatMap, split, truncate } from 'lodash';
import { NextApiRequest, NextApiResponse } from 'next';

import { DISCORD_URL_DATA } from '../../lib/axios';
import { admin } from '../../utils/auth/firebase-admin';

interface IFeedrBody {
	status: {
		title?: string;
		code: number;
		feed: string;
	};
	id: string;
	items?: IYTFeedBody[];
}

interface IYTFeedBody {
	id: string;
	published: number;
	title: string;
	updated: number;
	permalinkUrl: string;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
	console.log(req.body);

	const challenge = req.query['hub.challenge'];

	if (challenge) return res.status(200).send(challenge);
	const body: IFeedrBody = req.body;

	if ((body.items?.length || 0) < 1) return res.status(200).end();
	if (body.status.code !== 200) {
		console.log(body.status);
		return res.status(200).end();
	}

	try {
		const urls = body.items
			?.map((item) => item.permalinkUrl || 'UNDEFINED -- CONTACT @SAFE')
			.join('\n');
		const cid = ((body.status.feed as string) || '').replace(
			'https://www.youtube.com/feeds/videos.xml?channel_id=',
			''
		);

		const ref = admin
			.firestore()
			.collection('ytchannels')
			.where('cid', 'array-contains', cid);

		const snapshot = await ref.get();

		snapshot.docs.forEach((doc) => {
			const data = doc.data();

			if (data) {
				const meta: { [key: string]: string } = {
					channel_name: `**${truncate(
						body?.status?.title || 'Youtube Channel',
						{ length: 100 }
					)}**`, // bold username
					links: urls || 'No links given',
				};

				const defaultTitle = !!meta['channel_name']
					? `**${meta['channel_name']}** has posted on Youtube:\n\n${urls}`
					: `Youtube video updates:\n\n${urls}`;

				let content: string | undefined = data?.content;

				if (!content) {
					content = defaultTitle;
				} else {
					const regExDelim = ['{', '}'].join('|');
					const splitContent = split(
						content,
						new RegExp(regExDelim, 'g')
					);
					const spitOutput = flatMap(splitContent, (term) => {
						return meta[term] || term;
					}).join('');
					content = spitOutput;
				}

				if (data.channel) {
					try {
						axios.post(
							`/channels/${data.channel}/messages`,
							{ content: truncate(content, { length: 1800 }) },
							DISCORD_URL_DATA
						);
					} catch (error) {
						console.error(error);
					}
				}
			}
		});

		return res.status(200).end();
	} catch (error) {
		return res.status(403).end();
	}

	return res.status(203).end();
};
