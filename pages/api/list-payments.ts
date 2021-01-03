import { NextApiRequest, NextApiResponse } from 'next';
import auth from '../../utils/auth/api-auth';
import { listPaymentMethods } from '../../utils/customer';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const userAuth = await auth(req, res);
	if (!userAuth)
		return res.status(401).json({ error: 'Authenticate properly' });

	const wallet = await listPaymentMethods(userAuth.uid);

	res.json(wallet.data);
};
