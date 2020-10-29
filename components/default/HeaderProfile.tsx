import Link from "next/link";
import { useAuth } from "../../contexts/auth";

const HeaderProfile = () => {
  const user = useAuth();

  if (user) {
    return (
      <div className="flex flex-row items-center">
        <Link href="/control">
          <div className="hover:bg-gray-100 hover:text-green-900 cursor-pointer bg-gray-300 text-gray-900 rounded py-1 px-2 mr-3 flex flex-row items-center">
            <a className="">Control Panel</a>
            <svg
              className="w-5 h-5 ml-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </Link>
        <Link href="/profile">
          <div className="select-none cursor-pointer flex flex-row items-center p-1 rounded transition duration-200 hover:bg-gray-800">
            <img
              className="rounded mr-3"
              width="30"
              height="30"
              src={user.photoURL}
            />
            <p className="mr-2">{user.displayName}</p>
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <a
        className="bg-green-500 hover:text-black hover:bg-green-100 hover:shadow-2xl transition duration-100 rounded-lg px-3 py-2"
        href="/api/login"
      >
        Sign in
      </a>
    </div>
  );
};

export default HeaderProfile;
