import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useContext } from "react";
import NewArchiveName from "./NewArchiveName";
import FirebaseContext from "../../context/firebase";

const NewArchive = ({ user }) => {
  const { firebase, FieldValue } = useContext(FirebaseContext);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
    setError(null);
    setTitle("");
    setChosenEmoji(null);
  }

  function openModal() {
    setIsOpen(true);
  }

  async function handleSubmit() {
    setLoading(true);
    if (!title || !title.trim().length) {
      setError("You need a title!");
      setLoading(false);
    } else {
      try {
        await firebase
          .firestore()
          .collection("archives")
          .add({
            title: title.trim(),
            emoji: chosenEmoji ? chosenEmoji.native : null,
            publisherName: user.displayName,
            publisher: user.uid,
            created: FieldValue.serverTimestamp(),
            articles: [],
          });
        closeModal();
      } catch (e) {
        setError(e.message);
      }
      setLoading(false);
    }
  }

  return (
    <>
     
        <button
          onClick={openModal}
          className="text-xs sm:text-sm border-2 text-red-300 border-red-200 rounded-full px-4 h-8 hover:bg-red-100 dark:border-white dark:text-white dark:hover:bg-gray-700"
        >
          <div className="flex align-items">
            <span className="pb-0 text-red-300 dark:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 sm:h-5 w-4 sm:w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </span>
            <span>New Archive</span>
          </div>
        </button>
    
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed -top-20 z-10 "
          onClose={closeModal}
        >
          <div className=" px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 overflow-y-scroll backdrop-filter backdrop-blur-sm overflow-hidden " />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-lg p-6 my-8 text-left align-middle transition-all transform bg-red-50 dark:bg-gray-800 shadow-xl rounded-2xl">
                <NewArchiveName
                  handleSubmit={handleSubmit}
                  chosenEmoji={chosenEmoji}
                  setChosenEmoji={setChosenEmoji}
                  title={title}
                  setTitle={setTitle}
                  error={error}
                  setError={setError}
                />

                {error && (
                  <span className="text-sm my-0 text-red-400">{error}</span>
                )}
                <div className="flex justify-end mt-2 space-x-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-red-300 border-2 border-red-200 rounded-md dark:text-gray-100 dark:border-gray-100 dark:hover:bg-gray-500 hover:bg-red-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    disabled={loading}
                    onClick={() => handleSubmit()}
                    className="inline-flex justify-center align-item px-4 py-2 text-sm font-medium bg-green-400 text-green-50 border border-transparent rounded-md dark:hover:bg-green-300 hover:bg-green-500 focus:outline-none"
                  >
                    {loading && <span>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    </span>}
                    <span>Create</span>
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default NewArchive;
