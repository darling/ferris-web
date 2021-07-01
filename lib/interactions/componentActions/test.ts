import { Interaction, InteractionResponse } from '../../discord_types';
import { componentActions } from '../button';

const buttonTest = async (body: Interaction): Promise<InteractionResponse> => {
	if (body.message)
		body.message.content =
			'Last pressed by: ' + body.member?.user?.username;

	return { type: 4, data: body.message };
};

componentActions.set('BUTTON', buttonTest);
