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
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="max-w-3xl mx-auto">
					<CardWithAction
						title="Need to change Discord accounts?"
						buttonAction={signOut}
						buttonTitle="Log Out"
						buttonCss="red"
					>
						It's alright, we'll be here when you get back.
					</CardWithAction>
					{subscriptions?.map((sub: Stripe.Subscription) => {
						return (
							<CardWithAction
								title="Manage Subscription."
								buttonTitle="Manage on Stripe"
								buttonCss="blue"
								buttonAction={billingPortal}
								disabled={loading}
							>
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
							</CardWithAction>
						);
					})}
					<div hidden={!!subscriptions?.length || false}>
						<CardWithAction
							title="Buy a Ferris Subscription"
							buttonTitle="Purchase"
							buttonAction={newSub}
							disabled={loading}
						>
							Help support Ferris!
						</CardWithAction>
					</div>
				</div>
			</div>
		</Layout>
	);
};

const CardWithAction = (props: any) => (
	<div className="max-w-3xl mx-auto my-2">
		<div className="bg-gray-700 shadow sm:rounded-lg">
			<div className="px-4 py-5 sm:p-6">
				<div className="sm:flex sm:items-start sm:justify-between">
					<div>
						<h3 className="text-lg leading-6 font-medium">
							{props.title}
						</h3>
						<div className="mt-2 max-w-xl text-sm text-gray-200">
							<p>{props.children}</p>
						</div>
					</div>
					<div className="mt-5 sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:flex sm:items-center">
						<button
							type="button"
							onClick={props.buttonAction}
							disabled={props.disabled}
							className={`inline-flex items-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm`}
						>
							{props.buttonTitle}
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
);

export default Profile;
