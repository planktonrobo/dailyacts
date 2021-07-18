/* eslint-disable @next/next/no-img-element */
import React from "react";

const SkeletonRight = () => {
  return (
    <div className="relative z-10">
      <div
        className="bg-gray-400 animate-pulse h-24 w-24 sm:w-28 sm:h-28 object-cover rounded-full shadow-xl xs:absolute md:mx-auto md:left-0 md:right-0"
      />
      <div className="z-10 relative pt-2 md:pt-0 xs:pl-28  md:w-1/2 md:ml-auto md:pl-16">
        <div className="p-6 rounded-3xl bg-red-50 shadow-lg dark:bg-gray-800 dark:text-white">
          <span className="font-bold text-indigo-600 text-sm tracking-wide">
            Jan 2021
          </span>
          <h1 className="text-2xl font-bold pt-1">An amazing travel</h1>
          <p className="pt-1">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex iste
            suscipit reiciendis, perferendis vel consequuntur cupiditate ad
            commodi provident, sapiente veniam sed autem.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SkeletonRight;
