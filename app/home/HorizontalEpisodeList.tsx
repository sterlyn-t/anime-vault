"use client";
import AnimeCard from "@/components/AnimeCard";
import { ScrollBar } from "@/components/ui/scroll-area";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import React from "react";

interface HorizontalEpisodeList {
  episodes: any[];
  hideDivider?: boolean;
}

function formatTitle(input: string): string {
  if (!input) return "";
  return input
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .toLowerCase()
    .replace(/\s+/g, "-");
}

const HorizontalEpisodeList = ({
  episodes,
  hideDivider = false,
}: HorizontalEpisodeList) => {
  return (
    <div className="relative">
      <ScrollArea>
        <div className="flex space-x-4 pb-4">
          {episodes.map((item, index) => (
            <div key={index} className="relative min-w-[220px]">
              <Link href={`/anime/${formatTitle(item.title)}`}>
                <AnimeCard anime={item} index={index} />
              </Link>
            </div>
          ))}
          <ScrollBar orientation="horizontal" />
        </div>
      </ScrollArea>
      {!hideDivider && <Separator className="mt-8 bg-slate-800" />}
    </div>
  );
};

export default HorizontalEpisodeList;
