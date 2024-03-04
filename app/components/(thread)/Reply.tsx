'use client'
import { Thread } from '@/types/Thread';
import React, { useState } from 'react'
import ReplyForm from './ReplyForm';

type Props = {
  thread: Thread;
};

const Reply = ({thread}: Props) => {

    const [toggle, setToggle] = useState(false);

    

  return (
    <div>
        {toggle ? 
          <>
            <div
              className="w-full h-full fixed top-0 left-0 z-10 "
              onClick={() => setToggle(!toggle)}
            ></div>

            <ReplyForm thread={thread} />
          </>
        :
        <div onClick={() => setToggle(!toggle)} className="p-4 hover:cursor-pointer bg-green-500 flex w-[15%]">Svar</div>

        }
        Reply
    </div>
  )
}

export default Reply