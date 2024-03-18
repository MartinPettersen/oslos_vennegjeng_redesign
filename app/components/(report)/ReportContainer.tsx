import React from 'react'
import { Report } from "@/types/Report";
import ReportCard from './ReportCard';

type Props = {
    reports?: Report[]
}

const ReportContainer = ({reports}: Props) => {
  return (
    <div className='bg-white text-slate-500 bg-opacity-30 rounded-xl flex gap-2 sm:gap-4 flex-col items-center sm:items-center justify-start sm:justify-center w-[90%] h-[90%]'>
        <div className='font-bold text-3xl'>Rapporter</div>
        <p>{`Det er ${reports?.length} rapporter som venter`}</p>
        {reports?.map((report, index) => (
            <ReportCard report={report} key={index}/>
        ))}
    </div>
  )
}

export default ReportContainer