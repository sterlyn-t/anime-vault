import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { ArrowRight } from "lucide-react";

function Hero() {
  return (
    <div className="flex flex-col h-[90vh]">
      <header className="bg-hero bg-center bg-cover bg-no-repeat sm:p-16 py-16 px-8 flex justify-center lg:items-center max-lg:flex-col w-full sm:gap-16 gap-0">
        <div className="flex-1 flex flex-col gap-10">
          {/* <Image
            src="/logo.svg"
            alt="logo"
            width={101}
            height={96}
            className="object-contain"
          /> */}
          <h1 className="sm:text-6xl text-5xl text-white lg:max-w-lg font-bold leading-[120%]">
            The <span className="red-gradient">Diverse Realms</span> of Anime
            Magic <span className=" text-red-800">Ad-free</span>
          </h1>
        </div>
        <div className="lg:flex-1 relative w-full h-[50vh] justify-center">
          <Image src="/anime.png" alt="anime" fill className="object-contain" />
        </div>
      </header>
      <div className="text-white items-center justify-center self-center flex align-middle">
        <Link
          href="/home"
          className={`${buttonVariants({
            variant: "secondary",
          })} animate-pulse rounded-xl py-6 px-2 bg-gradient-to-r from-purple-500 via-indigo-800 to-blue-600 border border-indigo-400`}
        >
          <p className="text-xl text-white text-semibold">Start Watching</p>
          <ArrowRight height={16} width={16} className="ml-2" color="white" />
        </Link>
      </div>
    </div>
  );
}

export default Hero;
