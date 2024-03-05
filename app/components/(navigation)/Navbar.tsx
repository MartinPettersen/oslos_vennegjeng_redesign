import React from "react";
import Logo from "./Logo";
import Login from "./Login";
import Link from "next/link";

import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

const Navbar = async() => {

    const session = await getServerSession(options);

  return (
    <header className="text-orange-300 flex bg-slate-600 items-center justify-center w-screen sm:h-[10%]">
      <nav className="flex flex-col font-bold sm:flex-row w-full px-8 py-4 items-center justify-between">
        <Logo />
        <div>
            <Link href="/">Hjem</Link>
        </div>
        <div>
            <Link href="/Bruker">Min Side</Link>
        </div>
        <div>
            <Link href="/AdminPage">Admin</Link>
        </div>

        {session ? <div><Link href="/api/auth/signout?callbackUrl=/">Logg ut</Link></div>:<> <div><Link href="/api/auth/signin">Login</Link></div> <div><Link href="/CreateUser">Ny Bruker</Link></div> </>}
      </nav>
    </header>
  );
};

export default Navbar;
