import { NextApiRequest, NextApiResponse } from 'next';
import auth from '../../../utils/auth/api-auth';
import { cancelSubscription } from '../../../utils/billing';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const userAuth = await auth(req, res);
	if (!userAuth)
		return res
			.status(401)
			.json({ error: 'Please authenticate properly...' });

	if (req.method === 'PATCH') {
		console.log(req.query);

		res.send(
			await cancelSubscription(userAuth.uid, req.query['id'] as string)
		);
		return;
	}

	res.json({ response: 'ok' });
};
