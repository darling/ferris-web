import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { AppProps } from 'next/app';
import UserContextProvider from '../contexts/auth';
import GuildProvider from '../contexts/guild';
import '../styles.css';

const stripePromise = loadStripe(
	'pk_live_51HNt6qCpSTRHmRnCpFlyyRUJLzCxFeeAPU586P9RzbE4znwIsVazNQvGq9NESikgCkVrIoV89HSaOkTVAIw9qBTj003ED9nVi0'
);

const MyApp = ({ Component, pageProps }: AppProps) => {
	return (
		<UserContextProvider>
			<Elements stripe={stripePromise}>
				<GuildProvider>
					<Component {...pageProps} />
				</GuildProvider>
			</Elements>
		</UserContextProvider>
	);
};

export default MyApp;
