import React from "react";

const LoadingIndicator = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
    </div>
  );
};

export default LoadingIndicator;
