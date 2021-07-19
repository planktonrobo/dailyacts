import React from "react";
import { formatDistance } from "date-fns";
import More from './More'
import AddArticle from "./AddArticle";
import Link from "next/link";
const IndArchive = ({ archive, user }) => {
  return (
    <div className="grid grid-cols-1 bg-red-50 dark:bg-gray-800 shadow-lg rounded-3xl h-auto w-80 sm:w-72 md:w-68 max-w-full px-8 py-4">
      <div className="flex-none">
        {archive.emoji && <div className="text-3xl pb-1"> <Link href={`/archive/${archive.docId}`}><a >{archive.emoji}</a></Link></div>}
        <div
          className={` break-words text-gray-700 dark:text-gray-50 text-xl antialiased font-semibold ${!archive.emoji && "pt-8"}`}
        >
          <Link href={`/archive/${archive.docId}`}><a >{archive.title}</a></Link>
        </div>
        <div className="text-xs text-gray-400">
          {archive.updated && archive.updated ? (
            <span>
              Updated{" "}
              {formatDistance(archive.updated.seconds * 1000, Date.now())} ago
            </span>
          ) : archive.created && archive.created.seconds ? (
            <span>
              Created{" "}
              {formatDistance(archive.created.seconds * 1000, Date.now())} ago
            </span>
          ) : null}
        </div>
        <div className="flex align-items gap-x-1 pt-2 text-sm text-red-300 dark:text-gray-200">
        <Link href={`/archive/${archive.docId}`}><a className="border-b-2 border-red-50 hover:border-red-200 dark:border-gray-800 dark:hover:border-gray-200">{`${archive.articles.length} articles`}</a></Link>
          <AddArticle archive={archive} user={user}/>
        </div>
      </div>
      <div className="flex justify-end dark:text-gray-400">
        <span className="mt-auto">
          <More archive={archive}/>
        </span>
      </div>
    </div>
  );
};

export default IndArchive;
