export const buttonActions = new Map<
	string,
	(body: any) => Promise<{ data: any } | undefined>
>();

require('./buttonActions');

export const runButton = async (
	body: any
): Promise<{ type: Number; data: any } | undefined> => {
	if (body.type !== 3 || !body.data)
		return { type: 7, data: { content: 'Error, improper type. BUTTON' } };

	const instanceName = /^[^ ]+/.exec(body.data.custom_id)?.shift();

	if (!instanceName)
		return { type: 7, data: { content: 'Error, nonexistant buttonID' } };

	const run = buttonActions.get(instanceName);

	if (run) {
		const data = await run(body);
		if (data) return { type: 7, ...data };
		return;
	} else {
		return {
			type: 7,
			data: { content: 'Error, talk to @safe about this' },
		};
	}
};
