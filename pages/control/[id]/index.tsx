import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import ControlPanel from "../../../components/ControlPanel";
import { GuildContext } from "../../../contexts/guild";

const ControlHome = () => {
  const guild = useContext(GuildContext);
  const router = useRouter();
  const { id } = router.query;

  return (
    <ControlPanel>
      <p>Home Page</p>
      <Link
        href={`/control/${encodeURIComponent(
          Array.isArray(id) ? id.pop() || "" : id
        )}/warns`}
      >
        Goto other page
      </Link>
      <pre>
        <code>{JSON.stringify(guild, null, 4)}</code>
      </pre>
    </ControlPanel>
  );
};

export default ControlHome;
