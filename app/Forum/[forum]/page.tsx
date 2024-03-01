"use client";
import ThreadDisplay from "@/app/components/(thread)/ThreadDisplay";
import { Thread } from "@/types/Thread";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Props = {
  params: { forum: string };
};

const page = ({ params }: Props) => {
  const forumLabel = params.forum;

  const [forum, setForum] = useState([]);
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
    <div className=" bg-slate-500 justify-center w-screen items-center ">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="bg-red-300 w-[60%] p-4 sm:w-[40%] flex items-center justify-center font-bold text-6xl">
          {forumLabel}
        </div>

        <Link
          href={`../CreateThread/${forumLabel}`}
          className="w-[40%] flex p-4 items-center justify-center bg-sky-400"
        >
          Nytt Innlegg{" "}
        </Link>
        <div className="w-full flex flex-col gap-4 items-center justify-center">
          {winReady
            ? forum.threads.map((thread: any) => (
                <div className="bg-slate-300 flex flex-col p-4 w-[80%] sm:w-[40%]">
                  <ThreadDisplay threadId={thread} />
                  
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default page;
