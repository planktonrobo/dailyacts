import { Menu } from "@headlessui/react";
import EditArchive from './EditArchive'
import { useContext } from "react";
import FirebaseContext from "../../context/firebase";
import LinkButton from "../ArchiveComp/LinkButton";
const More = ({ archive }) => {
  const { firebase } = useContext(FirebaseContext);
  async function handleDelete() {
    return await firebase
      .firestore()
      .collection("archives")
      .doc(archive.docId)
      .delete()
      .catch((e) => alert(e.message));
  }
  return (
    <Menu>
      <Menu.Button>
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
            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
          />
        </svg>
      </Menu.Button>
      <Menu.Items className="absolute gap-2 flex flex-col 4-30 origin-top-left px-2 bg-red-50  dark:bg-gray-800   rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        {/* Use the `active` render prop to conditionally style the active item. */}
     <Menu.Item><LinkButton link={`${window.location.host}/archive/${archive.docId}`}/></Menu.Item>

        <Menu.Item>
          <button
            className="py-2 px-2 rounded w-full hover:bg-red-100 dark:hover:bg-gray-900"
            onClick={() => handleDelete()}
          >
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
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </Menu.Item>
        {/* ... */}
      </Menu.Items>
    </Menu>
  );
};

export default More;
