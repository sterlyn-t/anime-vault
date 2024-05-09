"use client";
import AnimeCard from "@/components/AnimeCard";
import ContinueWatchingAnimeCard from "@/components/ContinueWatchingAnimeCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import React from "react";

interface HorizontalEpisodeList {
  episodes: any[];
  hideDivider?: boolean;
  showLatestEpisode?: boolean;
  continueWatchingList?: boolean;
  myList?: boolean;
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
  myList = false,
}: HorizontalEpisodeList) => {
  return (
    <div className="relative">
      <ScrollArea>
        <div className="flex space-x-4 pb-4">
          {!continueWatchingList &&
            !myList &&
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
              <>
                {item.episodes.length > 0 && (
                  <div
                    key={index}
                    className="relative min-w-[220px] max-w-[220px]"
                  >
                    <Link
                      href={`/anime/${formatTitle(item.title)}/${Number(
                        Math.max(
                          ...item.episodes.map((episode: any) => episode.number)
                        )
                      )}`}
                    >
                      <ContinueWatchingAnimeCard
                        anime={item}
                        index={index}
                        count={Number(episodes.length)}
                        highestEpisodeIndex={Math.max(
                          ...item.episodes.map((episode: any) => episode.number)
                        )}
                      />
                      )
                    </Link>
                  </div>
                )}
              </>
            ))}
          {myList &&
            episodes &&
            episodes.map((item, index) => (
              <>
                <div
                  className="relative min-w-[220px] max-w-[220px]"
                  key={index}
                >
                  <Link href={`/anime/${formatTitle(item.title)}`}>
                    <ContinueWatchingAnimeCard
                      anime={item}
                      key={index}
                      index={index}
                    />
                  </Link>
                </div>
              </>
            ))}
          <ScrollBar orientation="horizontal" />
        </div>
      </ScrollArea>
      {!hideDivider && <Separator className="mt-8 bg-slate-700" />}
    </div>
  );
};

export default HorizontalEpisodeList;
