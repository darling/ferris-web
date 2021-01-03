import { NextApiRequest, NextApiResponse } from 'next';
import auth from '../../utils/auth/api-auth';
import { getCustomer } from '../../utils/customer';
import stripeAdmin from '../../utils/stripe';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const userAuth = await auth(req, res);
	if (!userAuth)
		return res.status(401).send('Please authenticate properly...');

	try {
		const customer = await getCustomer(userAuth.uid);

		const session = await stripeAdmin.billingPortal.sessions.create({
			customer: customer.id,
			return_url: 'https://ferris.gg/profile',
		});

		res.json({ url: session.url });
	} catch (error) {
		return res.status(400).json({
			error: {
				message: error.message,
			},
		});
	}
};
