import { useRouter } from "next/router";
import SidebarEntry from "./SidebarEntry";

interface Props {
  guildIcon?: string;
  guildName?: string;
  entries: { name: string; path?: string }[];
  className?: string;
}

const Sidebar = ({ entries, guildIcon, guildName }: Props) => {
  const router = useRouter();

  return (
    <div className="flex-col md:w-1/5 md:mt-10">
      <img
        src={
          guildIcon
            ? `https://cdn.discordapp.com/icons/${
                router.query.id || "601618014252826624"
              }/${guildIcon}.${guildIcon.startsWith("_a") ? "gif" : "png"}`
            : "/img/placeholder-crystal.png"
        }
        className="ml-4 w-12 h-12 rounded-md"
      />
      <h1 className="pl-2 mt-2 mx-2 text-xl font-bold leading-relaxed">
        {guildName || "Control Panel"}
      </h1>
      <div
        className={
          "flex flex-col md:mr-2 md:mt-2 pb-2 bg-gray-800 rounded-xl shadow-2xl"
        }
      >
        {entries.map((entry) => {
          return (
            <SidebarEntry
              key={entry.name}
              name={entry.name}
              path={entry.path}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
