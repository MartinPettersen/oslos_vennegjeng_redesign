'use client'
import { Post } from '@/types/Post';
import React, { useEffect, useState } from 'react'

type Props = {
    postId: String,
}

const ReplyDisplay = ({postId}: Props) => {

    const [post, setPost] = useState<Post>();
    const [winReady, setwinReady] = useState(false);
  
    const getPost = async () => {
      const res = await fetch("/api/GetPost", {
        method: "POST",
        body: JSON.stringify({ postId }),
        headers: new Headers({ "content-type": "application/json" }),
      });
       console.log("running");
      console.log(res)
      if (!res.ok) {
        const response = await res.json();
        // console.log(response.message);
      } else {
        const temp = await res.json();
        // console.log(temp);
        console.log(temp.data);
        setPost(temp.data);
        setwinReady(true);
      }
    };
  
    useEffect(() => {
      console.log("i run");
      getPost();
    }, []);

  return (
    <div className='bg-slate-800 flex p-4 flex-col text-orange-500'>
        <h3>{post?.userName}</h3>
        <p>{post?.reply}</p>
    </div>
  )
}

export default ReplyDisplay