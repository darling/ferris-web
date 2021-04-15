import Stripe from 'stripe';

let key =
	'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';

if (process.env.NODE_ENV == 'development') {
	key =
		'sk_test_51HNt6qCpSTRHmRnC6g2Brx8HX9N56VV17iYgarIlHFg6zySNSBWDok2FqyNejLFw2voVlO7eNFMOuiRwvhPdOJ1K00JZuIUrLq';
}

const stripeAdmin = new Stripe(key, { apiVersion: '2020-08-27' });

export default stripeAdmin;
