import { NextApiRequest, NextApiResponse } from 'next';
import { admin } from './firebase-admin';

const auth = async (req: NextApiRequest, _res: NextApiResponse) => {
	if (req.headers.authorization?.startsWith('Bearer ')) {
		const authToken = req.headers.authorization;
		const token = authToken.replace('Bearer ', '');

		if (token == 'null') {
			return;
		}

		try {
			const decodedToken = await admin.auth().verifyIdToken(token);
			return decodedToken;
		} catch (e) {
			// res.status(401).send({ error: 'Please authenticate :)'})
		}
	}

	return;
};

export default auth;
