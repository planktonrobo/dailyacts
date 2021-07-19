/* eslint-disable @next/next/no-img-element */
import {useEffect, useState} from "react";

import SkeletonRight from "./SkeletonRight";
import SkeletonLeft from "./SkeletonLeft";
import Timeline from "./Timeline";
import Tabler from "./Tabler";
const TimeTable = ({ table, articles, loading, error }) => {


  return (
    <div className="antialiased py-8 ">
      <div className="relative container md:mx-auto px-6 flex flex-col space-y-8 ">
        {table === false && loading && (
          <>
            <div className="absolute z-0 w-2 h-full bg-red-50 dark:bg-gray-800 dark:border-gray-700 shadow-md border left-16 border-red-100 inset-0 md:mx-auto md:right-0 md:left-0">
              <div className="relative right-4 bottom-10 rounded-full dark:bg-gray-800 dark:border-gray-700 bg-red-50 border-red-100 border shadow-sm w-10 h-10 "></div>
            </div>
            <SkeletonRight />
            <SkeletonLeft />
          </>
        )}
        {articles && articles.length ? (
          <>
            {!table ? (
              <>
                <div className="absolute z-0 w-2 h-full bg-red-50 dark:bg-gray-800 dark:border-gray-700 shadow-md border left-16 border-red-100 inset-0 md:mx-auto md:right-0 md:left-0">
                  <div className="relative right-4 bottom-10 rounded-full dark:bg-gray-800 dark:border-gray-700 bg-red-50 border-red-100 border shadow-sm w-10 h-10 "></div>
                </div>
                <Timeline articles={articles} />
              </>
            ) : (
              <Tabler articles={articles} />
            )}
          </>
        ) : articles && !articles.length ? (
          <div className="text-gray-800 dark:text-gray-300 flex justify-center text-2xl md:text-3xl font-bold z-20">
            No articles yet!
          </div>
        ) : null}
        {error && error.message}
      </div>
    </div>
  );
};

export default TimeTable;
