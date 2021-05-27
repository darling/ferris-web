export const slashCommands = new Map<
	string,
	(body: any) => Promise<{ data: any }>
>();

require('./commands');

export const runCommand = async (body: any): Promise<any> => {
	if (body.type !== 2)
		return { type: 4, data: { content: 'Error, improper type. COMMAND' } };

	const run = slashCommands.get(body.data.name || 'help');

	if (run) {
		const data = await run(body);
		return data;
	} else {
		return {
			type: 4,
			data: { content: 'Error, talk to @safe about this' },
		};
	}
};
