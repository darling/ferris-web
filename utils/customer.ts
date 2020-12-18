import Stripe from "stripe";
import { admin } from "./auth/firebase-admin";
import stripeAdmin from "./stripe";

export async function createSetupIntent(uid: string) {
    const customer = await getCustomer(uid);

    return stripeAdmin.setupIntents.create({
        customer: customer.id
    })
}

export async function listPaymentMethods(uid: string) {
    const customer = await getCustomer(uid);

    return stripeAdmin.paymentMethods.list({
        customer: customer.id,
        type: 'card'
    })
}

export async function getCustomer(uid: string, params?: Stripe.CustomerCreateParams) {
    const snapshot = await admin.firestore().collection('users').doc(uid).get();

    const { stripeCustomerId, email }: any = snapshot.data()

    if (!stripeCustomerId) {
        const customer = await stripeAdmin.customers.create({
            email,
            metadata: {
                firebaseUID: uid
            },
            ...params
        })
        await snapshot.ref.update({ stripeCustomerId: customer.id })
        return customer;
    } else {
        return await stripeAdmin.customers.retrieve(stripeCustomerId) as Stripe.Customer;
    }
}