import Link from "next/link";
import React from "react";
import Image from "next/image";

const Navbar = () => {
  return (
    <header className="w-full">
      <div className="h-16 container items-center py-4 w-full">
        <nav className="flex items-center space-x-10">
          <Link href="/">
            <div className="items-center justify-center flex flex-row">
              <Image
                src="/logo.svg"
                alt="logo"
                width={47}
                height={20}
                className="object-contain mr-1"
              />
              <p className="text-white text-lg text-bold">AnimeVault</p>
            </div>
          </Link>
          <Link href="/home" className="text-zinc-400 hover:text-white">
            Home
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
