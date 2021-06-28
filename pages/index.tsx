import React from 'react';
import { HomeFeatures } from '../components/home/Features';
import Layout from '../components/Layout';
import { HomeCTA } from '../components/sections/HomeCTA';
import { MainHero } from '../components/sections/MainHero';
import { useAuth } from '../contexts/auth';

const IndexPage = () => {
	const user = useAuth();

	return (
		<Layout
			title={
				(user ? user.displayName : 'Ferris Bot') +
				' — A Discord bot for protecting your community.'
			}
		>
			<MainHero />
			<HomeFeatures />
			<HomeCTA />
		</Layout>
	);
};

export default IndexPage;
