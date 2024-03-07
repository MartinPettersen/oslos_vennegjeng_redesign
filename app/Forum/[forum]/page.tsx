"use client";
import ThreadDisplay from "@/app/components/(thread)/ThreadDisplay";
import { Forum } from "@/types/Forums";
import { Thread } from "@/types/Thread";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Props = {
  params: { forum: string };
};

const page = ({ params }: Props) => {
  const forumLabel = params.forum;

  const [forum, setForum] = useState<Forum>();
  const [winReady, setwinReady] = useState(false);

  const getForum = async () => {
    const res = await fetch("/api/GetForum", {
      method: "POST",
      body: JSON.stringify({ forumLabel }),
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
      setForum(temp.data);
      setwinReady(true);
    }
  };

  useEffect(() => {
    console.log("i run");
    getForum();
  }, []);

  return (
    <div className=" flex justify-center w-screen sm:h-full sm:w-full  items-center ">
      <div className="flex flex-col rounded-lg m-4 p-4 bg-white bg-opacity-40 sm:w-[70%] sm:h-[70%] items-center sm:items-start  justify-center sm:justify-start gap-4">
        <div className=" w-[60%] text-sky-500  p-4 sm:w-[100%] flex items-center justify-center sm:items-start sm:justify-start font-bold text-6xl">
          {forumLabel}
        </div>

        <Link
          href={`../CreateThread/${forumLabel}`}
          className="w-[40%] flex p-4 items-center justify-center bg-white rounded-xl bg-opacity-70 hover:bg-slate-700 sm:items-start sm:justify-start backdrop-blur-md text-sky-300 text-xl hover:text-purple-300"
        >
          Nytt Innlegg{" "}
        </Link>
        <div className="w-full flex flex-col overflow-y-auto no-scrollbar gap-4 items-center justify-center sm:items-start sm:justify-start">
          {winReady
            ? forum!.threads.map((thread: any) => (
                <div className="bg-white rounded-xl hover:bg-slate-700 hover:text-purple-300  flex flex-col p-4 w-[80%] sm:w-[80%]">
                  <ThreadDisplay threadId={thread} />
                  
                </div>
              ))
            : <div className="animate-pulse  flex font-bold text-3xl text-sky-300 w-full items-center justify-center">Loading</div>}
        </div>
      </div>
    </div>
  );
};

export default page;
