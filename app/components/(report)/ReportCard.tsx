import { Report } from "@/types/Report";
import React, { useState } from "react";

import { TrashIcon } from "@heroicons/react/20/solid";
import { EyeIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { Post } from "@/types/Post";
import { Thread } from "@/types/Thread";

type Props = {
    report: Report;
  };

  
const ReportCard = ({report}: Props) => {
  return (
    <div className="bg-white p-4 rounded-xl w-[90%] sm:w-[30%] flex">
        <div className="text-purple-300 flex flex-col gap-1"><div className="flex gap-1">{report.userName} <p className="text-sky-300">har rapportert en</p> {report.subjectType}</div> <div className="flex gap-1"> <p className="text-sky-300">for:</p> {report.reason} </div></div>
    </div>
  )
}

export default ReportCard