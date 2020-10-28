import Link from "next/link";
import { useAuth } from "../../contexts/auth";

const HeaderProfile = () => {
  const user = useAuth();

  if (user) {
    return (
      <Link href="/profile">
        <div className="select-none cursor-pointer flex flex-row items-center p-1 rounded transition duration-200 hover:bg-gray-800">
          <img
            className="rounded mr-3"
            width="40"
            height="40"
            src={user.photoURL}
          />
          <p className="mr-2">{user.displayName}</p>
        </div>
      </Link>
    );
  }

  return (
    <div>
      <a href="/api/login">Sign in with Discord</a>
    </div>
  );
};

export default HeaderProfile;
