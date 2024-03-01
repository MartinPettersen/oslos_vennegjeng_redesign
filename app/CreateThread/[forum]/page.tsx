import React from 'react'
import CreateThreadForm from '../../components/(createThread)/CreateThreadForm'

type Props = {
  params: { forum: string };
};

const page = ({ params }: Props) => {
  const forumLabel = params.forum;
  return (
    <div>
        <CreateThreadForm forumLabel={forumLabel}/>
    </div>
  )
}

export default page