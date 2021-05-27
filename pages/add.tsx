import { useEffect } from 'react';
import Layout from '../components/Layout';

const Discord = () => {
	useEffect(() => {
		window.location.replace(
			'https://discord.com/oauth2/authorize?client_id=637804742935838751&permissions=8&scope=bot'
		);
	});
	return (
		<Layout>
			https://discord.com/oauth2/authorize?client_id=637804742935838751&permissions=8&scope=bot
		</Layout>
	);
};

export default Discord;
