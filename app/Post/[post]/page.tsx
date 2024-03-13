"use client";
import ReplyDisplay from "@/app/components/(thread)/ReplyDisplay";
import React, { useEffect, useState } from "react";

type Props = {
  params: { post: string };
};

const page = ({ params }: Props) => {
  const postId = params.post;

  return (
    <div className="flex justify-center w-full items-center p-4">
      <div className=" p-4 w-full sm:w-[60%] flex">
          <div className="w-full flex flex-col gap-2 sm:p-4 ">
            <ReplyDisplay postId={postId!} />
          </div>
      </div>
    </div>
  );
};

export default page;
