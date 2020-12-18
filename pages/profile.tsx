// import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
// import { FormEvent, useEffect, useState } from 'react';
// import JSONstringify from '../components/dev/JSONstringify';
import Layout from '../components/Layout';
import { useAuth } from '../contexts/auth';
// import { fetchApi } from '../utils/auth/fetch';
import app from '../utils/auth/firebase';
// import Select, { StylesConfig } from 'react-select';

function signOut() {
	app.auth().signOut();
}

// const customStyles: StylesConfig = {
// 	option: (provided, state) => ({
// 		...provided,
// 		color: state.isSelected ? 'red' : 'blue',
// 		padding: '1rem',
// 	}),
// 	control: () => ({
// 		display: 'flex',
// 		flexDirection: 'row',
// 		backgroundColor: 'white',
// 		borderRadius: 7,
// 		padding: 3,
// 		marginBottom: '10px',
// 	}),
// 	singleValue: (provided, state) => {
// 		const opacity = state.isDisabled ? 0.5 : 1;
// 		const transition = 'opacity 300ms';

// 		return { ...provided, opacity, transition };
// 	},
// };

const Profile = () => {
	// const stripe = useStripe();
	// const elements = useElements();
	const user = useAuth();

	// const [setupIntent, setSetupIntent] = useState<any>();
	// const [wallet, setWallet] = useState<any>([]);

	// const createSetupIntent = async () => {
	// 	const si = await fetchApi('wallet');
	// 	setSetupIntent(si);
	// };

	// const getWallet = async () => {
	// 	if (user) {
	// 		const paymentMethods = await fetchApi('list-payments', {
	// 			method: 'GET',
	// 		});
	// 		setWallet(paymentMethods);
	// 	}
	// };

	// const handleSubmit = async (event: FormEvent) => {
	// 	event.preventDefault();

	// 	const cardElement = elements!.getElement(CardElement);

	// 	const {
	// 		setupIntent: updatedSetupIntent,
	// 		error,
	// 	} = await stripe!.confirmCardSetup(setupIntent.client_secret, {
	// 		payment_method: { card: cardElement! },
	// 	});

	// 	if (error) {
	// 		alert(error.message);
	// 		console.log(error);
	// 	} else {
	// 		setSetupIntent(updatedSetupIntent);
	// 		await getWallet();
	// 		alert('Success! Card added to your wallet');
	// 	}
	// };

	// useEffect(() => {
	// 	getWallet();
	// }, [user]);

	if (user === null) {
		return <Layout>You are not signed in.</Layout>;
	}

	return (
		<Layout
			title={`${user.displayName || 'User Profile Page'} | Ferris Bot`}
		>
			{/* <div className="p-4 bg-gray-800 shadow-xl rounded-lg md:w-1/3">
				<label>Current Payment Method</label>
				<Select
					styles={customStyles}
					options={wallet.map((payment: any) => ({
						value: payment.id,
						label: `**** **** **** ${payment.card.last4}`,
					}))}
				/>
				{!setupIntent ? (
					<button
						className="bg-green-600 text-white rounded-lg px-2 py-1"
						onClick={createSetupIntent}
					>
						Add New Card
					</button>
				) : (
					<form onSubmit={handleSubmit}>
						<CardElement
							options={{
								hidePostalCode: false,
								classes: {
									base:
										'bg-green-100 p-4 rounded-lg shadow-lg',
								},
								iconStyle: 'solid',
							}}
						/>
						<button
							className="mt-4 bg-green-600 text-white rounded-lg px-2 py-1"
							type="submit"
						>
							Attach
						</button>
					</form>
				)}
			</div>
			<JSONstringify data={wallet} /> */}
			<div className="mr-3 px-3 py-2 relative flex justify-end h-auto w-auto bg-gray-900">
				<button
					onClick={signOut}
					className="px-2 py-1 rounded shadow-md hover:bg-green-100 hover:text-gray-900 bg-red-700 transition-all duration-150"
				>
					Sign Out
				</button>
			</div>
		</Layout>
	);
};

export default Profile;
