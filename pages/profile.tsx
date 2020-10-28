import Layout from "../components/Layout";
import { useAuth } from "../contexts/auth";

const Profile = () => {
  const user = useAuth();

  return <Layout title={`${user?.displayName} | Ferris Bot`}></Layout>;
};

export default Profile;
