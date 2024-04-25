"use client";
import AnimeCard from "@/components/AnimeCard";
import ContinueWatchingAnimeCard from "@/components/ContinueWatchingAnimeCard";
import { ScrollBar } from "@/components/ui/scroll-area";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import React from "react";

interface HorizontalEpisodeList {
  episodes: any[];
  hideDivider?: boolean;
  showLatestEpisode?: boolean;
  continueWatchingList?: boolean;
}

function formatTitle(input: string): string | undefined {
  if (!input) return "";
  const alphanumericWords = input
    .toLowerCase()
    .match(/[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*/g);
  const cleanedStr = alphanumericWords?.join("-");
  // return input
  //   .replace(/[^a-zA-Z0-9\s-]/g, "")
  //   .toLowerCase()
  //   .replace(/\s+/g, "-");
  return cleanedStr;
}

const HorizontalEpisodeList = ({
  episodes,
  hideDivider = false,
  showLatestEpisode = false,
  continueWatchingList = false,
}: HorizontalEpisodeList) => {
  return (
    <div className="relative">
      <ScrollArea>
        <div className="flex space-x-4 pb-4">
          {!continueWatchingList &&
            episodes.map((item, index) => (
              <div key={index} className="relative min-w-[220px]">
                <Link
                  href={
                    showLatestEpisode
                      ? `/anime/${formatTitle(item.title)}/${Number(
                          item.episodeNumber
                        )}`
                      : `/anime/${formatTitle(item.title)}`
                  }
                >
                  <AnimeCard
                    anime={item}
                    index={index}
                    episodeNumber={showLatestEpisode ? item.episodeNumber : ""}
                  />
                </Link>
              </div>
            ))}
          {continueWatchingList &&
            episodes.map((item, index) => (
              <div key={index} className="relative max-w-[220px]">
                <Link
                  href={`/anime/${formatTitle(item.title)}/${Number(
                    Math.max(
                      ...item.episodes.map((episode: any) => episode.number)
                    )
                  )}`}
                >
                  {item.episodes.length > 0 && (
                    <ContinueWatchingAnimeCard
                      anime={item}
                      index={index}
                      highestEpisodeIndex={Math.max(
                        ...item.episodes.map((episode: any) => episode.number)
                      )}
                    />
                  )}
                </Link>
              </div>
            ))}
          <ScrollBar orientation="horizontal" />
        </div>
      </ScrollArea>
      {!hideDivider && <Separator className="mt-8 bg-slate-700" />}
    </div>
  );
};

export default HorizontalEpisodeList;
