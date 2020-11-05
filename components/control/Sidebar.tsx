import { useRouter } from "next/router";
import SidebarEntry from "./SidebarEntry";

interface Props {
  entries: { name: string; path?: string }[];
  className?: string;
}

const Sidebar = ({ entries, className }: Props) => {
  return (
    <div className={"flex flex-col md:w-1/5"}>
      {entries.map((entry) => {
        return (
          <SidebarEntry key={entry.name} name={entry.name} path={entry.path} />
        );
      })}
    </div>
  );
};

export default Sidebar;
