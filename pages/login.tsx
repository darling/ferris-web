import { useRouter } from "next/router";
import axios from "axios";
import app from "../utils/auth/firebase";
import { useEffect } from "react";
import { useAuth } from "../contexts/auth";
import Layout from "../components/Layout";

const Login = () => {
  const router = useRouter();
  const user = useAuth();

  useEffect(() => {
    if (router.query.code === undefined || user) return;
    console.log("logging in", router.query.code);
    axios
      .post("http://localhost:3000/api/login", { code: router.query.code })
      .then((res) => {
        console.log("Signing in with custom token");
        app
          .auth()
          .signInWithCustomToken(res.data)
          .then((user) => {
            console.log("new User", user);
          });
      })
      .catch((e) => {
        console.error(e);
        alert(`Wasn't able to process that: ${e}`);
        router.push("/");
      });
  }, [router.query.code, user]);

  if (user) {
    router.push("/");
    return <p>Logged In</p>;
  }

  return (
    <Layout>
      <p>Logging in</p>
    </Layout>
  );
};

export default Login;
