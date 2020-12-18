import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { AppProps } from 'next/app';
import UserContextProvider from '../contexts/auth';
import GuildProvider from '../contexts/guild';
import '../styles.css';

const stripePromise = loadStripe(
	'pk_test_51HNt6qCpSTRHmRnCgSh6GElDl7q5YNlmo67u4Vtm7ctZvlI7idk0lVGBQMiE9owaNb8norFngbR5h0QtJY1GtJP500GuHVGpm1'
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
