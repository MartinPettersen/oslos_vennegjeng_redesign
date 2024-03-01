import Link from "next/link";
import React from "react";

type Forum = {
  label: String;
  status: String;
  threads: [];
};

type Props = {
  forum: Forum;
};

const ForumDisplay = ({ forum }: Props) => {
  return (
    <Link href={`../Forum/${forum.label}`} className="p-2 bg-blue-500 w-[90%]">
      <div>{forum.label}</div>
      <div>Tråder: {forum.threads.length}</div>
    </Link>
  );
};

export default ForumDisplay;
