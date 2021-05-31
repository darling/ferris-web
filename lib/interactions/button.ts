import { Interaction, InteractionResponse } from '../discord_types';

export const buttonActions = new Map<
	string,
	(body: Interaction) => Promise<InteractionResponse>
>();

require('./buttonActions');

export const runButton = async (
	body: Interaction
): Promise<InteractionResponse> => {
	if (body.type !== 3 || !body.data)
		return { type: 7, data: { content: 'Error, improper type. BUTTON' } };

	const instanceName = /^[^ ]+/.exec(body.data.custom_id)?.shift();

	if (!instanceName)
		return { type: 7, data: { content: 'Error, nonexistant buttonID' } };

	const run = buttonActions.get(instanceName);

	if (run) {
		const data = await run(body);
		return data;
	} else {
		return {
			type: 7,
			data: { content: 'Error, talk to @safe about this' },
		};
	}
};
