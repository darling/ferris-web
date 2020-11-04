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
  title = "Ferris Bot — A Discord bot for protecting your community.",
  colorOverride,
}: Props) => (
  <div className={colorOverride || "bg-gray-900 text-green-100"}>
    <Head>
      <title>{title}</title>
      <meta
        name="description"
        content="Ferris is a high-caliber moderation bot for Discord. Use Ferris to maintain and moderate your Discord server for free!"
      />

      <meta property="og:url" content="https://www.ferrisbot.app" />
      <meta property="og:type" content="website" />
      <meta
        property="og:title"
        content="Ferris Bot — A Discord bot for protecting your community."
      />
      <meta
        property="og:description"
        content="Ferris is a high-caliber moderation bot for Discord. Use Ferris to maintain and moderate your Discord server for free!"
      />
      <meta
        property="og:image"
        content="https://ferrisbot.app/img/Ferris-banner-meta.png"
      />

      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="ferrisbot.app" />
      <meta property="twitter:url" content="https://www.ferrisbot.app" />
      <meta
        name="twitter:title"
        content="Ferris Bot — A Discord bot for protecting your community."
      />
      <meta
        name="twitter:description"
        content="Ferris is a high-caliber moderation bot for Discord. Use Ferris to maintain and moderate your Discord server for free!"
      />
      <meta
        name="twitter:image"
        content="https://ferrisbot.app/img/Ferris-banner-meta.png"
      />

      <meta name="theme-color" content="#9AE6B4" />

      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Header />
    <div className="container mx-auto min-h-screen">{children}</div>
    <Footer />
  </div>
);

export default Layout;
