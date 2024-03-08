import { Thread } from "@/types/Thread";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Forum = {
  label: String;
  status: String;
  threads: [];
};

type Props = {
  forum: Forum;
};

const ForumDisplay = ({ forum }: Props) => {
  const [thread, setThread] = useState<Thread>();
  const [winReady, setwinReady] = useState(false);

  const [hovering, setHovering] = useState(false);

  const getThread = async () => {
    const forumLabel = forum.label;
    const res = await fetch("/api/GetThreads", {
      method: "POST",
      body: JSON.stringify({ forumLabel }),
      headers: new Headers({ "content-type": "application/json" }),
    });
    if (!res.ok) {
      const response = await res.json();
    } else {
      const temp = await res.json();

      setThread(temp.data);
      setwinReady(true);
    }
  };

  useEffect(() => {
    getThread();
  }, []);

  return (
    <div
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className=" bg-white flex flex-col text-slate-900 h-full rounded-xl w-[90%]"
    >
      <Link
        href={`../Forum/${forum.label}`}
        className=" bg-sky-300 hover:bg-purple-300 bg-opacity-80 p-2 flex flex-row rounded-t-xl justify-between backdrop-blur-md w-[100%]"
      >
        <h1 className="font-bold">{forum.label}</h1>
        <div>{forum.threads.length}</div>
      </Link>
      <div
        className={`  ${
          hovering ? "sm:block" : "sm:hidden"
        } p-2 bg-opacity-50 backdrop-blur-md w-[100%]`}
      >
        {winReady ? (
          <Link href={`../../Thread/${thread?.id}`} className="flex">
            <div>{thread?.headline}</div>
          </Link>
        ) : (
          <div className="animate-pulse font-bold text-3xl text-pink-300 w-full items-center justify-center">
            Loading
          </div>
        )}
      </div>
    </div>
  );
};

export default ForumDisplay;
