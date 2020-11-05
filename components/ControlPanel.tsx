import { useContext } from "react";
import { useAuth } from "../contexts/auth";
import { GuildContext } from "../contexts/guild";
import Sidebar from "./control/Sidebar";
import Layout from "./Layout";

const ControlPanel = (props: any) => {
  const guild = useContext(GuildContext);
  const user = useAuth();
  // const router = useRouter();

  if (!user) {
    alert("No auth");
    return <Layout>Not authenticated</Layout>;
  }

  if (user && !guild) {
    return <Layout>Loading</Layout>;
  }

  return (
    <Layout>
      <div className="flex flex-col md:flex-row">
        <Sidebar
          entries={[
            { name: "Home" },
            { name: "Config", path: "/config" },
            { name: "Warns", path: "/warns" },
          ]}
        />
        <div>{props.children}</div>
      </div>
    </Layout>
  );
};

export default ControlPanel;
