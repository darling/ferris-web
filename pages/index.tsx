import Link from "next/link";
import Layout from "../components/Layout";
import { useAuth } from "../contexts/auth";

const IndexPage = () => {
  const user = useAuth();

  return (
    <Layout
      title={
        (user ? user.displayName + " " : "Home") +
        "| Next.js + TypeScript Example"
      }
    >
      <section className="h-64 flex flex-col">
        <main className="mt-10 px-4 text-left">
          <h1 className="text-4xl font-extrabold">
            Ferris is a Discord bot for keeping communities safe.
          </h1>
        </main>
      </section>
    </Layout>
  );
};

export default IndexPage;
