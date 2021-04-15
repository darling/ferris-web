import React from 'react';
import Layout from '../components/Layout';
import { AboutBanner, AboutTeam } from '../components/sections/AboutBanner';

const AboutPage = () => (
	<Layout title="About | Ferris Bot">
		<AboutBanner />
		<AboutTeam />
	</Layout>
);

export default AboutPage;
