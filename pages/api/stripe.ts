//whsec_5K4bX1hTrT1Dqxz0HiOlDKG2N5an6zPS

import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import stripeAdmin from '../../utils/stripe';

export const config = {
	api: {
		bodyParser: false,
	},
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
	return new Promise((resolve) => {
		if (!req.body) {
			let buffer = '';
			req.on('data', (chunk) => {
				buffer += chunk;
			});

			req.on('end', () => {
				const sig = req.headers['stripe-signature'] as string;
				const event = stripeAdmin.webhooks.constructEvent(
					Buffer.from(buffer).toString(),
					sig,
					'whsec_5K4bX1hTrT1Dqxz0HiOlDKG2N5an6zPS'
				);

				try {
					webhookHandlers[event.type](event.data.object);
				} catch (error) {
					console.error(error);
					res.status(400).send(`Webhook Error: ${error.message}`);
					return resolve();
				}

				res.status(200).json(
					JSON.parse(Buffer.from(buffer).toString())
				);
				resolve();
			});
		}
	});
};

const webhookHandlers: { [key: string]: any } = {
	'charge.succeeded': async (data: Stripe.PaymentIntent) => {
		console.log('charge.succeeded', data.customer);
		return;
	},
	'payment_intent.succeeded': async (data: Stripe.PaymentIntent) => {
		console.log('payment_intent.succeeded', data);
		return;
	},
	'payment_intent.payment_failed': async (data: Stripe.PaymentIntent) => {
		console.log('payment_intent.payment_failed', data); // TODO: THIS
		return;
	},
};
