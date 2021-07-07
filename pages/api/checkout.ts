import { NextApiRequest, NextApiResponse } from 'next';
import auth from '../../utils/auth/api-auth';
import { getCustomer } from '../../utils/customer';
import stripeAdmin from '../../utils/stripe';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const userAuth = await auth(req, res);
	if (!userAuth)
		return res
			.status(401)
			.send({ message: 'Please authenticate properly...' });

	try {
		const customer = await getCustomer(userAuth.uid);

		const session = await stripeAdmin.checkout.sessions.create({
			mode: 'subscription',
			payment_method_types: ['card'],
			customer: customer.id,
			line_items: [
				{
					quantity: 1,
					price: req.body.priceId || 'price_1I5S02CpSTRHmRnCfVhI0fm9',
				},
			],
			cancel_url: 'https://ferris.gg/profile',
			success_url:
				'https://ferris.gg/profile?session_id={CHECKOUT_SESSION_ID}',
		});

		res.json({
			sessionId: session.id,
		});
	} catch (error) {
		return res.status(400).json({
			error: {
				message: error.message,
			},
		});
	}
};
