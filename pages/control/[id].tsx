import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FailedAuth } from "../../components/auth/FailedAuth";
import Layout from "../../components/Layout";
import { useAuth } from "../../contexts/auth";
import { Guild } from "../../interfaces";
import app from "../../utils/auth/firebase";

type Props = {
  item?: Guild;
  errors?: string;
};

const ControlPanel = ({ item, errors }: Props) => {
  const router = useRouter();
  const user = useAuth();
  const [guild, setGuild] = useState({});
  const { id } = router.query;

  useEffect(() => {
    console.log("Opening a connection to database");
    const ref = app.database().ref(`guilds/${id}`);
    ref.on("value", (snapshot) => {
      console.log("Got update from database");
      setGuild(snapshot.val());
    });

    return function close() {
      ref.off();
    };
  }, [id]);

  if (errors) {
    return (
      <Layout title="Error | Next.js + TypeScript Example">
        <p>
          <span style={{ color: "red" }}>Error:</span> {errors}
        </p>
      </Layout>
    );
  }

  if (!user) {
    return <FailedAuth />;
  }

  if (!guild) {
    return (
      <Layout title={"Ferris Bot"}>
        <div className="flex justify-center min-h-screen">
          <div className="flex flex-col place-self-center items-center">
            <p className="mb-4">
              Want to add your discord bot? Click the link below!
            </p>
            <a
              className="flex-none bg-green-400 transition duration-200 hover:bg-green-700 text-green-100 py-1 px-2 rounded"
              href={`https://discord.com/api/oauth2/authorize?client_id=637804742935838751&guild_id=${id}&permissions=8&scope=bot&redirect_uri=http://localhost:3000/control`}
            >
              Add Ferris to your Discord Server.
            </a>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title={`${
        item ? item.name : "User Detail"
      } | Next.js + TypeScript Example`}
    >
      <p className="animate-pulse">Placeholder Text</p>
      <p>Guild: {id}</p>
      <pre>
        <code>{JSON.stringify(guild, null, 2)}</code>
      </pre>
    </Layout>
  );
};

export default ControlPanel;
