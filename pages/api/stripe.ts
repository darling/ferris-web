import admin from 'firebase-admin';
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

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
		res.send({ received: true });
	} catch (e) {
		console.error(e);
		res.status(400).send('Error: ' + e.message);
	}
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

		return;
	},
	'invoice.payment_failed': async (data: Stripe.Invoice) => {
		console.log('invoice.payment_failed', data);
		return;
	},
};
