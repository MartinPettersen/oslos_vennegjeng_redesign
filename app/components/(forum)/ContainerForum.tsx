"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import ForumDisplay from "./ForumDisplay";

function ContainerForum() {
  const [forums, setForums] = useState([]);

  const [winReady, setwinReady] = useState(false);

  const status = "clear";

  const getForums = async () => {
    const res = await fetch("/api/GetForums", {
      method: "POST",
      body: JSON.stringify({ status }),
      headers: new Headers({ "content-type": "application/json" }),
    });
    console.log("running");
    if (!res.ok) {
      const response = await res.json();
      console.log(response.message);
    } else {
      const temp = await res.json();
      // console.log(temp);
      console.log(temp.data);
      setForums(temp.data);
      setwinReady(true);
    }
  };

  useEffect(() => {
    console.log("i run");
    getForums();
  }, []);

  /*

      {forums.map((forum) => (
        <div key={forum}>{forum}</div>
      ))}
      */

  return (
    <div className="flex flex-col gap-4 bg-slate-600 w-[100%] p-2 sm:w-[70%] items-center justify-center">
      {winReady ? forums.map((forum) => (
        
            <ForumDisplay forum={forum} />
      )) : null}
    </div>
  );
}

export default ContainerForum;
