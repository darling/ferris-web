import { useStripe } from '@stripe/react-stripe-js';
import { FormEvent, useEffect, useState } from 'react';
import Stripe from 'stripe';

import Layout from '../components/Layout';
import { useAuth } from '../contexts/auth';
import { fetchApi } from '../utils/auth/fetch';
import app from '../utils/auth/firebase';

function signOut() {
	app.auth().signOut();
}

const Profile = () => {
	const stripe = useStripe();
	const user = useAuth();

	const [subscriptions, setSubscriptions] = useState<Stripe.Subscription[]>();
	const [loading, setLoading] = useState(false);

	const hasSubscription = (subscriptions?.length || 0) > 0;

	const getSubscriptions = async () => {
		if (user) {
			const subs = await fetchApi('subscriptions', { method: 'GET' });
			setSubscriptions(subs.data);
		}
	};

	const newSub = async (event: FormEvent) => {
		setLoading(true);
		event.preventDefault();

		const checkoutSession: any = await fetchApi('checkout', {
			method: 'POST',
			body: { priceId: 'price_1I5S02CpSTRHmRnCfVhI0fm9' },
		});

		stripe?.redirectToCheckout({
			sessionId: checkoutSession.sessionId,
		});

		setLoading(false);
	};

	const billingPortal = async (event: FormEvent) => {
		setLoading(true);
		event.preventDefault();

		const { url } = await fetchApi('billing-portal');

		window.location.replace(url);

		setLoading(false);
	};

	const parseTime = (time: number) => {
		return new Date(time * 1000);
	};

	useEffect(() => {
		if (!user) {
			console.warn('user not logged in');
			return;
		}

		getSubscriptions();
	}, [user]);

	if (user === null) {
		return <Layout>You are not signed in.</Layout>;
	}

	return (
		<Layout
			title={`${user.displayName || 'User Profile Page'} | Ferris Bot`}
		>
			<div className="mr-3 px-3 py-2 relative flex justify-end h-auto w-auto bg-gray-900">
				<button
					onClick={signOut}
					className="px-2 py-1 rounded shadow-md hover:bg-green-100 hover:text-gray-900 bg-red-700 transition-all duration-150"
				>
					Sign Out
				</button>
			</div>

			<div className="py-2 relative flex justify-start h-auto w-auto bg-gray-900 mb-5">
				<p className="text-green-300 text-xl">Manage Plan</p>
			</div>
			<div className="flex flex-col lg:w-1/3 md:w-1/2 gap-5">
				{subscriptions?.map((sub: Stripe.Subscription) => {
					return (
						<div
							key={sub.id}
							className="flex flex-col bg-gray-800 p-3 rounded-lg gap-2"
						>
							<span className="font-bold tracking-wide text-lg">
								Billing Information
							</span>
							<p>
								Your subscription will automatically renew on{' '}
								<span className="font-bold">
									{parseTime(
										sub.current_period_end
									).toDateString()}
								</span>
								. The amount is $
								{(
									(sub.items.data[0].plan.amount || 0) / 100
								).toFixed(2)}
								.
							</p>
							<button
								className="bg-white rounded-md w-full p-3 text-gray-900 mt-2"
								onClick={billingPortal}
								disabled={loading}
							>
								Manage Subscription
							</button>
						</div>
					);
				})}
				<div
					className="flex flex-col bg-gray-800 p-3 rounded-lg gap-2"
					hidden={hasSubscription}
				>
					<span className="font-bold tracking-wide text-lg">
						Checkout
					</span>
					<button
						className="bg-white rounded-md w-full p-3 text-gray-900 mt-2"
						onClick={newSub}
						disabled={loading}
					>
						Purchase a subscription
					</button>
				</div>
			</div>
		</Layout>
	);
};

export default Profile;
