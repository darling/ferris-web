import React, { FC, ReactElement } from 'react';
import rereact from 'rehype-react';
import parse from 'remark-parse';
import rehtml from 'remark-rehype';
import unified from 'unified';

import Layout from '../components/Layout';

const components: { [key: string]: FC } = {
	p: (p) => <p className="py-2 text-gray-300">{p.children}</p>,
	a: (p: any) => (
		<a className="text-green-300 underline" href={p.href}>
			{p.children}
		</a>
	),
	ul: (p) => (
		<ul className="list-disc list-inside py-4 text-gray-300">
			{p.children}
		</ul>
	),
	li: (p) => (
		<li className="py-2 hover:text-gray-500 transition duration-200">
			{p.children}
		</li>
	),
	h2: (p) => <h2 className="text-xl text-gray-200 py-4">{p.children}</h2>,
	h1: (p) => (
		<h1 className="font-bold text-3xl text-white py-4">{p.children}</h1>
	),
};

const Terms = () => {
	const data =
		'# Terms and Conditions of Ferris.gg\n\nThe following terms and conditions (collectively, these "Terms and Conditions") apply to your use of [https://ferris.gg/](https://ferris.gg/), including any content, functionality and services offered on or via [https://ferris.gg/](https://ferris.gg/) (the "Website").\n\nPlease read the Terms and Conditions carefully before you start using [https://ferris.gg/](https://ferris.gg/), because by using the Website you accept and agree to be bound and abide by these Terms and Conditions.\n\nThese Terms and Conditions are effective as of Jun 28, 2021. We expressly reserve the right to change these Terms and Conditions from time to time without notice to you. You acknowledge and agree that it is your responsibility to review this Website and these Terms and Conditions from time to time and to familiarize yourself with any modifications. Your continued use of this Website after such modifications will constitute acknowledgement of the modified Terms and Conditions and agreement to abide and be bound by the modified Terms and Conditions.\n\n## Conduct on Website\n\nYour use of the Website is subject to all applicable laws and regulations, and you are solely responsible for the substance of your communications through the Website.\n\nBy posting information in or otherwise using any communications service, chat room, message board, newsgroup, software library, or other interactive service that may be available to you on or through this Website, you agree that you will not upload, share, post, or otherwise distribute or facilitate distribution of any content — including text, communications, software, images, sounds, data, or other information — that:\n\n*   Is unlawful, threatening, abusive, harassing, defamatory, libelous, deceptive, fraudulent, invasive of another\'s privacy, tortious, contains explicit or graphic descriptions or accounts of sexual acts (including but not limited to sexual language of a violent or threatening nature directed at another individual or group of individuals), or otherwise violates our rules or policies\n*   Victimizes, harasses, degrades, or intimidates an individual or group of individuals on the basis of religion, gender, sexual orientation, race, ethnicity, age, or disability\n*   Infringes on any patent, trademark, trade secret, copyright, right of publicity, or other proprietary right of any party\n*   Constitutes unauthorized or unsolicited advertising, junk or bulk email (also known as "spamming"), chain letters, any other form of unauthorized solicitation, or any form of lottery or gambling\n*   Contains software viruses or any other computer code, files, or programs that are designed or intended to disrupt, damage, or limit the functioning of any software, hardware, or telecommunications equipment or to damage or obtain unauthorized access to any data or other information of any third party\n*   Impersonates any person or entity, including any of our employees or representatives\n\nWe neither endorse nor assume any liability for the contents of any material uploaded or submitted by third party users of the Website. We generally do not pre-screen, monitor, or edit the content posted by users of communications services, chat rooms, message boards, newsgroups, software libraries, or other interactive services that may be available on or through this Website.\n\nHowever, we and our agents have the right at their sole discretion to remove any content that, in our judgment, does not comply with these Terms of Use and any other rules of user conduct for our Website, or is otherwise harmful, objectionable, or inaccurate. We are not responsible for any failure or delay in removing such content. You hereby consent to such removal and waive any claim against us arising out of such removal of content.\n\nYou agree that we may at any time, and at our sole discretion, terminate your membership, account, or other affiliation with our site without prior notice to you for violating any of the above provisions.\n\nIn addition, you acknowledge that we will cooperate fully with investigations of violations of systems or network security at other sites, including cooperating with law enforcement authorities in investigating suspected criminal violations.\n\n## Intellectual Property\n\nBy accepting these Terms and Conditions, you acknowledge and agree that all content presented to you on this Website is protected by copyrights, trademarks, service marks, patents or other proprietary rights and laws, and is the sole property of [https://ferris.gg/](https://ferris.gg/).\n\nYou are only permitted to use the content as expressly authorized by us or the specific content provider. Except for a single copy made for personal use only, you may not copy, reproduce, modify, republish, upload, post, transmit, or distribute any documents or information from this Website in any form or by any means without prior written permission from us or the specific content provider, and you are solely responsible for obtaining permission before reusing any copyrighted material that is available on this Website.\n\n## Third Party Websites\n\nThis Website may link you to other sites on the Internet or otherwise include references to information, documents, software, materials and/or services provided by other parties. These websites may contain information or material that some people may find inappropriate or offensive.\n\nThese other websites and parties are not under our control, and you acknowledge that we are not responsible for the accuracy, copyright compliance, legality, decency, or any other aspect of the content of such sites, nor are we responsible for errors or omissions in any references to other parties or their products and services. The inclusion of such a link or reference is provided merely as a convenience and does not imply endorsement of, or association with, the Website or party by us, or any warranty of any kind, either express or implied.\n\n## Disclaimer of Warranties, Limitations of Liability and Indemnification\n\nYour use of [https://ferris.gg/](https://ferris.gg/) is at your sole risk. The Website is provided "as is" and "as available". We disclaim all warranties of any kind, express or implied, including, without limitation, the warranties of merchantability, fitness for a particular purpose and non-infringement.\n\nWe are not liable for damages, direct or consequential, resulting from your use of the Website, and you agree to defend, indemnify and hold us harmless from any claims, losses, liability costs and expenses (including but not limites to attorney\'s fees) arising from your violation of any third-party\'s rights. You acknowledge that you have only a limited, non-exclusive, nontransferable license to use the Website. Because the Website is not error or bug free, you agree that you will use it carefully and avoid using it ways which might result in any loss of your or any third party\'s property or information.\n\n## Term and termination\n\nThis Terms and Conditions will become effective in relation to you when you create a [https://ferris.gg/](https://ferris.gg/) account or when you start using the [https://ferris.gg/](https://ferris.gg/) and will remain effective until terminated by you or by us.\n\n[https://ferris.gg/](https://ferris.gg/) reserves the right to terminate this Terms and Conditions or suspend your account at any time in case of unauthorized, or suspected unauthorized use of the Website whether in contravention of this Terms and Conditions or otherwise. If [https://ferris.gg/](https://ferris.gg/) terminates this Terms and Conditions, or suspends your account for any of the reasons set out in this section, [https://ferris.gg/](https://ferris.gg/) shall have no liability or responsibility to you.\n\n## Assignment\n\n[https://ferris.gg/](https://ferris.gg/) may assign this Terms and Conditions or any part of it without restrictions. You may not assign this Terms and Conditions or any part of it to any third party.\n\n## Governing Law\n\nThese Terms and Conditions and any dispute or claim arising out of, or related to them, shall be governed by and construed in accordance with the internal laws of the US without giving effect to any choice or conflict of law provision or rule.\n\nAny legal suit, action or proceeding arising out of, or related to, these Terms of Service or the Website shall be instituted exclusively in the federal courts of US.';

	return (
		<Layout>
			<div className="container px-4 lg:max-w-4xl mx-auto break-words">
				{(unified()
					.use(parse)
					.use(rehtml)
					.use(rereact, {
						components: components,
						Fragment: React.Fragment,
						createElement: React.createElement,
					})
					.processSync(data).result as ReactElement) || (
					<p>Error - Unable to parse</p>
				)}
			</div>
		</Layout>
	);
};
export default Terms;
