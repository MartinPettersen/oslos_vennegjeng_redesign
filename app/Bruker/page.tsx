"use client";
import React from "react";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const page = () => {
  const { data: session }: any = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/Bruker");
    },
  });

  return (
    <div className="flex w-screen sm:w-full  h-full  items-start sm:items-center p-2 justify-center  text-sky-300 text-xl font-bold">
      <div className="h-[30%] w-[80%] sm:h-[60%] sm:w-[60%] rounded-xl bg-white flex flex-col items-center justify-center gap-4">
        <h1>Bruker Side</h1>
        <p>Email: {session?.user?.email}</p>
        <p>Navn: {session?.user?.name}</p>
        <p>Status: {session?.user?.role}</p>
      </div>
    </div>
  );
};

export default page;
