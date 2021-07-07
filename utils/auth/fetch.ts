import app from './firebase';

export async function fetchApi(url: string, opts?: any) {
	const { method, body }: any = { method: 'POST', body: null, ...opts };

	const user = app.auth().currentUser;
	const token = user && (await user.getIdToken());

	const res = await fetch(
		`/api/${url.startsWith('/') ? url.substr(1) : url}`,
		{
			method,
			...(body && { body: JSON.stringify(body) }),
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		}
	);

	try {
		const data = await res.json();

		return data;
	} catch (error) {
		console.error(error);
		return error;
	}
}
