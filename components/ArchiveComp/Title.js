/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState, useContext } from "react";
import UserContext from "../../context/user";
import Head from "next/head";
import AddArticle from "../MainComp/AddArticle";
import LinkButton from "./LinkButton";

const Title = ({
  archive,
  order,
  table,
  setOrder,
  setTable,
  getuser,
  articles,
}) => {
  const [userState, setUser] = useState(null);
  const { user } = useContext(UserContext);
  useEffect(() => {
    async function getUser() {
      let response = await getuser({
        uid: archive?.publisher,
      });
      setUser(response?.data);
    }
    if (archive) {
      getUser();
    }
  }, [archive, getuser]);
  return archive ? (
    <>
      <Head>
        <title>{`${archive.title} - The Daily Acts`}</title>
        <meta
          name="description"
          content={`Archive by ${archive.publisherName}`}
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="p-10 grid-cols-1 md:flex md:justify-center w-full">
        <div className="">
          {archive.emoji && (
            <div className=" text-4xl sm:text-5xl pt-4 pb-4">
              {archive.emoji}
            </div>
          )}
          <div className="md:text-center text-4xl break-words text-gray-800 dark:text-white sm:text-5xl font-bold">
            {archive.title}
          </div>
          <div className="md:flex md:justify-center text-xs text-gray-400 py-2 sm:py-4">
            {userState ? (
              <div className="flex  pt-2 items-center gap-2">
                <div>
                  <img
                    src={userState.userRecord.photoURL}
                    alt={userState.userRecord.displayName}
                    className="w-6 h-6 rounded-full"
                  />
                </div>
                <div>{userState.userRecord.displayName}</div>
              </div>
            ) : (
              <div className="flex  pt-2 items-center gap-2">
                <div>
                  <div className="w-6 h-6 rounded-full bg-gray-400 animate-pulse" />
                </div>
                <div className="h-4 w-32 bg-gray-400 animate-pulse rounded-full" />
              </div>
            )}
          </div>

          <div className="absolute left-2/3 top-1/8 flex gap-3 items-center text-gray-800 dark:text-gray-300">
            {user?.displayName === userState?.userRecord.displayName && (
              <AddArticle archive={archive} user={user} />
            )}

            <>
              <button
                className={`p-1 rounded-xl ${order &&
                  "bg-red-100 dark:bg-gray-700 "}`}
                onClick={() => setOrder((order) => !order)}
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
                    d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                  />
                </svg>
              </button>
              <button
                onClick={() => setTable((table) => !table)}
                className={`p-1 rounded-xl ${table &&
                  "bg-red-100 dark:bg-gray-700 "}`}
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
                    d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </button>{" "}
            </>
          </div>
        </div>
      </div>
    </>
  ) : (
    <div className="p-10 grid-cols-1 flex md:justify-center">
      <div className="flex-none ">
        <div className="animate-pulse h-10 w-10 sm:h-12 sm:w-12 my-4  bg-gray-300 rounded-full"></div>
        <div className="animate-pulse h-10 w-48 sm:h-12 sm:w-72 bg-gray-300 rounded-full"></div>
        <div className="animate-pulse md:flex md:justify-center mb-4 text-xs text-gray-300 py-2 sm:py-4">
          <div className="flex sm:py-2 items-center gap-2">
            <div>
              <div className="w-6 h-6 rounded-full bg-gray-400 animate-pulse" />
            </div>
            <div className="h-4 w-32 bg-gray-400 animate-pulse rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Title;
