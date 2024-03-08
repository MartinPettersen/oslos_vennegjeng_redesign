import React from "react";
import CreateThreadForm from "../../components/(createThread)/CreateThreadForm";

type Props = {
  params: { forum: string };
};

const page = ({ params }: Props) => {
  const forumLabel = params.forum;
  return (
    <div className="w-screen sm:w-full h-full p-4 flex items-center justify-center ">
      <CreateThreadForm forumLabel={forumLabel} />
    </div>
  );
};

export default page;
