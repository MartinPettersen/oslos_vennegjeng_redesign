"use client";
import Reply from "@/app/components/(thread)/Reply";
import ThreadContent from "@/app/components/(thread)/ThreadContent";
import React, { useEffect, useState } from "react";

type Props = {
  params: { thread: string };
};

const page = ({ params }: Props) => {
  const threadId = params.thread;

  const [thread, setThread] = useState();
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
    <div className="flex justify-center w-screen items-center ">
      <div className="bg-slate-300 p-4 w-full sm:w-[60%] flex">
        {winReady ? (
          <div className="w-full  sm:p-4">
            <ThreadContent thread={thread!} />
            <Reply thread={thread!}/>
            <div>{thread!.replies.length}</div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default page;
