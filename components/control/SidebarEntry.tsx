import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
  name: string;
  path?: string;
}

const SidebarEntry = ({ name, path }: Props) => {
  const router = useRouter();

  let className =
    "rounded p-2 mt-2 mx-2 transition-all duration-100 active:-translate-y-1";
  className +=
    router.asPath + "/" === path
      ? " bg-green-400 text-green-100 shadow-2xl hover:bg-green-300"
      : " bg-gray-900 hover:bg-blue-900 hover:text-green-200";

  return (
    <Link href={"/control/" + router.query.id + (path || "")} replace>
      <a className={className}>{name}</a>
    </Link>
  );
};

export default SidebarEntry;
