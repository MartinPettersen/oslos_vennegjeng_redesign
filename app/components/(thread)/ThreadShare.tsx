import React from "react";

const ThreadShare = () => {
  const handleCopy = async (url: string) => {
    return await navigator.clipboard.writeText(url);
  };

  return (
    <div
      onClick={() => handleCopy(window.location.href)}
      className="bg-sky-300 flex rounded w-8 items-center justify-center hover:bg-sky-500 text-white font-bold cursor-pointer"
    >
      Del
    </div>
  );
};

export default ThreadShare;
