"use client";
import Reply from "@/app/components/(thread)/Reply";
import ReplyDisplay from "@/app/components/(thread)/ReplyDisplay";
import ThreadContent from "@/app/components/(thread)/ThreadContent";
import ThreadDisplay from "@/app/components/(thread)/ThreadDisplay";
import { Post } from "@/types/Post";
import { Thread } from "@/types/Thread";
import React, { useEffect, useState } from "react";

type Props = {
  params: { user: string };
};

const page = ({ params }: Props) => {
  const userName = params.user;

  /*
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
  */
  return (
    <div className="flex justify-center w-screen sm:w-full h-full  items-center p-4">
      <div className="bg-white bg-opacity-30 w-[60%] h-[80%] flex items-start justify-center">
        <h1 className="text-3xl font-bold p-4 text-sky-400">{userName}</h1>
      </div>
    </div>
  );
};

export default page;
