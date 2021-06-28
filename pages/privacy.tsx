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

const Privacy = () => {
	const data =
		"# Privacy Policy for Ferris.gg\n\nAt Ferris.gg, accessible from [https://ferris.gg/](https://ferris.gg/), one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Ferris.gg and how we use it.\n\nIf you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.\n\nEmail: [ferris@ey.lc](mailto:ferris@ey.lc)\n\n## General Data Protection Regulation (GDPR)\n\nWe are a Data Controller of your information.\n\nFerris.gg legal basis for collecting and using the personal information described in this Privacy Policy depends on the Personal Information we collect and the specific context in which we collect the information:\n\n*   Ferris.gg needs to perform a contract with you\n*   You have given Ferris.gg permission to do so\n*   Processing your personal information is in Ferris.gg legitimate interests\n*   Ferris.gg needs to comply with the law\n\nFerris.gg will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your information to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our policies.\n\nIf you are a resident of the European Economic Area (EEA), you have certain data protection rights. If you wish to be informed what Personal Information we hold about you and if you want it to be removed from our systems, please contact us.\n\nIn certain circumstances, you have the following data protection rights:\n\n*   The right to access, update or to delete the information we have on you.\n*   The right of rectification.\n*   The right to object.\n*   The right of restriction.\n*   The right to data portability\n*   The right to withdraw consent\n\n## Log Files\n\nFerris.gg follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.\n\n## Cookies and Web Beacons\n\nLike any other website, Ferris.gg uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.\n\nFor more general information on cookies, please read [\"What Are Cookies\"](https://www.privacypolicyonline.com/what-are-cookies/).\n\n## Privacy Policies\n\nYou may consult this list to find the Privacy Policy for each of the advertising partners of Ferris.gg.\n\nThird-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on Ferris.gg, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.\n\nNote that Ferris.gg has no access to or control over these cookies that are used by third-party advertisers.\n\n## Third Party Privacy Policies\n\nFerris.gg's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.\n\nYou can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites.\n\n## Children's Information\n\nAnother part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.\n\nFerris.gg does not knowingly collect any Personal Identifiable Information from children under the age of 13\\. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.\n\n## Online Privacy Policy Only\n\nOur Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in Ferris.gg. This policy is not applicable to any information collected offline or via channels other than this website.\n\n## Consent\n\nBy using our website, you hereby consent to our Privacy Policy and agree to its terms.";

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

export default Privacy;
