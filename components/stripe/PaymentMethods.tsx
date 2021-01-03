import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import {
	PaymentMethod,
	SetupIntent,
	StripeElementStyle,
} from '@stripe/stripe-js';
import { capitalize } from 'lodash';
import Router from 'next/router';
import { FormEvent, useEffect, useState } from 'react';

import { useAuth } from '../../contexts/auth';
import { fetchApi } from '../../utils/auth/fetch';

const cardElementStyle: StripeElementStyle = {
	base: {
		fontSize: '20px',
	},
};

export const PaymentMethods = () => {
	const stripe = useStripe()!;
	const elements = useElements()!;
	const user = useAuth();

	const [setupIntent, setSetupIntent] = useState<SetupIntent>();
	const [wallet, setWallet] = useState<PaymentMethod[]>([]);
	const [name, setName] = useState<string>();
	const [email, setEmail] = useState<string>();
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		getWallet();
	}, [user]);

	const close = async (id: string) => {
		const paymentMethod:
			| PaymentMethod
			| { message: string } = await fetchApi('wallet', {
			method: 'DELETE',
			body: { id },
		});

		const responseMsg = paymentMethod as { message: string };

		if (responseMsg.message) {
			// User wants to remove card but there was an error/existing card.
			alert(responseMsg.message);
		} else {
			alert('Removed card');
			Router.reload();
		}
	};

	const createSetupIntent = async () => {
		const si = await fetchApi('wallet');
		setSetupIntent(si);
	};

	const handleSubmit = async (event: FormEvent) => {
		setLoading(true);
		event.preventDefault();

		const cardElement = elements.getElement(CardElement);

		if (!setupIntent || !setupIntent.client_secret) {
			alert('No setup intent, please refresh the page and try again.');
			return;
		}

		const { error, setupIntent: updatedSi } = await stripe.confirmCardSetup(
			setupIntent.client_secret,
			{
				payment_method: {
					card: cardElement!,
					billing_details: {
						email,
						name,
					},
				},
			}
		);

		if (error) {
			alert(error.message);
			console.error(error);
		} else {
			setSetupIntent(updatedSi);
			await getWallet();
			alert('Success! Card added to your wallet!');
		}

		setLoading(false);
	};

	const getWallet = async () => {
		if (user) {
			const paymentMethods = await fetchApi('list-payments', {
				method: 'GET',
			});
			setWallet(paymentMethods);
		}
	};

	if (!user) {
		<p>Please authenticate</p>;
	}

	return (
		<div className="bg-gray-800 rounded-md shadow-xl">
			<div className="flex flex-col gap-2">
				{wallet.map((method) => {
					return (
						<Card close={close} key={method.id} method={method} />
					);
				})}
				<button
					className="bg-white rounded-md w-full p-3 text-gray-900 mt-2"
					onClick={createSetupIntent}
					hidden={!!setupIntent}
				>
					Attach a new Credit Card
				</button>
				<form
					className="bg-gray-900 mb-2 p-3 rounded-lg"
					hidden={!!!setupIntent}
					onSubmit={handleSubmit}
				>
					<p className="text-lg">Add a new card.</p>
					<div className="flex flex-col items-start">
						<label htmlFor="name">Name</label>
						<input
							id="name"
							name="name"
							type="name"
							placeholder="Johnny Appleseed"
							className="w-full bg-green-100 text-gray-900 p-3 rounded-md text-md"
							required
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div className="flex flex-col items-start">
						<label htmlFor="email">Email</label>
						<input
							id="email"
							name="name"
							type="email"
							placeholder="email@example.com"
							className="w-full bg-green-100 text-gray-900 p-3 rounded-md text-md"
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div className="flex flex-col items-start">
						<label htmlFor="card">Card</label>
						<CardElement
							id="card"
							options={{ style: cardElementStyle }}
							className="w-full p-3 rounded-lg bg-green-100"
						/>
					</div>

					<button
						className="bg-white rounded-md w-full p-3 text-gray-900 mt-2"
						type="submit"
						disabled={loading}
					>
						Add Card
					</button>
					<p className="">Payments and billing handled by Stripe.</p>
				</form>
			</div>
		</div>
	);
};

const Card = (props: any) => {
	const method: PaymentMethod = props.method;
	const close: (id: string) => {} = props.close;
	return (
		<div className="rounded-lg bg-gray-900 p-3" key={method.id}>
			<span className="font-bold tracking-wide">
				{capitalize(method.card?.brand)}
			</span>
			<br />
			<p className="font-mono">**** **** **** {method.card?.last4}</p>
			<button onClick={() => close(method.id)}>Remove</button>
		</div>
	);
};
