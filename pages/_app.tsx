import { AppProps } from "next/app";
import UserContextProvider from "../contexts/auth";
import "../tailwind.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <UserContextProvider>
      <Component {...pageProps} />
    </UserContextProvider>
  );
};

export default MyApp;
