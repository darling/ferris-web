import { NextApiRequest, NextApiResponse } from 'next';

import { UserData } from '../../interfaces';
import auth from '../../utils/auth/api-auth';
import { admin } from '../../utils/auth/firebase-admin';
import { setGuildSubs } from '../../utils/youtube';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const userAuth = await auth(req, res);
	if (!userAuth)
		return res
			.status(401)
			.send({ message: 'Please authenticate properly...' });

	console.log('hi');

	const { cid, gid } = req.body;

	if (!cid && !gid)
		return res.status(403).send({ message: 'You should relogin' }); // Test for schema

	const userData = (
		await admin.firestore().collection('users').doc(userAuth.uid).get()
	).data() as UserData | undefined; // Grab data to check if user is premium or not
	const premium = !!userData?.premium;
	const guilds = Object.keys(userData?.guilds || {});

	if (userData && guilds.includes(gid)) {
		// Time to check if the guild has existing subs
		const worked = await setGuildSubs(gid, cid, premium);
		return res.status(200).send({ worked });
	} else {
		return res.status(403).send({ message: 'You should relogin' });
	}

	res.status(200).send({ message: 'ok' });
};
