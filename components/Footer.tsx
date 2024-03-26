import { Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function Footer() {
  return (
    <footer className="sm:px-16 py-4 px-8 flex justify-between items-center gap-2 flex-wrap bg-[#161921]">
      <p className="text-base font-bold text-white">@2024 AnimeVault</p>
      <Image
        src="/logo.svg"
        alt="logo"
        width={47}
        height={44}
        className="object-contain"
      />
      <div className="flex items-center gap-6">
        <p className=" text-white text-sm hover:underline cursor-pointer">
          FAQ
        </p>
        <Link href={"https://github.com/sterlyn-t/anime-vault"} target="_blank">
          <Github width={19} height={19} color="white" />
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
