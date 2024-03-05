import { Thread } from "@/types/Thread";
import React from "react";
import ReplyContainer from "./ReplyContainer";
import { TrashIcon } from "@heroicons/react/20/solid";
import { PencilIcon } from "@heroicons/react/20/solid";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Props = {
  thread: Thread;
};

const ThreadContent = ({ thread }: Props) => {
  const router = useRouter();


  const { data: session }: any = useSession({
    required: true,
    onUnauthenticated() {
      //redirect("/api/auth/signin?callbackUrl=/Bruker");
    },
  });

  const handleDelete = async () => {
    console.log("i del")
    const res = await fetch("/api/DeleteThread", {
      method: "POST",
      body: JSON.stringify({ thread}),
      headers: new Headers({ "content-type": "application/json" }),
    });

    if (!res.ok) {
      const response = await res.json();
    } else {
      router.refresh();
      router.push("/");
    }
  };

  return (
    <div className="flex flex-col bg-slate-400 justify-center gap-4">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-xl">{thread!.headline}</h1>
        {session?.user?.name === thread?.userName ? (
          <div className=" flex gap-2">
            <PencilIcon className="h-4 w-4 hover:cursor-pointer" />
            <TrashIcon
              onClick={() => handleDelete()}
              className="h-4 w-4 text-red-500 hover:cursor-pointer"
            />
          </div>
        ) : (
          <></>
        )}
      </div>
      <div>{thread!.userName}</div>
      <p>{thread!.content}</p>
    </div>
  );
};

export default ThreadContent;
