/* eslint-disable @next/next/no-img-element */
import React from "react";

const SkeletonRight = () => {
  return (
    <div className="relative z-10 px-2">
      <div
        className="bg-gray-400 animate-pulse h-24 w-28 sm:w-32 sm:h-28 object-cover rounded-xl shadow-xl xs:absolute md:mx-auto md:left-0 md:right-0"
      />
      <div className="z-10 relative pt-2 md:pt-0 xs:pl-28  md:w-1/2 md:ml-auto md:pl-16">
        <div className="p-6 rounded-3xl bg-red-50 shadow-lg dark:bg-gray-800 dark:text-white">
          <div className="h-4 w-16 bg-gray-400 animate-pulse rounded-full"/>
          <div className="h-5 w-32 bg-gray-400 animate-pulse rounded-full my-3"/>
          <div className="h-3 bg-gray-400 animate-pulse w-full rounded-full pr-4 my-3"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonRight;
