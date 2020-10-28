import { useRouter } from "next/router";
import axios from "axios";
import app from "../utils/auth/firebase";
import { useEffect } from "react";

const Login = (props: any) => {
  const router = useRouter();

  useEffect(() => {
    if (router.query.code === undefined) return;
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
      });
  });

  return <>Please authenticate somewhere else</>;
};

export default Login;
