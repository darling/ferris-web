import Stripe from 'stripe';
const stripeAdmin = new Stripe(
	'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',
	{ apiVersion: '2020-08-27' }
);

export default stripeAdmin;
