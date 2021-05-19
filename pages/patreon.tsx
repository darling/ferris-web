import { useEffect } from 'react';
import Layout from '../components/Layout';

const Patreon = () => {
	useEffect(() => {
		window.location.replace('https://patreon.com/FerrisOnDiscord');
	});
	return <Layout></Layout>;
};

export default Patreon;
