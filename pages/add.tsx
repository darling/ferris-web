import { useEffect } from 'react';
import Layout from '../components/Layout';

const Discord = () => {
	useEffect(() => {
		window.location.replace(
			'https://discord.com/oauth2/authorize?client_id=637804742935838751&permissions=2134207679&scope=bot'
		);
	});
	return <Layout></Layout>;
};

export default Discord;
