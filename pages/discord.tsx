import { useEffect } from 'react';
import Layout from '../components/Layout';

const Discord = () => {
	useEffect(() => {
		window.location.replace('https://discord.gg/rZbv5Pty9T');
	});
	return <Layout></Layout>;
};

export default Discord;
