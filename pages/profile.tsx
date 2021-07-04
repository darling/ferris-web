import { useStripe } from '@stripe/react-stripe-js';
import classNames from 'classnames';
import Link from 'next/link';
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

// const COLORS = {
// 	premium: 'bg-yellow-500 text-yellow-300 text-yellow-200 text-yellow-50',
// 	regular: 'bg-green-500 text-green-300 text-green-200 text-green-50',
// };

const Profile = () => {
	const stripe: any = useStripe();
	const user = useAuth();

	const [userData, setUserData] = useState<UserData>();
	const [subscriptions, setSubscriptions] = useState<Stripe.Subscription[]>();
	const [loading, setLoading] = useState(false);

	const [currencyDeleted, setCurrencyDeleted] = useState(false);

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

	const deleteGuildCache = async () => {
		if (!user?.uid) return;

		await fetchApi('/delcache');
	};

	const deleteUserCurrency = async () => {
		if (!user?.uid) return;

		await fetchApi('/delcurrency');

		setCurrencyDeleted(true);
	};

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
					<h2 className="text-white font-bold text-2xl">
						Profile controls
					</h2>
					<CardWithAction
						title="Need to change Discord accounts?"
						buttonAction={signOut}
						buttonTitle="Log Out"
						buttonCss="bg-red-500"
					>
						It's alright, we'll be here when you get back.
					</CardWithAction>
					{subscriptions?.map((sub: Stripe.Subscription) => {
						return (
							<CardWithAction
								title="Manage Subscription."
								buttonTitle="Manage on Stripe"
								buttonCss="bg-yellow-500"
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
							color={color}
						>
							Help support Ferris! This is handled through Stripe.
						</CardWithAction>
					</div>
				</div>
			</div>

			<div className="container mx-auto sm:rounded-lg bg-gray-800 p-4 sm:p-6 lg:p-8 my-4">
				<h2 className="text-white font-bold text-2xl">
					Manage your data?
				</h2>
				<CardWithAction
					title="Delete your guild data"
					buttonAction={deleteGuildCache}
					buttonTitle={!userData?.guilds ? 'Deleted' : 'Delete'}
					buttonCss="bg-red-500"
					disabled={!userData?.guilds}
				>
					We cache which guilds you can manage, although it's
					regularly cleaned out with logging in/out. We want to give
					you the controls to delete it.
				</CardWithAction>
				<CardWithAction
					title="Delete your currency/xp data"
					buttonAction={deleteUserCurrency}
					buttonTitle={currencyDeleted ? 'Deleted' : 'Delete'}
					buttonCss="bg-red-500"
					disabled={currencyDeleted}
				>
					We have an xp/data feature that increments on the basis of
					our XP algorithm. You can delete this data but you will lose
					your level and xp, as well as the currency that you have.
				</CardWithAction>
				<div className="prose-sm prose-green text-gray-200">
					<p>
						Want to delete ALL your data? We don't keep much, if not
						anything other than your username and guilds, read more
						at the{' '}
						<Link href="/privacy">
							<a>Privacy Policy</a>
						</Link>
						.
					</p>
					<p>
						The reason we don't have the delete button set up is
						because I have no idea how to handle deleting if someone
						has payment info or the specifics surrounding that.
					</p>
					<p>
						We're working on making it automagic, feel free to ping{' '}
						<span className="text-green-300">@Safe</span> or email
						<span className="text-green-300">
							{' '}
							privacy@ey.lc
						</span>{' '}
						to auto remove your data asap.
					</p>
				</div>
			</div>
			<div className="container mx-auto sm:rounded-lg bg-gray-800 p-4 sm:p-6 lg:p-8 my-4">
				<div className="space-y-4 text-gray-200">
					<h2 className="font-bold text-2xl pb-4 text-white">
						Thank you!
					</h2>
					<p>
						Thank you for using Ferris,{' '}
						<span className="text-green-200">
							{user.displayName}
						</span>
						!
					</p>
					<p>
						It really makes my day to know that people appreciate
						and use our project.
					</p>
					<p>
						I hope that you can join the Discord and see what we're
						up to!
					</p>
					<p>Thanks,</p>
					<p>
						<span className="text-green-300">Safe</span> and the
						<span className="text-green-300"> Ferris</span> Team
					</p>
				</div>
			</div>
		</Layout>
	);
};

const CardWithAction = (props: any) => (
	<div className="my-2">
		<div className="">
			<div className="py-5 sm:py-6">
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
							className={classNames(
								props.buttonCss
									? props.buttonCss
									: 'bg-green-500',
								'transition duration-200',
								`inline-flex items-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm disabled:bg-gray-400`
							)}
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
