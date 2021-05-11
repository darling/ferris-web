import { useEffect } from 'react';
import Layout from '../components/Layout';

const Status = () => {
	useEffect(() => {
		window.location.replace('https://ferris.statuspage.io/');
	});
	return <Layout></Layout>;
};

export default Status;
