import { useStripe } from '@stripe/react-stripe-js';
import classNames from 'classnames';
import { FormEvent, useEffect, useState } from 'react';
import Stripe from 'stripe';

import Layout from '../components/Layout';
import { useAuth } from '../contexts/auth';
import { UserData } from '../interfaces';
import { fetchApi } from '../utils/auth/fetch';
import app, { db } from '../utils/auth/firebase';

function signOut() {
	app.auth().signOut();
}

const Profile = () => {
	const stripe: any = useStripe();
	const user = useAuth();

	const [userData, setUserData] = useState<UserData>();
	const [subscriptions, setSubscriptions] = useState<Stripe.Subscription[]>();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (!user?.uid) return;

		const close = db
			.collection('users')
			.doc(user.uid)
			.onSnapshot((snap) => {
				setUserData(snap.data() as UserData);
			});

		console.log(userData);

		return () => {
			close();
		};
	}, [user]);

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

	const hasSub = userData?.premium || false;

	const color = hasSub ? 'yellow' : 'green';

	return (
		<Layout
			title={`${user.displayName || 'User Profile Page'} | Ferris Bot`}
			headerClassName={`bg-${color}-500`}
			linkClassName={`text-${color}-300 hover:text-white`}
			colorOverride={`text-${color}-200 bg-gray-900`}
		>
			<div className={`pb-32 bg-${color}-500`}>
				<span className="bg-green-500"></span>
				<span className="bg-yellow-500"></span>
				<span className="text-green-300"></span>
				<span className="text-yellow-300"></span>
				<span className="text-green-200"></span>
				<span className="text-yellow-200"></span>
				<span className="text-green-50"></span>
				<span className="text-yellow-50"></span>
				<header className="py-10">
					<div className="container mx-auto px-4 sm:px-6 lg:px-8">
						<h1
							className={classNames(
								`text-3xl font-bold text-${color}-50`
							)}
						>
							Welcome back, {user?.displayName}
							<span className="text-lg">
								#{userData?.discrim}
							</span>
						</h1>
						<p hidden={!hasSub}>
							Thank you for supporting Ferris! If you see this,
							you are supporting Ferris.
						</p>
					</div>
				</header>
			</div>
			<div className="container mx-auto sm:rounded-lg -mt-32 bg-gray-800">
				<div className="p-4 sm:p-6 lg:p-8">
					<CardWithAction
						title="Need to change Discord accounts?"
						buttonAction={signOut}
						buttonTitle="Log Out"
						buttonCss="red"
						color={color}
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
								color={color}
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
							color={color}
						>
							Help support Ferris! This is handled through Stripe.
						</CardWithAction>
					</div>
				</div>
			</div>
			<div className="container mx-auto sm:rounded-lg bg-gray-800 p-4 sm:p-6 lg:p-8 my-4">
				Thank you for using Ferris, {user.displayName}!
				<br />
				<br />
				It really makes my day to know that people appreciate and use my
				project.
				<br />I hope that you can join the Discord and say "Hi" to me
				(Safe) and the team!
				<br />
				<br />
				Thanks,
				<br />
				Safe#0001 and the Ferris Team
			</div>
		</Layout>
	);
};

const CardWithAction = (props: any) => (
	<div className="my-2">
		<div className="">
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
							className={`inline-flex items-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-${props.color}-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm`}
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
