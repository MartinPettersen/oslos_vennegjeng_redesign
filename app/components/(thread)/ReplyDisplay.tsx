"use client";
import { Post } from "@/types/Post";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { TrashIcon } from "@heroicons/react/20/solid";
import { PencilIcon } from "@heroicons/react/20/solid";
import EditForm from "./EditForm";
import ThreadShare from "./ThreadShare";
import PostShare from "./PostShare";
import UserNameLink from "./UserNameLink";
import ReportForm from "./ReportForm";
import TimeStamp from "./TimeStamp";
import ReplyForm from "./ReplyForm";

type Props = {
  postId: String;
};

const ReplyDisplay = ({ postId }: Props) => {
  const [post, setPost] = useState<Post>();
  const [winReady, setwinReady] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [toggleReply, setToggleReply] = useState(false);

  const getPost = async () => {
    const res = await fetch("/api/GetPost", {
      method: "POST",
      body: JSON.stringify({ postId }),
      headers: new Headers({ "content-type": "application/json" }),
    });
    console.log(res);
    if (!res.ok) {
      const response = await res.json();
      console.log(response.message);
    } else {
      const temp = await res.json();
      setPost(temp.data);
      setwinReady(true);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  const { data: session }: any = useSession({
    required: true,
    onUnauthenticated() {
      //redirect("/api/auth/signin?callbackUrl=/Bruker");
    },
  });

  const handleDelete = async () => {
    const parentId = post?.parentId;
    const res = await fetch("/api/DeletePost", {
      method: "POST",
      body: JSON.stringify({ postId, parentId }),
      headers: new Headers({ "content-type": "application/json" }),
    });

    if (!res.ok) {
      const response = await res.json();
    } else {
    }
  };

  return (
    <div className="w-full h-full">
      <div
        className={`bg-white rounded-xl flex w-[100%] p-4 gap-4 flex-col  border-2 ${
          session?.user?.name === post?.userName
            ? "border-purple-300 text-purple-300"
            : "border-sky-300 text-sky-300"
        }`}
      >
        <div className="flex justify-between items-center">
          <UserNameLink userName={post?.userName} />
          <div className="flex gap-2">
            {winReady ? (
              <ReportForm subjectType="post" subjectId={post!.postId} />
            ) : (
              <></>
            )}
            {session?.user?.name === post?.userName ? (
              <div className=" flex gap-2">
                <PencilIcon
                  onClick={() => setToggle(!toggle)}
                  className="h-4 w-4  hover:cursor-pointer"
                />
                <TrashIcon
                  onClick={() => handleDelete()}
                  className="h-4 w-4 text-red-500 hover:cursor-pointer"
                />
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="flex flex-row justify-between">
          {toggle ? <EditForm post={post!} /> : <p>{post?.reply}</p>}
          <h3 className="font-bold">
            {post?.createdAt === post?.updatedAt ? "" : "[Edited]"}
          </h3>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2">
          <PostShare postId={postId} />
          {toggleReply ? (
              <>
                <div
                  className="w-full h-full fixed top-0 left-0 z-10 "
                  onClick={() => setToggleReply(!toggleReply)}
                ></div>

                <ReplyForm parentId={post!.postId} parentType={"post"}/>
              </>
            ) : (
              <div className="">
                <div
                  onClick={() => setToggleReply(!toggleReply)}
                  className="w-12 rounded-xl text-white font-bold flex items-center justify-center bg-sky-300 hover:bg-purple-700  p-2 hover:text-sky-300 backdrop-blur-md "
                >
                  Svar
                </div>
              </div>
            )}
            </div>
          {winReady ? <TimeStamp time={post!.createdAt} /> : <></>}
        </div>
      </div>
      <div className="flex w-full flex-row gap-1 pl-4">
        {post?.children ? (
          <div className="flex flex-col w-full">
            {post?.children.map((childId) => (
                <ReplyDisplay postId={childId} />
            ))}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default ReplyDisplay;
