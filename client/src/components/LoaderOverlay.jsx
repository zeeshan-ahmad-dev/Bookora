import React from "react";

const LoaderOverlay = ({ text }) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm z-[1000]">
      <div className="size-12 bg-white rounded-full animate-spin relative mb-2 mr-2">
        <div className="size-5 bg-primary rounded-full translate-x-[10px]"></div>
      </div>
      {text && <p className="text-white text-sm">{text}</p>}
    </div>
  );
};

export default LoaderOverlay;
