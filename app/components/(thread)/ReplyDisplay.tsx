"use client";
import { Post } from "@/types/Post";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { TrashIcon } from "@heroicons/react/20/solid";
import { PencilIcon } from "@heroicons/react/20/solid";
import EditForm from "./EditForm";

type Props = {
  postId: String;
};

const ReplyDisplay = ({ postId }: Props) => {
  const [post, setPost] = useState<Post>();
  const [winReady, setwinReady] = useState(false);
  const [toggle, setToggle] = useState(false);

  const getPost = async () => {
    const res = await fetch("/api/GetPost", {
      method: "POST",
      body: JSON.stringify({ postId }),
      headers: new Headers({ "content-type": "application/json" }),
    });
    console.log("running");
    console.log(res);
    if (!res.ok) {
      const response = await res.json();
      // console.log(response.message);
    } else {
      const temp = await res.json();
      // console.log(temp);
      console.log(temp.data);
      setPost(temp.data);
      setwinReady(true);
    }
  };

  useEffect(() => {
    console.log("i run");
    getPost();
  }, []);

  const { data: session }: any = useSession({
    required: true,
    onUnauthenticated() {
      //redirect("/api/auth/signin?callbackUrl=/Bruker");
    },
  });

  const handleDelete = async () => {
    console.log("i del");
    const threadId = post?.threadId;
    const res = await fetch("/api/DeletePost", {
      method: "POST",
      body: JSON.stringify({ postId, threadId }),
      headers: new Headers({ "content-type": "application/json" }),
    });

    if (!res.ok) {
      const response = await res.json();
    } else {
    }
  };

  return (
    <div className={`bg-white rounded-xl flex w-[100%] p-4 flex-col  border-2 ${session?.user?.name === post?.userName ? "border-purple-300 text-purple-300" : "border-sky-300 text-sky-300"}`}>
      <div className="flex justify-between items-center">
        <h3 className="font-bold">{post?.userName}</h3>
        {session?.user?.name === post?.userName ? (
          <div className=" flex gap-2">
            <PencilIcon onClick={() => setToggle(!toggle)} className="h-4 w-4  hover:cursor-pointer" />
            <TrashIcon
              onClick={() => handleDelete()}
              className="h-4 w-4 text-red-500 hover:cursor-pointer"
            />
          </div>
        ) : (
          <></>
        )}
      </div>
          {toggle ?  <EditForm post={post!}/> :
      <p>{post?.reply}</p>
    }
    </div>
  );
};

export default ReplyDisplay;
