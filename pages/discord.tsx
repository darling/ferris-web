import { useEffect } from 'react';
import Layout from '../components/Layout';

const Discord = () => {
	useEffect(() => {
		window.location.replace('https://discord.gg/A3ZjXAn');
	});
	return <Layout></Layout>;
};

export default Discord;
