// import { useStripe, useElements } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import JSONstringify from '../../components/dev/JSONstringify';
import Layout from '../../components/Layout';
import { useAuth } from '../../contexts/auth';
import { fetchApi } from '../../utils/auth/fetch';

const Billing = () => {
	return <>Not allowed</>;
	// const stripe = useStripe();
	// const elements = useElements();
	const user = useAuth();

	const [subscriptions, setSubscriptions] = useState([]);

	const getSubscriptions = async () => {
		if (user) {
			const subs = await fetchApi('subscriptions', { method: 'GET' });
			setSubscriptions(subs);
		}
	};

	const cancel = async () => {
		if (user) {
			await fetchApi('subscriptions/' + user.uid, { method: 'PATCH' });
		}
	};

	useEffect(() => {
		getSubscriptions();
	}, [user]);

	return (
		<Layout>
			<button onClick={cancel}>Skrrt</button>
			<JSONstringify data={subscriptions} />
		</Layout>
	);
};

export default Billing;
