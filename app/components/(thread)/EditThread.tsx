"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Thread } from "../../../types/Thread";
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

type Props = {
    thread: Thread
}
const EditThread = ({thread}: Props) => {
  const router = useRouter();


  const {data: session}: any = useSession({
    required: true,
    onUnauthenticated() {
        redirect("/api/auth/signin?callbackUrl=/Bruker");
    }
})

  const [form, setForm] = useState({
    id: thread.id,
    headline: thread.headline.toString(),
    userName: thread.userName,
    content: thread.content.toString(),
    forumLabel: thread.forumLabel,
    replies: thread.replies
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: any) => {
    const value = e.target.value;
    const name = e.target.name;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setErrorMessage("");

    const res = await fetch("/api/EditThread", {
      method: "POST",
      body: JSON.stringify({ form, thread }),
      headers: new Headers({ "content-type": "application/json" }),
    });

    if (!res.ok) {
      const response = await res.json();
      setErrorMessage(response.message);
    } else {
      router.refresh();
      router.push("/");
    }
  };

  return (
    <div className=" w-full bg-white h-full flex sm:items-center rounded-xl justify-center">
      <p className="text-red-700">{errorMessage}</p>
      <form
        onSubmit={handleSubmit}
        method="post"
        className="flex flex-col h-[40%] sm:h-[90%] w-[90%] sm:w-[54%]  p-6 text-sky-300 font-bold gap-4 sm:gap-4"
      >
        <h1 className="flex items-center justify-center">Endre Innlegg</h1>
        <h1>
            Navn: {session?.user?.name}
        </h1>

        <div className="flex justify-between">
          <label>Tittel</label>
          <input
            id="headline"
            type="text"
            name="headline"
            onChange={handleChange}
            required={true}
            value={form.headline}
            className=" text-slate-800 border-b-2 border-purple-300"
          />
        </div>
        <div className="flex justify-between">
          <label>Innhold</label>
          <input
            id="content"
            type="text"
            name="content"
            onChange={handleChange}
            required={true}
            value={form.content}
            className=" text-slate-800 border-b-2 border-purple-300"
          />
        </div>
        <div className="flex items-center justify-center">
          <input
            type="submit"
            value="Endre Innlegg"
            className="bg-slate-700 hover:bg-slate-500 border-4 text-white border-sky-300 hover:border-purple-300 w-[80%] p-4 rounded-full hover:cursor-pointer "
          />
        </div>
      </form>
    </div>
  );
};

export default EditThread;
