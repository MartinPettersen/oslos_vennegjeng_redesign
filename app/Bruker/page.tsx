"use client";
import React, { useState } from "react";

import { useSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";

const page = () => {

  const [toggleDelete, setToggleDelete] = useState(false);


  const { data: session }: any = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/Bruker");
    },
  });

  const handleDelete = async () => {
    const userName = session?.user?.name
    const res = await fetch("/api/DeleteUser", {
      method: "POST",
      body: JSON.stringify({ userName }),
      headers: new Headers({ "content-type": "application/json" }),
    });

    if (!res.ok) {
      const response = await res.json();
    } else {
      
      signOut({ callbackUrl: "/" })

    }
  };

  return (
    <div className="flex w-screen sm:w-full  h-full  items-start sm:items-center p-2 justify-center  text-sky-300 text-xl font-bold">
      <div className="h-[30%] w-[80%] sm:h-[60%] sm:w-[60%] rounded-xl bg-white flex flex-col items-center justify-center gap-4">
        <h1>Bruker Side</h1>
        <p>Email: {session?.user?.email}</p>
        <p>Navn: {session?.user?.name}</p>
        <p>Status: {session?.user?.role}</p>
        <div onClick={() => setToggleDelete(true)} className=" bg-gradient-radial from-[#72bcde] hover:from-[#efb4e9] to-[#efb4e9] hover:to-[#72bcde] text-white p-4 rounded-xl cursor-pointer">
          Slett Bruker
        </div>
        {toggleDelete ? (
          <div className="flex flex-col absolute gap-4 z-1 bg-gradient-radial from-[#72bcde] to-[#efb4e9] border-2 border-pink-200 rounded-xl w-[80%] sm:w-[30%] items-center justify-center p-2">
            <div className="text-white font-bold text-3xl">
              Er du sikker på at du ønsker å slette?
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <div
                className="text-purple-400 flex items-center justify-center p-2 bg-white border-2 rounded-xl sm:w-[6rem] border-purple-600 cursor-pointer hover:border-purple-400"
                onClick={() => handleDelete()}
              >
                JA
              </div>
              <div
                className="text-sky-400 flex items-center justify-center p-2 bg-white border-2 rounded-xl sm:w-[6rem] border-sky-600 cursor-pointer hover:border-sky-400"
                onClick={() => setToggleDelete(false)}
              >
                NEI
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default page;
