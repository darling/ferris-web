import { NextApiRequest, NextApiResponse } from 'next';
import auth from '../../utils/auth/api-auth';
import { admin } from '../../utils/auth/firebase-admin';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const userAuth = await auth(req, res);
	if (!userAuth)
		return res
			.status(401)
			.send({ message: 'Please authenticate properly...' });

	try {
		console.log('SAFE DEL', userAuth.uid);
		const d = await admin
			.firestore()
			.collection('users')
			.doc(userAuth.uid)
			.update({
				guilds: admin.firestore.FieldValue.delete(),
			});

		console.log(d.writeTime);

		return res.status(200).send({ deleted: true });
	} catch (error) {
		return res.status(401).send(error);
	}
};
