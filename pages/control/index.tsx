import Link from "next/link";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useAuth } from "../../contexts/auth";
import { UserGuilds } from "../../interfaces";
import app from "../../utils/auth/firebase";
import { FailedAuth } from "../../components/auth/FailedAuth";

function guildIconExtension(hash: string): string {
  return hash.startsWith("a_") ? "gif" : "png";
}
const ControlIndex = () => {
  const [guilds, setGuilds] = useState<UserGuilds>({});
  const user = useAuth();

  useEffect(() => {
    if (!user) {
      console.warn("user not logged in");
      return;
    }
    const ref = app.database().ref(`users/${user.uid}/guilds`);

    ref.once("value", (snapshot) => {
      console.log("fetching user guilds");
      setGuilds(snapshot.val());
    });

    return () => {
      ref.off();
    };
  }, [user]);

  if (!user) {
    return <FailedAuth />;
  }

  return (
    <Layout title="Control Panel | Next.js + TypeScript Example">
      <div className="p-5">
        <h1 className="font-bold text-4xl">
          Welcome back, {user.displayName}!
        </h1>
        <h3>Please choose which server you'd like to view.</h3>
      </div>
      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-5 rounded-lg">
        {Object.entries(guilds).map((guild) => (
          <Link key={guild[0]} href={`control/${guild[0]}`}>
            <div className="hover:bg-gray-700 hover:text-green-200 hover:shadow-lg transition-all duration-100 h-40 p-4 rounded-xl flex flex-col items-center content-center">
              <img
                src={
                  guild[1].icon
                    ? `https://cdn.discordapp.com/icons/${guild[0]}/${
                        guild[1].icon
                      }.${guildIconExtension(guild[1].icon)}`
                    : `/img/placeholder-crystal.png`
                }
                className="rounded-full h-24 w-24"
              />
              <p className="mt-3">{guild[1].name}</p>
            </div>
          </Link>
        ))}
      </div>
      <p>
        <Link href="/">
          <a className="bg-green-300 text-green-900 rounded py-1 px-2">
            Go back
          </a>
        </Link>
      </p>
    </Layout>
  );
};

export default ControlIndex;
