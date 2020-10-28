import React, { ReactNode } from "react";
import Head from "next/head";
import Header from "./default/Header";
import Footer from "./default/Footer";

type Props = {
  children?: ReactNode;
  title?: string;
  colorOverride?: string;
};

const Layout = ({
  children,
  title = "This is the default title",
  colorOverride,
}: Props) => (
  <div className={colorOverride || "bg-gray-800 text-green-100"}>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Header />
    <div className="container mx-auto min-h-screen">{children}</div>
    <Footer />
  </div>
);

export default Layout;
