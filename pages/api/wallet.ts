import { NextApiRequest, NextApiResponse } from 'next';
import auth from '../../utils/auth/api-auth';
import { createSetupIntent } from '../../utils/customer';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const userAuth = await auth(req, res);
	if (!userAuth)
		return res.status(401).send('Please authenticate properly...');

	const setupIntent = await createSetupIntent(userAuth.uid);

	res.send(setupIntent);
};
