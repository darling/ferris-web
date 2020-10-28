import Link from "next/link";
import HeaderProfile from "./HeaderProfile";

const Header = () => {
  return (
    <header className="relative bg-gray-900">
      <div className="container mx-auto px-4 mc:px-6 py-2 text-green-100">
        <div className="flex flex-row justify-between items-center">
          <Link href="/">
            <img height="30" width="100" src="/img/logo.svg" />
          </Link>
          <nav className="flex-none">
            <Link href="/">
              <a className="mr-3 px-3 py-2 rounded hover:bg-gray-800">Home</a>
            </Link>
            <Link href="/control">
              <a className="mr-3 px-3 py-2 rounded hover:bg-gray-800">
                Documentation
              </a>
            </Link>
            <Link href="/pricing">
              <a className="mr-3 px-3 py-2 rounded hover:bg-gray-800">Plans</a>
            </Link>
            {/* TODO: Make more a dropdown */}
            <Link href="/more">
              <a className="mr-3 px-3 py-2 rounded hover:bg-gray-800">More</a>
            </Link>
          </nav>
          <HeaderProfile />
        </div>
      </div>
    </header>
  );
};

export default Header;
