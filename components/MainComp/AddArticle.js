/* eslint-disable @next/next/no-img-element */
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useContext, useEffect } from "react";
import FirebaseContext from "../../context/firebase";

const AddArticle = ({ archive }) => {
  const { firebase, FieldValue } = useContext(FirebaseContext);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(null);
  const [url, setUrl] = useState("");
  const [parserloading, setParserloading] = useState(false);
  const [articleState, setArticleState] = useState(null);
  let [isOpen, setIsOpen] = useState(false);

  function getDatefromUrl() {
    let linkDate = url?.match(/\d{4}(?:\/\d{2})*/);
    const ass =
      linkDate &&
      String(linkDate)
        .replaceAll("/", "-")
        .slice(0, 10);
    return ass;
  }

  function validURL(str) {
    let a = document.createElement("a");
    a.href = str;
    return a.host && a.host != window.location.host;
  }

  function handleChange(event) {
    setUrl(event.target.value);
    error && setError(null);
    articleState && setArticleState(null);
  }

  function closeModal() {
    setIsOpen(false);
    setArticleState(null);
    setUrl("");
    setLoading(false);
    setError(null);
  }

  function openModal() {
    setIsOpen(true);
  }

  const parse = firebase.functions().httpsCallable("parse");

  async function send() {
    setArticleState(null);
    setParserloading(true);
    try {
      const article = await parse({
        url: url,
      });
      setArticleState(article.data?.article);
      article.data &&
        !article.data.article &&
        setError("Could not parse this web page");
    } catch (e) {
      alert(e.message);
    }
    setParserloading(false);
  }

  useEffect(() => {
    async function dewit() {
      if (validURL(url)) {
        await send();
        setDate(getDatefromUrl());
      } else {
        setError("Not a valid URL");
      }
    }
    if (url) {
      dewit();
    }
  }, [url]);

  async function handleSubmit() {
    setLoading(true);
    try {
      await firebase
        .firestore()
        .collection("archives")
        .doc(archive.docId)
        .update({
          articles: FieldValue.arrayUnion(url),
          updated: FieldValue.serverTimestamp(),
        });
      firebase
        .firestore()
        .collection("articles")
        .where("archive", "==", archive.docId)
        .where("url", "==", url)
        .get()
        .then((result) => {
          const ref = result.docs.map((item) => item.data());
          if (ref.length === 0) {
            const dater = articleState.published
              ? articleState.published
              : date;
            const ya = dater ? new Date(dater) : new Date();
            firebase
              .firestore()
              .collection("articles")
              .add({
                url: url,
                archive: archive.docId,
                article: articleState,
                published: ya,
              });
            setLoading(false);
            closeModal();
          } else {
            setError("You already have this article in this archive");
            setLoading(false);
          }
        });
    } catch (e) {
      setLoading(false);
      setError(e.message);
    }
  }
  return (
    <>
      <button onClick={openModal}>
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
            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-20" onClose={closeModal}>
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
              <Dialog.Overlay className="fixed inset-0 backdrop-filter backdrop-blur-sm overflow-hidden " />
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
                <div className="text-base sm:text-xl font-semibold py-1 dark:text-white border-b-2 sm:mr-8">
                  Add article to {"'"}
                  {archive.title}
                  {"'"}
                </div>
                <div className="py-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-100"
                    htmlFor="URL"
                  >
                    URL:
                  </label>
                  <div className="flex align-items h-10">
                    <input
                      onChange={handleChange}
                      value={url}
                      type="url"
                      className="w-2/3 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs sm:text-sm"
                      id="url"
                      placeholder="https://www.nytimes.com/todays-beat"
                    />
                    {parserloading && (
                      <span className="px-4">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-10 w-5 dark:text-white text-gray-700"
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
                  </div>
                </div>
                {error && (
                  <span className="text-sm my-0 text-red-400">{error}</span>
                )}
                <div className="grid grid-cols-1 dark:text-gray-100">
                  {articleState && (
                    <>
                      <span className="text-md sm:text-lg">
                        {" "}
                        {articleState.title} - <i>{articleState.source}</i>
                      </span>

                      <img className="py-2" src={articleState.image} alt="" />
                      <span className="text-xs text-gray-400 pb-2">
                        {articleState?.pubished
                          ? articleState.published
                          : getDatefromUrl()}
                      </span>
                    </>
                  )}
                </div>
                <div className="flex justify-end mt-2 space-x-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-red-300 border-2 border-red-200 rounded-md dark:text-gray-100 dark:border-gray-100 dark:hover:bg-gray-500 hover:bg-red-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={
                      loading || parserloading || error || !articleState
                    }
                    className={`inline-flex justify-center align-item px-4 py-2 text-sm font-medium ${
                      loading || parserloading || error || !articleState
                        ? "bg-blue-300 cursor-default"
                        : "bg-blue-400 dark:hover:bg-blue-300 hover:bg-blue-500"
                    } text-blue-50 border border-transparent rounded-md  focus:outline-none`}
                  >
                    {loading && (
                      <span>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-5 w-4 text-white"
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
                    <span>Archive</span>
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

export default AddArticle;
