import Link from 'next/link'
import React from 'react'

type Props = {
    postId: String,
}

const PostShare = ({postId}: Props) => {
  return (
     <Link
        href={`../Post/${postId}`} target="_blank" rel="noopener noreferrer"
        className="w-12 rounded-xl text-white font-bold flex items-center justify-center bg-sky-300 hover:bg-purple-700  p-2 hover:text-sky-300 backdrop-blur-md "
      >
        Del
      </Link>
  )
}

export default PostShare