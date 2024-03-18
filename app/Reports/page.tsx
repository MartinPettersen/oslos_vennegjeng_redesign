'use client'

import React, { useEffect, useState } from 'react'
import { Report } from "@/types/Report";
import ReportContainer from '../components/(report)/ReportContainer';

const page = () => {

    const [reports, setReports] = useState<Report[]>();

    const [winReady, setwinReady] = useState(false);
  
    const status = "clear";
  
  
    const getReports = async () => {
      const res = await fetch("/api/GetReports", {
        method: "POST",
        body: JSON.stringify({ status }),
        headers: new Headers({ "content-type": "application/json" }),
      });
      if (!res.ok) {
        const response = await res.json();
        console.log(response.message);
      } else {
        const temp = await res.json();
        setReports(temp.data);
        setwinReady(true);
      }
    };
  
    useEffect(() => {
      getReports();
      setwinReady(true);
    }, []);
  
  
  

  return (
    <div className='pt-4 pb-4 w-screen sm:w-full h-full flex items-start sm:items-center justify-center'>
        {winReady ?
        <ReportContainer reports={reports}/>
        : null}
    </div>
  )
}

export default page