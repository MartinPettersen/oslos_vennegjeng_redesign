import { Report } from "@/types/Report";
import React, { useState } from "react";

import { TrashIcon } from "@heroicons/react/20/solid";
import { EyeIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { Post } from "@/types/Post";
import { Thread } from "@/types/Thread";

type Props = {
  report: Report;
};

const ReportCard = ({ report }: Props) => {
  const [toggleDelete, setToggleDelete] = useState(false);

  const [post, setPost] = useState<Post>();
  const [thread, setThread] = useState<Post>();

  
  const getPost = async (report: Report) => {
    const postId = report.subjectId;
    const res = await fetch("/api/GetPost", {
      method: "POST",
      body: JSON.stringify({ postId }),
      headers: new Headers({ "content-type": "application/json" }),
    });
    if (!res.ok) {
      const response = await res.json();
      console.log(response.message);
    } else {
      const temp = await res.json();
      setPost(temp.data);
      deletePost(report, temp.data);

    }
  };

  const getThread = async (report: Report) => {
    const threadId = report.subjectId;
    const res = await fetch("/api/GetThread", {
      method: "POST",
      body: JSON.stringify({ threadId }),
      headers: new Headers({ "content-type": "application/json" }),
    });
    if (!res.ok) {
      const response = await res.json();
      console.log(response.message);
    } else {
      const temp = await res.json();
      setThread(temp.data);
      deleteThread(report, temp.data);
    }
  };

  const handleDelete = async (report: Report) => {
    setToggleDelete(false);
    if (report.subjectType === "post") {
      getPost(report);
    } else {
      getThread(report);
    }
  };

  
  const deleteThread = async (report: Report, thread: Thread) => {
    const res = await fetch("/api/DeleteThread", {
      method: "POST",
      body: JSON.stringify({ thread }),
      headers: new Headers({ "content-type": "application/json" }),
    });

    if (!res.ok) {
      const response = await res.json();
    } else {
      deleteReport(report);
    }
  };

  const deletePost = async (report: Report, post: Post) => {
    const threadId = post!.threadId;
    const postId = post!.postId;
    const res = await fetch("/api/DeletePost", {
      method: "POST",
      body: JSON.stringify({ postId, threadId }),
      headers: new Headers({ "content-type": "application/json" }),
    });

    if (!res.ok) {
      const response = await res.json();
      console.log(response);
    } else {
      deleteReport(report);
    }
  };

  const deleteReport = async (report: Report) => {
    console.log(report);
    const reportId = report!.reportId;
    const res = await fetch("/api/DeleteReport", {
      method: "POST",
      body: JSON.stringify({ reportId }),
      headers: new Headers({ "content-type": "application/json" }),
    });

    if (!res.ok) {
      const response = await res.json();
      console.log(response);
    } else {
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl w-[90%] sm:w-[30%] flex gap-2 flex-col">
      <div className="text-purple-300 flex flex-col gap-1">
        <div className="flex gap-1">
          {report.userName} <p className="text-sky-300">har rapportert en</p>{" "}
          {report.subjectType}
        </div>{" "}
        <div className="flex gap-1">
          {" "}
          <p className="text-sky-300">for:</p> {report.reason}{" "}
        </div>
      </div>
      <div>
      <div className="flex gap-1">
        {report.subjectType === "post" ? (
          <Link
            href={`../Post/${report.subjectId}`}
            target="_blank"
            rel="noopener noreferrer"
            className=" "
          >
            <EyeIcon className="h-4 w-4 text-sky-300 hover:cursor-pointer" />
          </Link>
        ) : (
          <Link
            href={`../Thread/${report.subjectId}`}
            target="_blank"
            rel="noopener noreferrer"
            className=" "
          >
            <EyeIcon className="h-4 w-4 text-sky-300 hover:cursor-pointer" />
          </Link>
        )}
        <TrashIcon
          onClick={() => setToggleDelete(true)}
          className="h-4 w-4 text-red-500 hover:cursor-pointer"
        />
      </div>
      </div>
      {toggleDelete ? (
        <div className="flex flex-col absolute gap-4 z-1 bg-white rounded-xl border-2 border-purple-400 w-[90%] sm:w-[30%] items-center justify-center p-2">
          <div className="text-red-400 font-bold text-3xl">
            Er du sikker på at du ønsker å slette?
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            <div
              className="text-purple-300 flex items-center justify-center p-2 bg-pink-50 border-2 rounded-xl border-purple-300 cursor-pointer hover:border-purple-400"
              onClick={() => handleDelete(report)}
            >
              JA
            </div>
            <div
              className="text-sky-300 flex items-center justify-center p-2 bg-sky-50 border-2 rounded-xl border-sky-300 cursor-pointer hover:border-sky-400"
              onClick={() => setToggleDelete(false)}
            >
              NEI
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ReportCard;
