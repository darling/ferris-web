import { Interaction, InteractionResponse } from '../../discord_types';
import { buttonActions } from '../button';

const buttonTest = async (body: Interaction): Promise<InteractionResponse> => {
	if (body.message)
		body.message.content =
			'Last pressed by: ' + body.member?.user?.username;

	return { type: 4, data: body.message };
};

buttonActions.set('BUTTON', buttonTest);
