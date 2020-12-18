import Stripe from "stripe";
const stripeAdmin = new Stripe('sk_test_51HNt6qCpSTRHmRnC6g2Brx8HX9N56VV17iYgarIlHFg6zySNSBWDok2FqyNejLFw2voVlO7eNFMOuiRwvhPdOJ1K00JZuIUrLq', { apiVersion: '2020-08-27' })

export default stripeAdmin;