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

  const getThread = async () => {
    const forumLabel = forum.label;
    const res = await fetch("/api/GetThreads", {
      method: "POST",
      body: JSON.stringify({ forumLabel }),
      headers: new Headers({ "content-type": "application/json" }),
    });
     console.log("running");
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
    <Link href={`../Forum/${forum.label}`} className="p-2 bg-blue-500 w-[90%]">
      <div>{forum.label}</div>
      <div>Tråder: {forum.threads.length}</div>
      <div>
        {winReady ? (
          <div>
            <h1>Nyeste innlegg:</h1>
            <div>{thread?.headline}</div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </Link>
  );
};

export default ForumDisplay;
