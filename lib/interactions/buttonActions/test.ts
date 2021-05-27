import { buttonActions } from '../button';

const buttonTest = async (body: any): Promise<{ data: any }> => {
	body.message.content = 'Last pressed by: ' + body.member.user.username;
	return { data: body.message };
};

buttonActions.set('BUTTON', buttonTest);
