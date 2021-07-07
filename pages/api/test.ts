import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { URL_DATA } from '../../lib/axios';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	// const userAuth = await auth(req, res);
	// if (!userAuth)
	// 	return res.status(401).send({ message: 'Please authenticate properly...' });
	return res.status(400).send({ message: 'no' });
	await axios.post('/echo', req.body, URL_DATA);

	res.status(200).send({ message: 'ok' });
};
