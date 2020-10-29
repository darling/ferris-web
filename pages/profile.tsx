import Layout from "../components/Layout";
import { useAuth } from "../contexts/auth";
import app from "../utils/auth/firebase";

function signOut() {
  app.auth().signOut();
}

const Profile = () => {
  const user = useAuth();

  return (
    <Layout title={`${user?.displayName} | Ferris Bot`}>
      <button onClick={signOut}>Sign Out</button>
    </Layout>
  );
};

export default Profile;
