const Nav = ({ active, setActive }) => {
  return (
    <div className="flex justify-center divide-y divide-gray-100">
      <nav className="p-4">
        <ul className="flex space-x-2">
          <li>
            <button
              onClick={() => setActive("archives")}
              className="text-gray-700 block px-4 py-2 rounded-md font-bold dark:text-gray-200 "
            >
              <div
                className={`flex  ${
                  active === "archives"
                    ? "border-b-4 border-gray-700 dark:border-gray-100"
                    : "border-b-4 border-red-50 dark:border-gray-900 hover:border-gray-300 dark:hover:border-gray-600"
                }`}
              >
                <span className="pr-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                    />
                  </svg>
                </span>
                Archives
              </div>
            </button>
          </li>
          <li>
            <button
              onClick={() => setActive("explore")}
              className="block px-4 py-2 rounded-md font-bold text-gray-700 dark:text-gray-200"
            >
              <div
                className={`flex  ${
                  active === "explore"
                    ? "border-b-4 border-gray-700 dark:border-gray-100"
                    : "border-b-4 border-red-50 dark:border-gray-900 hover:border-gray-300 dark:hover:border-gray-600"
                }`}
              >
                <span className="pr-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </span>
                Explore
              </div>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
