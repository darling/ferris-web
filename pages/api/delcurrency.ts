import { NextApiRequest, NextApiResponse } from 'next';
import auth from '../../utils/auth/api-auth';
import { admin } from '../../utils/auth/firebase-admin';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const userAuth = await auth(req, res);
	if (!userAuth)
		return res.status(401).send('Please authenticate properly...');

	try {
		console.log('SAFE DEL', userAuth.uid);
		const s = await admin.database().ref(`/users/${userAuth.uid}`).get();

		const token = s.val()?.token as string | undefined;

		await admin.database().ref(`/users/${userAuth.uid}`).set({ token });

		return res.status(200).send({ deleted: true });
	} catch (error) {
		return res.status(401).send(error);
	}
};
