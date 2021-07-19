import React from "react";

const ArchiveSkeleton = () => {
  return (
    <div className="grid grid-cols-1 bg-red-50 dark:bg-gray-800 shadow-lg rounded-3xl h-44 w-80 sm:w-72 md:w-68 max-w-full px-8 py-4">
      <div className="flex-none">
        <div className="mt-1 h-9 w-9 bg-gray-400 rounded-full mb-3 animate-pulse"></div>
        <div className="h-6 w-32 bg-gray-400 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default ArchiveSkeleton;
