import { useContext } from "react";
import ControlPanel from "../../../components/ControlPanel";
import JSONstringify from "../../../components/dev/JSONstringify";
import { GuildContext } from "../../../contexts/guild";

const ControlWarns = () => {
  const guild = useContext(GuildContext);

  return (
    <ControlPanel>
      <p>Warning Page</p>
      <JSONstringify data={guild} />
    </ControlPanel>
  );
};

export default ControlWarns;
