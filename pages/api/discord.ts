import { NextApiRequest, NextApiResponse } from 'next';
import nacl from 'tweetnacl';
import { runButton } from '../../lib/interactions/button';
import { runCommand } from '../../lib/interactions/command';

const PUBLIC_KEY =
	process.env.NODE_ENV == 'development'
		? 'a40bf9a961f1fcadab9fab88550a5a2c1ce557a2e10e00493e71cd750ae64a36'
		: 'a72e6e3333eb7b6eec7774345e4cb74dae56344858f086981ae3419cc1fdaf58';

export const config = {
	api: {
		bodyParser: false,
	},
};

const parseRawbody = (req: any) => {
	return new Promise<string>((resolve) => {
		if (!req.body) {
			let buffer = '';
			req.on('data', (chunk: any) => {
				buffer += chunk;
			});

			req.on('end', () => {
				resolve(Buffer.from(buffer).toString());
			});
		}
	});
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const sig = req.headers['x-signature-ed25519'];
	const timestamp = req.headers['x-signature-timestamp'];
	const rawBody = await parseRawbody(req);
	const body = JSON.parse(rawBody);

	const isVerified = nacl.sign.detached.verify(
		Buffer.from(timestamp + rawBody),
		Buffer.from(sig as string, 'hex'),
		Buffer.from(PUBLIC_KEY, 'hex')
	);

	if (!isVerified) {
		return res.status(401).end('invalid request signature');
	}

	if (body.type) {
		let response;
		switch (body.type) {
			case 1:
				return res.status(200).json({ type: 1 });
			case 2:
				response = await runCommand(body);
				return res.status(200).json(response);
				break;
			case 3: // TODO: I HATE THE FACT THAT TYPINGS DON'T EXIST
				response = await runButton(body);
				if (!response) return res.status(200).json({ type: 6 });
				return res.status(200).json(response);
			default:
				break;
		}

		return res.status(200).json({ ok: true });
	}

	return res.status(401).send('Please authenticate... :(');
};
