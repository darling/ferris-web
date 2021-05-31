import { Interaction, InteractionResponse } from '../discord_types';

export const slashCommands = new Map<
	string,
	(body: any) => Promise<InteractionResponse>
>();

require('./commands');

export const runCommand = async (
	body: Interaction
): Promise<InteractionResponse> => {
	if (body.type !== 2 || !body.data)
		return {
			type: 4,
			data: { content: 'Error, improper type. COMMAND', flags: 64 },
		};

	const run = slashCommands.get(body.data.name);

	if (run) {
		const data = await run(body);
		return data;
	} else {
		return {
			type: 4,
			data: { content: 'Error, talk to @safe about this', flags: 64 },
		};
	}
};
