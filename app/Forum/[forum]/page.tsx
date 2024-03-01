import Link from "next/link";
import React from "react";

type Props = {
  params: { forum: string };
};

const page = ({ params }: Props) => {
  const forumLabel = params.forum;
  return (
    <div className="flex flex-col bg-slate-500 justify-center items-center gap-4 p-4">
      <div className="bg-red-300 font-bold text-6xl">{forumLabel}</div>
      
      <Link href={`../CreateThread/${forumLabel}`} className="p-4 bg-sky-400">Nytt Innlegg </Link>
    </div>
  );
};

export default page;
