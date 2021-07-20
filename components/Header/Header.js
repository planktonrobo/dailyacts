import Link from "next/link";
import MyDropdown from "./MyDropdown";

const Header = () => {
  return (
    <header className="z-40 bg-red-50 fixed w-full h-20 border-b border-red-100 mb-8 dark:bg-gray-900 dark:border-white">
      <div className="container mx-auto max-w-screen-lg h-full">
        <div className="flex justify-center h-full">
          <div className="text-gray-700 text-center flex items-center align-items">
           
              <Link href="/" aria-label="Daily Acts logo">
                <a>
                  <h1 className="logo text-gray-900 dark:text-white text-3xl">The Daily Acts</h1>
                </a>
              </Link>
       
          </div>
          <span className=" fixed flex right-4 md:right-20 justify-end align-items pt-6 px-5 dark:text-white">
           <MyDropdown/>
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
