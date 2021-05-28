import React, { FC } from 'react';
import { Markdown } from '../../components/docs/components/Markdown';
import { DocsLayout } from '../../components/docs/DocsLayout';

const DocsHome: FC = () => {
	const data =
		'## Inviting Ferris into your server!\n\nFerris is looking forward to joining your server! However, it needs a formal invitation! Head to <https://ferris.gg/control> to be redirected to the Discord login!\n\nOnce you allow Ferris to eat your cookies and stalk what servers you’re in, choose the designated server you wish Ferris to be apart of! From here, you’ll be sent to a screen to confirm it’s invitation! Once you do, Ferris is in!\n\nYou can access your control panel at any time by going to the menu and clicking ‘Control Panel’! ![The Control Panel is located in the top right of mobile and browser.](https://files.catbox.moe/ciljwq.png)\n\n## Setting up a customized prefix \nHaving a set prefix allows Ferris to know when to respond to your command!\n\nThe default prefix is `;` however, if you’re seeking to change that- it is possible! Head to your Discord Server and execute the command `;setprefix (newPrefix)`, being sure to remove the parentheses and replacing them with your desired prefix!![Changing the prefix is as easy as possible.](https://files.catbox.moe/yq8v31.gif)\n\nFrom there, Ferris should respond with a confirmation message with the new prefix! That’s it, you’re done! Have fun commanding Ferris to roll around with your new designated prefix!\n\nQuick Tip, you can also change this setting at any time by going to your ‘Control Panel’!\n\n## Setting up a logging channel\nIf you want to know when and where something occurs in your server, such as a moderated action, a deleted message or even when Ferris starts to steal cookies once again, it’s possible to log all of these actions into __one__ channel!\n\nHead to your commands channel and execute the command `;setlogchannel (channel)`! Be sure to replace the channel with __your__ customized channel name, if applicable! From there, all events will be logged by your friend, Ferris!\n\n![The log will show a confirmation in the new logging channel if everything goes right.](https://files.catbox.moe/dkvwng.gif)';
	return (
		<DocsLayout>
			<Markdown data={data} />
		</DocsLayout>
	);
};

export default DocsHome;
