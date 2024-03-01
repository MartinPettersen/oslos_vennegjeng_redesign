import React from 'react'

type Props = {
  params: { forum: string };
};

const page = ({ params }: Props) => {
  const forumLabel = params.forum;
  return (
    <div>{forumLabel}</div>
  )
}

export default page