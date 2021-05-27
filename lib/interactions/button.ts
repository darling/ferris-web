export const buttonActions = new Map<
	string,
	(body: any) => Promise<{ data: any }>
>();

require('./buttonActions');

export const runButton = async (
	body: any
): Promise<{ type: Number; data: any }> => {
	if (body.type !== 3 || !body.data)
		return { type: 7, data: { content: 'Error, improper type. BUTTON' } };

	const instanceName = body.data.custom_id;

	if (!instanceName)
		return { type: 7, data: { content: 'Error, nonexistant buttonID' } };

	const run = buttonActions.get(instanceName);

	if (run) {
		const data = await run(body);
		return { type: 7, ...data };
	} else {
		return {
			type: 7,
			data: { content: 'Error, talk to @safe about this' },
		};
	}
};
