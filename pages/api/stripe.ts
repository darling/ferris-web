import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { DISCORD_URL_DATA } from '../../lib/axios';
import { Channel, CreateMessageParams } from '../../lib/discord_types';
import { admin } from '../../utils/auth/firebase-admin';

import stripeAdmin from '../../utils/stripe';

export const config = {
	api: {
		bodyParser: false,
	},
};

const stripeApiKey = 'whsec_rvCG5UOKBg5fJLsXZw2mWIJMpqQrk5Lt';

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
	const rawBody = await parseRawbody(req);

	const sig = req.headers['stripe-signature'] as string;
	const event = stripeAdmin.webhooks.constructEvent(
		Buffer.from(rawBody),
		sig,
		stripeApiKey
	);

	try {
		if (webhookHandlers[event.type]) {
			await webhookHandlers[event.type](event.data.object);
		}
	} catch (e) {
		console.error(e);
		res.status(400).send('Error: ' + e.message);
	}

	res.send({ received: true });
};

const webhookHandlers: { [key: string]: any } = {
	'charge.succeeded': async (data: Stripe.PaymentIntent) => {
		console.log('charge.succeeded', data);
		return;
	},
	'payment_intent.succeeded': async (data: Stripe.PaymentIntent) => {
		console.log('payment_intent.succeeded', data);
		return;
	},
	'payment_intent.payment_failed': async (data: Stripe.PaymentIntent) => {
		console.log('payment_intent.payment_failed', data);
		return;
	},
	'customer.subscription.deleted': async (data: Stripe.Subscription) => {
		console.log('customer.subscription.deleted', data);
		const customer = (await stripeAdmin.customers.retrieve(
			data.customer as string
		)) as Stripe.Customer;
		const uid = customer.metadata.firebaseUID;
		const ref = admin.firestore().collection('users').doc(uid);

		await ref.update({ premium: false });

		const message: Partial<CreateMessageParams> = {
			embed: {
				title: 'Deleted Subscription',
				description: `${uid} (<@${uid}>) has deleted their subscription.`,
			},
		};

		await axios.post(
			'/channels/761480013835927572/messages',
			message,
			DISCORD_URL_DATA
		);

		return;
	},
	'invoice.payment_succeeded': async (data: Stripe.Invoice) => {
		console.log('invoice.payment_succeeded', data);
		const customer = (await stripeAdmin.customers.retrieve(
			data.customer as string
		)) as Stripe.Customer;
		const uid = customer.metadata.firebaseUID;
		const ref = admin.firestore().collection('users').doc(uid);

		await ref.update({ premium: true });

		const message: Partial<CreateMessageParams> = {
			embed: {
				title: 'New Purchase',
				description: `${uid} (<@${uid}>) has a payment succeeded.`,
			},
		};

		await axios.post(
			'/channels/761480013835927572/messages',
			message,
			DISCORD_URL_DATA
		);

		const dm_message = {
			embed: {
				title: 'Charge Succeeded',
				description: `Hi <@${uid}>,\n\nThanks for supporting <:Ferris:843674766976221194> **Ferris**!\n\nFeel free to join our [support server](https://ferris.gg/discord) for exclusive updates and a complete premium experience.\n\n${
					data.lines.data.pop()?.description
				}\n\nIf you have any questions or concerns, feel free to reach out to any of us on the team and we will help you out.\n\n~ Safe`,
				thumbnail: { url: 'https://cdn.ferris.gg/img/ferris-hero.png' },
				color: 3591282,
			},
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
							url: 'https://ferris.gg/discord',
							label: 'Our Discord',
						},
						{
							type: 2,
							style: 5,
							url: 'https://ferris.gg/profile',
							label: 'Manage Sub',
						},
					],
				},
			],
		};

		const dm_channel = await axios.post<Channel>(
			'/users/@me/channels',
			{
				recipient_id: uid,
			},
			DISCORD_URL_DATA
		);

		await axios.post(
			`/channels/${dm_channel.data.id}/messages`,
			dm_message,
			DISCORD_URL_DATA
		);

		return;
	},
	'invoice.payment_failed': async (data: Stripe.Invoice) => {
		console.log('invoice.payment_failed', data);
		return;
	},
};
