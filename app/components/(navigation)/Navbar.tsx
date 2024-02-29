import React from "react";
import Logo from "./Logo";
import Login from "./Login";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="text-orange-300 flex bg-slate-600 items-center justify-center w-screen sm:h-[10%]">
      <nav className="flex flex-col sm:flex-row w-full px-8 py-4 items-center justify-between">
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
        <div>
            <Link href="/Login">Login</Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
