import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useContext, useEffect } from "react";
import NewArchiveName from "./NewArchiveName";
import FirebaseContext from "../../context/firebase";

const EditArchive = ({ archive }) => {
  const { firebase, FieldValue } = useContext(FirebaseContext);
  const [chosenEmoji, setChosenEmoji] = useState(archive?.emoji);
  const [title, setTitle] = useState(archive?.title);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
    setError(null);
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
          .doc(archive.docId)
          .update({
            title: title.trim(),
            emoji: chosenEmoji ? chosenEmoji.native || chosenEmoji : null,
            updated: FieldValue.serverTimestamp(),
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
        className="py-2 px-2 rounded w-full hover:bg-red-100 dark:hover:bg-gray-900"
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
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-10 " onClose={closeModal}>
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
              <Dialog.Overlay className="fixed inset-0 overflow-y-scroll backdrop-filter backdrop-blur-sm overflow-x-hidden " />
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
                    {loading && (
                      <span>
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
                      </span>
                    )}
                    <span>Update</span>
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

export default EditArchive;
