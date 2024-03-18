import React from 'react'
import { Report } from "@/types/Report";

type Props = {
    reports?: Report[]
}

const ReportContainer = ({reports}: Props) => {
  return (
    <div className='bg-white bg-opacity-30 rounded-xl flex items-start sm:items-center justify-center w-[90%] h-[90%]'>
        <div className='font-bold text-3xl'>Rapporter</div>
        <p>{`Det er ${reports?.length}`}</p>
    </div>
  )
}

export default ReportContainer