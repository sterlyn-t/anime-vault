"use client";
import { Button } from "@/components/ui/button";
import { Check, Plus } from "lucide-react";
import React, { useState } from "react";

const WatchLaterButton = () => {
  const [clicked, setClicked] = useState(false);
  return (
    <div className="rounded-2xl items-center border-zinc-500 border-2 hover:border-zinc-700 cursor-pointer bg-zinc-300 hover:bg-zinc- hover:opacity-90" onClick={() => setClicked(!clicked)}>
      {clicked && (
        <Plus className="h-6 w-6 text-zinc-500 hover:text-zinc-800" />
      )}
      {!clicked && (
        <Check className="h-6 w-6 text-zinc-500 hover:text-zinc-800" />
      )}
    </div>
  );
};

export default WatchLaterButton;
