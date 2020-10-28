import Link from "next/link";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useAuth } from "../../contexts/auth";
import { UserGuilds } from "../../interfaces";
import app from "../../utils/auth/firebase";
import SyntaxHighlighter from "react-syntax-highlighter";
import { gruvboxDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

const ControlIndex = () => {
  const [guilds, setGuilds] = useState<UserGuilds>({});
  const user = useAuth();

  useEffect(() => {
    const ref = app.database().ref(`users/141075183271280641/guilds`);

    ref.once("value", (snapshot) => {
      console.log("fetching user guilds");
      setGuilds(snapshot.val());
    });

    return () => {
      ref.off();
    };
  }, [user]);

  return (
    <Layout title="Control Panel | Next.js + TypeScript Example">
      <div className="p-5">
        <h1 className="font-bold text-4xl">Welcome back!</h1>
        <h3>Please choose which server you'd like to view.</h3>
      </div>
      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-5 rounded-lg">
        {Object.entries(guilds).map((guild) => (
          <Link key={guild[0]} href={`control/${guild[0]}`}>
            <div className="hover:bg-gray-700 hover:text-green-200 hover:shadow-lg transition-all duration-100 h-40 p-4 rounded-xl flex flex-col items-center content-center">
              <img
                src={
                  guild[1].icon
                    ? `https://cdn.discordapp.com/icons/${guild[0]}/${guild[1].icon}.png`
                    : `/img/placeholder-crystal.png`
                }
                className="rounded-full h-24 w-24"
              />
              <p className="mt-3">{guild[1].name}</p>
            </div>
          </Link>
        ))}
      </div>
      {/* <SyntaxHighlighter style={gruvboxDark} language="json">
        {JSON.stringify(guilds, null, 2)}
      </SyntaxHighlighter>
      <SyntaxHighlighter style={gruvboxDark} language="json">
        {JSON.stringify(user, null, 2)}
      </SyntaxHighlighter> */}
      <p>
        <Link href="/">
          <a>Go home</a>
        </Link>
      </p>
    </Layout>
  );
};

export default ControlIndex;
