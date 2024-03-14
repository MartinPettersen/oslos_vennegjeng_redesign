"use client";
import Reply from "@/app/components/(thread)/Reply";
import ReplyDisplay from "@/app/components/(thread)/ReplyDisplay";
import ThreadContent from "@/app/components/(thread)/ThreadContent";
import ThreadDisplay from "@/app/components/(thread)/ThreadDisplay";
import { Post } from "@/types/Post";
import { Thread } from "@/types/Thread";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Props = {
  params: { user: string };
};

const page = ({ params }: Props) => {
  const userName = params.user;

  const [kommentarer, setKommentarer] = useState(false);
  const [threads, setThreads] = useState<Thread[]>();
  const [posts, setPosts] = useState<Post[]>();
  const [winReady, setwinReady] = useState(false);

  const getUserThreads = async () => {
    console.log("i run");
    const res = await fetch("/api/GetUserThreads", {
      method: "POST",
      body: JSON.stringify({ userName }),
      headers: new Headers({ "content-type": "application/json" }),
    });
    if (!res.ok) {
      const response = await res.json();
      console.log(response.message);
    } else {
      const temp = await res.json();
      setThreads(temp.data);
      console.log(temp.data);
      setwinReady(true);
    }
  };

  const getUserPosts = async () => {
    console.log("i run");
    const res = await fetch("/api/GetUserPosts", {
      method: "POST",
      body: JSON.stringify({ userName }),
      headers: new Headers({ "content-type": "application/json" }),
    });
    if (!res.ok) {
      const response = await res.json();
      console.log(response.message);
    } else {
      const temp = await res.json();
      setPosts(temp.data);
      console.log(temp.data);
      setwinReady(true);
    }
  };

  useEffect(() => {
    getUserThreads();
    getUserPosts();
  }, []);

  return (
    <div className="flex justify-center w-screen sm:w-full h-full  items-center p-4">
      <div className="bg-white bg-opacity-30 w-[90%] sm:w-[60%] h-[80%] flex  flex-col items-center rounded-xl justify-start">
        <h1 className="text-6xl font-bold flex items-center justify-center p-4 text-sky-400">
          {userName}
        </h1>
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-1 justify-start sm:justify-center h-full w-full  sm:w-[90%]">
          <div className="w-[80%] sm:w-1/2 flex flex-col gap-2 items-center border-2 border-purple-200 rounded-md bg-purple-50 justify-center">
            <h2 className="font-bold text-2xl text-purple-300 border-b-2 border-purple-300">
              Tråder
            </h2>

            <div className="flex flex-col w-full items-center justify-center gap-2">
              {threads?.map((thread) => (
                <Link
                  href={`../../Thread/${thread.id}`}
                  className="flex items-center justify-center text-purple-300 hover:text-purple-400 hover:bg-sky-100 w-[98%] rounded-md"
                >
                  <h2 className="font-bold text-md">{thread!.headline}</h2>
                </Link>
              ))}
            </div>
          </div>
          <div className="w-[80%] sm:w-1/2 flex flex-col gap-2 items-center border-2 border-sky-200 rounded-md bg-sky-50 justify-center">
            <h2 className="font-bold text-2xl text-sky-300 border-b-2 border-sky-300">
              Kommentarer
            </h2>
            <div className="flex flex-col w-full items-center justify-center gap-2">
              {posts?.map((post) => (
                <Link
                  href={`../../Post/${post.postId}`}
                  className="flex items-center justify-center text-sky-300 hover:text-sky-400 hover:bg-purple-100 w-[98%] rounded-md"
                >
                  <h2 className="font-bold text-md">{post.reply}</h2>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
