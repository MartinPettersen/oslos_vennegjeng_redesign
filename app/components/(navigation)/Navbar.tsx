import React from "react";
import Logo from "./Logo";
import Login from "./Login";
import Link from "next/link";

import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

const Navbar = async () => {
  const session = await getServerSession(options);

  return (
    <header className="text-sky-300 flex bg-white items-center justify-center w-screen sm:h-[10%] bg-opacity-70 hover:bg-opacity-90 backdrop-blur-md">
      <nav className="flex flex-col font-bold sm:flex-row w-full px-8 py-4 items-center gap-4 sm:justify-between">
        <Logo />
        <div className="flex flex-col sm:flex-row gap-8 sm:gap-0 font-bold text-xl">
          <div>
            <Link href="/" className=" hover:text-sky-400 hover:underline">
              Hjem
            </Link>
          </div>
          <div>
            <Link
              href="/Bruker"
              className=" hover:text-sky-400 hover:underline p-4"
            >
              Min Side
            </Link>
          </div>
          {session?.user?.role === "admin" ? (
            <div>
              <Link
                href="/AdminPage"
                className=" hover:text-sky-400 hover:underline p-4"
              >
                Admin
              </Link>
            </div>
          ) : (
            <></>
          )}

          {session ? (
            <div>
              <Link
                href="/api/auth/signout?callbackUrl=/"
                className=" hover:text-sky-400 hover:underline p-4"
              >
                Logg ut
              </Link>
            </div>
          ) : (
            <>
              {" "}
              <div>
                <Link
                  href="/api/auth/signin"
                  className=" hover:text-sky-400 hover:underline p-4"
                >
                  Login
                </Link>
              </div>{" "}
              <div>
                <Link
                  href="/CreateUser"
                  className=" hover:text-sky-400 hover:underline p-4"
                >
                  Ny Bruker
                </Link>
              </div>{" "}
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
