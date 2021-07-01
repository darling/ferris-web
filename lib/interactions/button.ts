import { Interaction, InteractionResponse } from '../discord_types';

export const componentActions = new Map<
	string,
	(body: Interaction) => Promise<InteractionResponse>
>();

require('./componentActions');

export const runComponent = async (
	body: Interaction
): Promise<InteractionResponse> => {
	if (body.type !== 3 || !body.data)
		return {
			type: 7,
			data: { content: 'Error, improper type. COMPONENT' },
		};

	const instanceName = /^[^ ]+/.exec(body.data.custom_id)?.shift();

	if (!instanceName)
		return { type: 7, data: { content: 'Error, nonexistant componentID' } };

	const run = componentActions.get(instanceName);

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
