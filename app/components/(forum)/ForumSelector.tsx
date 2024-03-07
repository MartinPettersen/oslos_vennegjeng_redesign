import { Forum } from "@/types/Forums";
import Link from "next/link";
import React, { useState } from "react";

type Props = {
  forums: Forum[];
};

const ForumSelector = ({ forums }: Props) => {
  const [toggled, setToggled] = useState(false);

  return (
    <div className="sm:w-full">
      {toggled ? (
        <>
          <div className="z-1 absolute left-0 top-0 w-screen h-screen" onClick={() => setToggled(!toggled)}></div>
          <div className="z-10 absolute sm:w-[23%] flex flex-col border-2 sm:border-0  border-purple-700 bg-purple-700 sm:bg-white bg-opacity-30 backdrop-blur-md">
            {forums.map((forum) => (
              <Link
                href={`../Forum/${forum.label}`}
                className=" text-sky-300 p-2 pl-7 pr-7 hover:text-purple-300 hover:bg-sky-500 font-bold hover:bg-opacity-80 w-[100%]"
              >
                {forum.label}
              </Link>
            ))}
          </div>
        </>
      ) : (
        null
      )}
        <div
          className=" bg-purple-900 sm:bg-white font-bold p-4 rounded bg-opacity-50 hover:bg-opacity-100 backdrop-blur-md text-sky-300 hover:text-purple-300 cursor-pointer"
          onClick={() => setToggled(!toggled)}
        >
          Velg Forum
        </div>
    </div>
  );
};

export default ForumSelector;
