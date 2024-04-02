import Link from "next/link";
import React from "react";
import Image from "next/image";
import SearchComboBox from "./SearchComboBox";

const Navbar = () => {
  return (
    <header className="w-full">
      <div className="h-16 container items-center py-4 w-full flex">
        <nav className="flex items-center flex-grow justify-between">
          <div className="flex xl:space-x-10 space-x-4 items-center">
            <Link href="/">
              <div className="items-center justify-center flex flex-row">
                <Image
                  src="/logo.svg"
                  alt="logo"
                  width={47}
                  height={20}
                  className="object-contain mr-1"
                />
                <p className="text-white text-lg font-bold hidden xl:flex">
                  AnimeVault
                </p>
              </div>
            </Link>
            <Link href="/home" className="text-zinc-400 hover:text-white">
              Home
            </Link>
          </div>
          <div className="align-end">
            <SearchComboBox />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
