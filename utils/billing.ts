import admin, { firestore } from "firebase-admin";
import Stripe from "stripe";
import { getCustomer } from "./customer";
import stripeAdmin from "./stripe";

export async function createSubscription(
    uid: string,
    plan: string,
    payment_method: string
) {
    const customer = await getCustomer(uid);

    await stripeAdmin.customers.update(customer.id, {
        invoice_settings: { default_payment_method: payment_method },
    })

    const subscription = await stripeAdmin.subscriptions.create({
        customer: customer.id,
        items: [{plan}],
        expand: ['latest_invoice.payment_intent']
    })

    const invoice = subscription.latest_invoice as Stripe.Invoice;
    const payment_intent = invoice.payment_intent as Stripe.PaymentIntent;

    if (payment_intent.status === 'succeeded') {
        await admin.firestore().collection('users').doc(uid).set({ stripeCustomerId: customer.id, activePlans: firestore.FieldValue.arrayUnion(plan)}, { merge: true })
    }

    return subscription;
}

export async function cancelSubscription(
    uid: string,
    subscriptionId: string
) {
    const customer = await getCustomer(uid);
    if (customer.metadata.firebaseUID !== uid) {
        throw Error('Mismatched UID')
    }
    const subscription = await stripeAdmin.subscriptions.del(subscriptionId)

    if (subscription.status === 'canceled') {
        await admin.firestore().collection('users').doc(uid).update({ activePlans: firestore.FieldValue.arrayRemove(subscription.id), })
    }

    return subscription;
}

export async function listSubscriptions(
    uid: string
) {
    const customer = await getCustomer(uid);
    const subscriptions = await stripeAdmin.subscriptions.list({
        customer: customer.id
    })

    return subscriptions;
}