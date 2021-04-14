import { MainHero } from '../components/sections/MainHero';
import Layout from '../components/Layout';
import { HomeCTA } from '../components/sections/HomeCTA';
import { HomeSideBySide } from '../components/sections/HomeSideBySide';
import { HomeTestimonial } from '../components/sections/HomeTestimonial';
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
			<HomeSideBySide />
			<HomeTestimonial />
			<HomeCTA />
		</Layout>
	);
};

export default IndexPage;
