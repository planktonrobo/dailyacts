import { useEffect, useRef, useState } from "react";
import EmojiButton from "./EmojiButton";
const NewArchiveName = ({ chosenEmoji, setChosenEmoji, title, setTitle, setError, error, handleSubmit}) => {
  const focuser = useRef(null);

  function handleChange(event){
    setTitle(event.target.value)
    error && setError(null)
  }

  useEffect(() => {
    focuser.current.focus();
  }, [focuser]);
  return (
    <>
      {chosenEmoji ? (
        <div>
          <span className="text-3xl">{chosenEmoji.native || chosenEmoji}</span>
          <button
            onClick={() => setChosenEmoji(null)}
            className="fixed text-xs text-red-300 dark:text-gray-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 sm:h-5 sm:w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
      ) : (
        <EmojiButton
          chosenEmoji={chosenEmoji}
          setChosenEmoji={setChosenEmoji}
        />
      )}
     
        <div className="mb-4 pr-20 sm:pr-40">
          <input
            className="focus:outline-none focus:shadow-none bg-red-50 border-b-2 border-gray-500 dark:bg-gray-800 dark:border-gray-300 dark:text-white text-xl sm:text-2xl appearance-none w-full pt-2 text-gray-700 leading-tight font-medium"
            id="username"
            type="text"
            placeholder="Archive Title"
            maxLength={30}
            ref={focuser}
            value={title}
            onChange={handleChange}
            onKeyDown={(event) => event.key === "Enter" && handleSubmit()}
          />
        </div>
  
    </>
  );
};

export default NewArchiveName;
