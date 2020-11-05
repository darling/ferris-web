import { useContext } from "react";
import ControlPanel from "../../../components/ControlPanel";
import JSONstringify from "../../../components/dev/JSONstringify";
import { GuildContext } from "../../../contexts/guild";

const ControlBox = (props: any) => {
  return (
    <div className={`bg-gray-800 p-3 rounded-md mr-3 ${props.className}`}>
      <h5 className="text-sm tracking-wider">{props.title}</h5>
      <h4 className="text-3xl font-bold">{props.value}</h4>
    </div>
  );
};

const ControlHome = () => {
  const guild = useContext(GuildContext);
  return (
    <ControlPanel>
      <h1 className="font-bold tracking-wide align-middle text-4xl text-green-200">
        {"Control Home"}
      </h1>
      <div className="flex flex-row w-full">
        <ControlBox
          className="w-1/3"
          title="Member Count"
          value={guild?.member_count}
        />
        <ControlBox
          className="w-1/3"
          title="Member Count"
          value={guild?.member_count}
        />
        <ControlBox
          className="w-1/3"
          title="Member Count"
          value={guild?.member_count}
        />
      </div>
      <JSONstringify data={guild} />
    </ControlPanel>
  );
};

export default ControlHome;
