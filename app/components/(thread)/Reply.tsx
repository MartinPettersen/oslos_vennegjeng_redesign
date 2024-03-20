"use client";
import { Thread } from "@/types/Thread";
import React, { useState } from "react";
import ReplyForm from "./ReplyForm";
import ReplyContainer from "./ReplyContainer";

type Props = {
  thread: Thread;
};

const Reply = ({ thread }: Props) => {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="flex flex-col gap-8">
      {toggle ? (
        <>
          <div
            className="w-full h-full fixed top-0 left-0 z-10 "
            onClick={() => setToggle(!toggle)}
          ></div>

          <ReplyForm parentId={thread.id} parentType={"thread"} />
        </>
      ) : (
        <div
          onClick={() => setToggle(!toggle)}
          className="p-4 hover:cursor-pointer font-bold text-xl rounded-xl bg-white text-sky-300 hover:text-purple-300 hover:bg-slate-700 flex items-center justify-center w-[15%]"
        >
          Svar
        </div>
      )}
      <div className="flex">
        <ReplyContainer thread={thread} />
      </div>
    </div>
  );
};

export default Reply;
