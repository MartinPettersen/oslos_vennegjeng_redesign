"use client";
import Reply from "@/app/components/(thread)/Reply";
import ThreadContent from "@/app/components/(thread)/ThreadContent";
import { Thread } from "@/types/Thread";
import React, { useEffect, useState } from "react";

type Props = {
  params: { thread: string };
};

const page = ({ params }: Props) => {
  const threadId = params.thread;

  const [thread, setThread] = useState<Thread>();
  const [winReady, setwinReady] = useState(false);

  const getThread = async () => {
    const res = await fetch("/api/GetThread", {
      method: "POST",
      body: JSON.stringify({ threadId }),
      headers: new Headers({ "content-type": "application/json" }),
    });
    // console.log("running");
    // console.log(res)
    if (!res.ok) {
      const response = await res.json();
      // console.log(response.message);
    } else {
      const temp = await res.json();
      // console.log(temp);
      console.log(temp.data);
      setThread(temp.data);
      setwinReady(true);
    }
  };

  useEffect(() => {
    console.log("i run");
    getThread();
  }, []);

  return (
    <div className="flex justify-center w-screen sm:w-full h-full items-center p-4">
      <div className="bg-white bg-opacity-30  p-4 w-full sm:w-[60%] sm:h-[80%] rounded-xl flex">
        
        {winReady ? (
          <div className="w-full flex flex-col gap-2 overflow-y-auto no-scrollbar sm:p-4 ">
            <ThreadContent thread={thread!} />
            <Reply thread={thread!}/>
            
          </div>
        ) : <div className="animate-pulse font-bold flex text-3xl text-purple-300 w-full items-center justify-center">Loading</div>}
      </div>
    </div>
  );
};

export default page;
