import { Thread } from "@/types/Thread";
import React from "react";
import ReplyContainer from "./ReplyContainer";

type Props = {
  thread: Thread;
};

const ThreadContent = ({ thread }: Props) => {
  return (
    <div className="flex flex-col bg-slate-400 justify-center gap-4">
      <h1 className="font-bold text-xl">{thread!.headline}</h1>
      <div>{thread!.userName}</div>
      <p>{thread!.content}</p>
      
    </div>
  );
};

export default ThreadContent;
