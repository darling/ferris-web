import Stripe from 'stripe';
import { getCustomer } from './customer';
import stripeAdmin from './stripe';

export async function createSubscription(
	uid: string,
	plan: string,
	payment_method: string
) {
	const customer = await getCustomer(uid);

	await stripeAdmin.paymentMethods.attach(payment_method, {
		customer: customer.id,
	});

	await stripeAdmin.customers.update(customer.id, {
		invoice_settings: { default_payment_method: payment_method },
	});

	const subscription = await stripeAdmin.subscriptions.create({
		customer: customer.id,
		items: [{ price: plan }],
		expand: ['latest_invoice.payment_intent'],
	});

	return subscription;
}

export async function cancelSubscription(uid: string, subscriptionId: string) {
	const customer = await getCustomer(uid);

	if (customer.metadata.firebaseUID !== uid) {
		throw Error('Mismatched UID');
	}

	const subscription = await stripeAdmin.subscriptions.del(
		subscriptionId
		// { cancel_at_period_end: true }
	);

	return subscription;
}

export async function listSubscriptions(uid: string) {
	const customer = await getCustomer(uid);
	const subscriptions = await stripeAdmin.subscriptions.list({
		customer: customer.id,
	});

	return subscriptions;
}

export async function removeCard(card_id: string) {
	const paymentMethod = await stripeAdmin.paymentMethods.retrieve(card_id, {
		expand: ['customer'],
	});

	const customer = paymentMethod.customer as Stripe.Customer;

	const paymentMethods = await stripeAdmin.paymentMethods.list({
		customer: customer.id,
		type: 'card',
	});

	const hasMoreThanOneCard = paymentMethods.data.length > 1;

	if (hasMoreThanOneCard) {
		const result = await stripeAdmin.paymentMethods.detach(card_id);
		return result;
	} else {
		const subscriptions = await stripeAdmin.subscriptions.list({
			customer: customer.id,
			status: 'active',
		});

		const isSubscribed = subscriptions.data.length !== 0;

		if (isSubscribed) {
			const result = { message: 'There is an active subscription' };
			return result;
		} else {
			const result = await stripeAdmin.paymentMethods.detach(card_id);
			return result;
		}
	}
}
