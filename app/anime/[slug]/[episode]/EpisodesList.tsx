"use client";
import { ScrollArea, ScrollViewport } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { AudioLines, Eye } from "lucide-react";
import Link from "next/link";
import React from "react";

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
  if (!episodes) {
    return null;
  }
  return (
    <>
      <h1 className="text-white font-semibold text-xl tracking-tight mb-2 mt-2">
        Episodes
      </h1>
      <ScrollArea className="h-[10rem] w-full rounded-md border-slate-800 border lg:h-[32rem] xl:h-[33rem]">
        <ScrollViewport className="p-4">
          {Array.from({ length: episodes }, (_, index) => index + 1).map(
            (_, index) => (
              <>
                {index >= 1 && (
                  <>
                    <Link href={`/anime/${slug}/${index}`} key={index}>
                      <div className="flex py-4">
                        {index === currentEpisodeIndex ? (
                          <div className="flex items-center justify-between">
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
