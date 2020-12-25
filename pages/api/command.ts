import { NextApiRequest, NextApiResponse } from 'next';
import auth from '../../utils/auth/api-auth';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const userAuth = await auth(req, res);
	if (!userAuth)
		return res.status(401).send('Please authenticate properly...');

	if (req) {
		console.log(req.body);

		return res.status(200).json({ test: 'skrrt' });
	} else {
		return res.status(401).end();
	}
};
