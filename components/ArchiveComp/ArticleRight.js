/* eslint-disable @next/next/no-img-element */
import React from "react";
import { handleDate } from "../../helpers";
import Link from "next/link";
import LinkButton from "./LinkButton";
const ArticleRight = ({ article, handleDelete, user }) => {
  return (
    <div className="relative z-10">
      <Link href={article.article.url} aria-label="original article">
        <a>
          <img
            src={article.article.image}
            alt=""
            className="h-24 w-28 sm:w-32 sm:h-28 object-cover rounded-xl shadow-lg xs:absolute md:mx-auto md:left-0 md:right-0"
          />
        </a>
      </Link>
      <div className="z-10 relative pt-2 md:pt-0 xs:pl-28  md:w-1/2 md:ml-auto md:pl-16">
        <div className="p-6 rounded-3xl bg-red-50 shadow-lg dark:bg-gray-800 dark:text-white">
          <span className="font-bold dark:text-indigo-400 text-indigo-600 text-sm tracking-wide">
            {handleDate(article.published)}
          </span>
          <Link href={article.article.url} aria-label="original article">
            <a>
              <h1 className="text-lg sm:text-xl font-bold pt-1">
                {article.article.title}
              </h1>
            </a>
          </Link>
          <p className="pt-1 text-xs sm:text-sm">
            {article.article.description}
          </p>
          <div className="text-sm pt-2 flex justify-between pr-2">
            <div>{article.article.source.split(".")[0]}</div>
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
              {user?.uid === article?.uploader && (
                <button
                  className="p-2 rounded w-full hover:bg-red-100 dark:hover:bg-gray-900"
                  onClick={() =>
                    handleDelete(article.docId, article.article.url)
                  }
                >
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
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              )}
              <LinkButton link={article.article.url} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleRight;
