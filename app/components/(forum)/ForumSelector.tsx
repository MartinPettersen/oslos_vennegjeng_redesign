import { Forum } from '@/types/Forums';
import Link from 'next/link';
import React, { useState } from 'react'

type Props = {
    forums: Forum[];
}

const ForumSelector = ({forums}: Props) => {

    const [toggled, setToggled] = useState(false);

  return (
    <div className='z-10 absolute flex flex-col border-2'>
        {toggled ? forums.map((forum) => 
        
            <Link href={`../Forum/${forum.label}`} className="p-2 bg-blue-500 w-[90%]">{forum.label}</Link>
        )
          : <div className='p-2 bg-slate-950 text-orange-500 cursor-pointer' onClick={() => setToggled(!toggled)}>Velg Forum</div>}
        
    </div>
  )
}

export default ForumSelector