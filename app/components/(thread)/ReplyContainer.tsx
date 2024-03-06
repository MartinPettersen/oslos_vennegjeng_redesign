'use client'
import { Thread } from '@/types/Thread';
import React, { useEffect, useState } from 'react'
import ReplyDisplay from './ReplyDisplay';

type Props = {
    thread: Thread,
}

const ReplyContainer = ({thread}: Props) => {



  return (
    <div className='flex flex-col gap-4 w-full'>{thread!.replies.map((reply) => (
        <ReplyDisplay postId={reply} />
    ))}</div>
  )
}

export default ReplyContainer