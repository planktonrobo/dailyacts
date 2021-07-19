import { useState } from "react";


const LinkButton = ({ link }) => {
  const [open, setOpen] = useState(false)
  function serialize(obj) {
    let str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(obj[p]);
      }
    return str;
  }
  function handle() {
    setOpen(true)
    navigator.clipboard.writeText(serialize({ link }));
    setTimeout(() => {
      setOpen(false);
    }, 1000);
  }
  return (
    <>
      {open && <div
        className="fixed top-20 z-40 left-2/3 bg-green-100 border-t-4 text-xs sm:text-sm border-green-500 rounded-b text-green-900 px-4 py-3 shadow-md"
        role="alert"
      >
        <div className="flex justify-start items-center">
          <div className="pr-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </svg>
          </div>
          <div>
            <p className="font-bold">Link copied!</p>
          </div>
        </div>
      </div>}
      <button className="py-2 px-2 rounded w-full hover:bg-red-100 dark:hover:bg-gray-900" onClick={handle}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
          />
        </svg>
      </button>
    </>
  );
};

export default LinkButton;
