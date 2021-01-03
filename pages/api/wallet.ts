import { NextApiRequest, NextApiResponse } from 'next';

import auth from '../../utils/auth/api-auth';
import { removeCard } from '../../utils/billing';
import { createSetupIntent } from '../../utils/customer';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const userAuth = await auth(req, res);
	if (!userAuth)
		return res
			.status(401)
			.json({ error: 'Please authenticate properly...' });

	if (req.method === 'DELETE') {
		const remove = await removeCard(req.body.id);
		return res.status(200).json(remove); // TODO: Find a way to stop users from removing a card if only sub is inactive
	} else {
		const setupIntent = await createSetupIntent(userAuth.uid);

		return res.json(setupIntent);
	}

	// return res.status(400).json({ message: 'Please specify an action' });
};
