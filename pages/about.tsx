import React from 'react';
import Layout from '../components/Layout';
import {
	AboutBanner,
	AboutFaq,
	AboutTeam,
} from '../components/sections/AboutBanner';

const AboutPage = () => (
	<Layout
		title="About | Ferris Bot"
		headerClassName="bg-green-500 text-gray-800"
		linkClassName="text-gray-100"
	>
		<AboutBanner />
		<AboutTeam />
		<AboutFaq />
	</Layout>
);

export default AboutPage;
