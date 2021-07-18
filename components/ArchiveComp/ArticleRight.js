/* eslint-disable @next/next/no-img-element */
import React from "react";
import {handleDate} from '../../helpers'
const ArticleRight = ({article}) => {
  return (
    <div className="relative z-10">
      <img
        src={article.article.image}
        alt=""
        className="h-24 w-28 sm:w-32 sm:h-28 object-cover rounded-xl shadow-lg xs:absolute md:mx-auto md:left-0 md:right-0"
      />
      <div className="z-10 relative pt-2 md:pt-0 xs:pl-28  md:w-1/2 md:ml-auto md:pl-16">
        <div className="p-6 rounded-3xl bg-red-50 shadow-lg dark:bg-gray-800 dark:text-white">
          <span className="font-bold dark:text-indigo-400 text-indigo-600 text-sm tracking-wide">
            {handleDate(article.published)}
          </span>
          <h1 className="text-lg sm:text-xl font-bold pt-1">{article.article.title}</h1>
          <p className="pt-1 text-xs sm:text-sm">
            {article.article.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ArticleRight;
