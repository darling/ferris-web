import { useContext } from "react";
import ControlPanel from "../../../components/ControlPanel";
import { GuildContext } from "../../../contexts/guild";

const ControlWarns = () => {
  const guild = useContext(GuildContext);

  return (
    <ControlPanel>
      <p>Warning Page</p>
      <pre>
        <code>{JSON.stringify(guild, null, 4)}</code>
      </pre>
    </ControlPanel>
  );
};

export default ControlWarns;
