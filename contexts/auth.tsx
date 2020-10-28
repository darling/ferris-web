import { useEffect, useState, createContext, useContext } from "react";
import { User } from "../interfaces";
import app from "../utils/auth/firebase";

export const UserContext = createContext<User | null>(null);

const UserContextProvider = (props: any) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    console.log("listeninig for auth state changes");
    app.auth().onIdTokenChanged((userAuth) => {
      console.log("user auth changing " + userAuth?.displayName);
      setUser(userAuth);
    });
  }, [user]);

  return (
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(UserContext);
};

export default UserContextProvider;
