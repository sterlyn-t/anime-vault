"use client";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollViewport } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ArrowDown, AudioLines } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef } from "react";

interface EpisodesListProps {
  episodes: number;
  currentEpisodeIndex: number;
  slug: string;
}

const EpisodesList: React.FC<EpisodesListProps> = ({
  episodes,
  currentEpisodeIndex,
  slug,
}) => {
  const currentEpisodeRef = useRef<HTMLDivElement>(null);
  const episodesListRef = useRef<HTMLDivElement>(null);

  const scrollToCurrentEpisode = () => {
    if (episodesListRef.current && currentEpisodeRef.current) {
      currentEpisodeRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  useEffect(() => {
    scrollToCurrentEpisode();
  }, []);
  return (
    <>
      <div className="flex flex-row mb-2 mt-2 items-center justify-between">
        <h1 className="text-white font-semibold text-xl tracking-tight">
          Episodes
        </h1>
        <Button size="sm" onClick={scrollToCurrentEpisode}>
          <ArrowDown height={16} width={16} />
          <p className="text-xs">Jump to current</p>
        </Button>
      </div>
      <ScrollArea className="h-[10rem] w-full rounded-md border-slate-800 border lg:h-[32rem] xl:h-[33rem]">
        <ScrollViewport className="p-4" ref={episodesListRef}>
          {Array.from({ length: episodes }, (_, index) => index + 1).map(
            (_, index) => (
              <>
                {index >= 1 && (
                  <>
                    <Link href={`/anime/${slug}/${index}`} key={index}>
                      <div className="flex py-4">
                        {index === currentEpisodeIndex ? (
                          <div
                            className="flex items-center justify-between"
                            ref={currentEpisodeRef}
                          >
                            <p className=" text-green-700">Episode {index}</p>
                            <AudioLines
                              className="text-green-700 animate-pulse"
                              height={16}
                              width={16}
                            />
                          </div>
                        ) : (
                          <p className="text-white">Episode {index}</p>
                        )}
                      </div>
                    </Link>
                    <Separator className="bg-slate-700" />
                  </>
                )}
              </>
            )
          )}
        </ScrollViewport>
      </ScrollArea>
    </>
  );
};

export default EpisodesList;
