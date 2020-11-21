import { AppProps } from 'next/app';
import UserContextProvider from '../contexts/auth';
import GuildProvider from '../contexts/guild';
import '../styles.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
	return (
		<UserContextProvider>
			<GuildProvider>
				<Component {...pageProps} />
			</GuildProvider>
		</UserContextProvider>
	);
};

export default MyApp;
