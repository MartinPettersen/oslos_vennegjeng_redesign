"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import ForumDisplay from "./ForumDisplay";
import ForumSelector from "./ForumSelector";

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
    <div className="flex flex-col gap-4  w-[100%] sm:w-[70%] h-[50%] sm:h-[66%]  items-center justify-center">
      <ForumSelector forums={forums}/>
      <div className="flex flex-col gap-4 w-[100%] h-[100%] items-center justify-start overflow-y-auto">
        {winReady
          ? forums.map((forum) => <ForumDisplay forum={forum} />)
          : null}
      </div>
    </div>
  );
}

export default ContainerForum;
