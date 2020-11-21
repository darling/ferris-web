import React from 'react';
import { Faq } from '../components/home/Faq';
import { HomeFeatures } from '../components/home/Features';
import { HomeEndHero, HomeHero } from '../components/home/Heros';
import Layout from '../components/Layout';
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
			<HomeHero />
			<div className="hidden lg:contents">
				<div className="flex justify-center mt-32">
					<svg
						className="w-8 h-8 animate-bounce place-self-center text-green-300"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fillRule="evenodd"
							d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l2.293-2.293a1 1 0 011.414 0z"
							clipRule="evenodd"
						/>
					</svg>
				</div>
			</div>
			<HomeFeatures />
			<Faq />
			<HomeEndHero />
		</Layout>
	);
};

export default IndexPage;
