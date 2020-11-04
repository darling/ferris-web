import { useRouter } from "next/router";
import SidebarEntry from "./SidebarEntry";

interface Props {
  entries: { name: string; path?: string }[];
}

const Sidebar = ({ entries }: Props) => {
  const router = useRouter();
  return (
    <>
      {entries.map((entry) => {
        return (
          <SidebarEntry
            name={entry.name}
            path={router.asPath + entry.path || "/"}
          />
        );
      })}
    </>
  );
};

export default Sidebar;
