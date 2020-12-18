import { NextApiRequest, NextApiResponse } from 'next';
import auth from '../../utils/auth/api-auth';
import { createSubscription, listSubscriptions } from '../../utils/billing';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const userAuth = await auth(req, res);
	if (!userAuth)
		return res.status(401).send('Please authenticate properly...');

	if (req.method === 'POST') {
		const { plan, payment_method } = req.body;
		const subscription = await createSubscription(
			userAuth.uid,
			plan,
			payment_method
		);

		res.send(subscription);
		return;
	} else {
		const subscriptions = await listSubscriptions(userAuth.uid);

		res.send(subscriptions);
		return;
	}
};
