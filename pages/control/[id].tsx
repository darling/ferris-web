import { redirect } from "next/dist/next-server/server/api-utils";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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

  if (!guild) {
    return (
      <Layout>
        <p>Want to add your discord bot? Too bad!</p>
        <a
          href={`https://discord.com/api/oauth2/authorize?client_id=637804742935838751&guild_id=${id}&permissions=8&scope=bot&redirect_uri=http://localhost:3000/control`}
        >
          Add bot
        </a>
      </Layout>
    );
  }

  return (
    <Layout
      title={`${
        item ? item.name : "User Detail"
      } | Next.js + TypeScript Example`}
    >
      <p>Anything else</p>
      <p>Guild: {id}</p>
      <pre>
        <code>{JSON.stringify(guild, null, 2)}</code>
      </pre>
    </Layout>
  );
};

export default ControlPanel;

// export const getStaticPaths: GetStaticPaths = async () => {
//   // Get the paths we want to pre-render based on users
//   const paths = sampleUserData.map((user) => ({
//     params: { id: user.id.toString() },
//   }));

//   // We'll pre-render only these paths at build time.
//   // { fallback: false } means other routes should 404.
//   return { paths, fallback: false };
// };

// // This function gets called at build time on server-side.
// // It won't be called on client-side, so you can even do
// // direct database queries.
// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   try {
//     const id = params?.id;
//     const item = sampleUserData.find((data) => data.id === Number(id));
//     // By returning { props: item }, the StaticPropsDetail component
//     // will receive `item` as a prop at build time
//     return { props: { item } };
//   } catch (err) {
//     return { props: { errors: err.message } };
//   }
// };
