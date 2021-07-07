import { NextApiRequest, NextApiResponse } from 'next';

import { UserData } from '../../interfaces';
import auth from '../../utils/auth/api-auth';
import { admin } from '../../utils/auth/firebase-admin';
import { changeGuildSubComment } from '../../utils/youtube';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const userAuth = await auth(req, res);
	if (!userAuth)
		return res
			.status(401)
			.send({ message: 'Please authenticate properly...' });

	const { content, gid } = req.body;

	if (!content && !gid)
		return res.status(403).send({ message: 'You should relogin' }); // Test for schema

	const userData = (
		await admin.firestore().collection('users').doc(userAuth.uid).get()
	).data() as UserData | undefined; // Grab data to check if user is premium or not
	const guilds = Object.keys(userData?.guilds || {});

	if (userData && guilds.includes(gid)) {
		// Time to check if the guild has existing subs
		await changeGuildSubComment(gid, content);
		return res.status(200).send({ message: 'ok' });
	} else {
		return res.status(403).send({ message: 'You should relogin' });
	}
};
