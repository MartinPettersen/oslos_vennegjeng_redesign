"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const CreateUserForm = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    password: "",
    email: "",
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

    const res = await fetch("/api/Users", {
      method: "POST",
      body: JSON.stringify({ form }),
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
    <div className="w-full h-full flex sm:items-center justify-center">
      <p className="text-red-700">{errorMessage}</p>
      <form
        onSubmit={handleSubmit}
        method="post"
        className="flex flex-col w-full sm:w-[30%] h-[40%] sm:h-[40%] bg-white p-6 text-sky-300 font-bold gap-4 sm:gap-4"
      >
        <h1 className="flex items-center justify-center">Opprett Bruker</h1>
        <div className="flex justify-between">
          <label>Navn</label>
          <input
            id="name"
            type="text"
            name="name"
            onChange={handleChange}
            required={true}
            value={form.name}
            className=" text-slate-800"
          />
        </div>
        <div className="flex justify-between">
          <label>Epost</label>
          <input
            id="email"
            name="email"
            type="text"
            onChange={handleChange}
            required={true}
            value={form.email}
            className=" text-slate-800 border-b-2 border-purple-300"
          />
        </div>
        <div className="flex justify-between">
          <label>Passord</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={handleChange}
            required={true}
            value={form.password}
            className=" text-slate-800 border-b-2 border-purple-300"
          />
        </div>
        <div className="flex items-center justify-center">
          <input
            type="submit"
            value="Opprett bruker"
            className="bg-slate-700 hover:bg-slate-500 border-4 text-white border-sky-300 hover:border-purple-300 w-[80%] p-4 rounded-full hover:cursor-pointer "
          />
        </div>
      </form>
    </div>
  );
};

export default CreateUserForm;
