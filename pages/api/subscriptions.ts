import { NextApiRequest, NextApiResponse } from 'next';

import auth from '../../utils/auth/api-auth';
import { createSubscription, listSubscriptions } from '../../utils/billing';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const userAuth = await auth(req, res);
	if (!userAuth)
		return res
			.status(401)
			.json({ error: 'Please authenticate properly...' });

	if (req.method === 'POST') {
		const { plan, payment_method } = req.body;
		const subscription = await createSubscription(
			userAuth.uid,
			plan,
			payment_method
		);

		console.log(subscription);

		res.json(subscription);
		return;
	} else {
		const subscriptions = await listSubscriptions(userAuth.uid);

		res.json(subscriptions);
		return;
	}
};
