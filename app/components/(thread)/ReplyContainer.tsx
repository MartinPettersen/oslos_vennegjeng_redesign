'use client'
import { Thread } from '@/types/Thread';
import React, { useEffect, useState } from 'react'
import ReplyDisplay from './ReplyDisplay';

type Props = {
    thread: Thread,
}

const ReplyContainer = ({thread}: Props) => {



  return (
    <div>{thread!.replies.map((reply) => (
        <ReplyDisplay postId={reply} />
    ))}</div>
  )
}

export default ReplyContainer