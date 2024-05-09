import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="min-h-[76vh] py-8 xl:px-24 px-8 flex flex-col gap-8 items-center cursor-default">
      <h1 className="text-white font-bold text-5xl">Lost your way?</h1>
      <p className="text-white text-lg">
        Sorry, we can&apos;t find that page. You&apos;ll find loads to explore
        on the home page.
      </p>
      <Link href={"/home"}>
        <Button variant="secondary">AnimeVault Home</Button>
      </Link>
      <p className="text-white text-md border-l-2 border-red-500 px-2">
        Error Code <span className="text-bold">404</span>
      </p>
    </div>
  );
};

export default NotFound;
