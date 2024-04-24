"use client";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import React, { useEffect, useState } from "react";
import HorizontalEpisodeList from "./HorizontalEpisodeList";
import { Separator } from "@/components/ui/separator";

const ContinueWatchingEpisodeList = () => {
  const { getWatched } = useLocalStorage();
  const [continueEpisodes, setContinueEpisodes] = useState([]);
  useEffect(() => {
    // Check if window is defined (this code runs only on the client-side)
    if (typeof window !== "undefined") {
      const episodesFromLocalStorage = getWatched();
      setContinueEpisodes(episodesFromLocalStorage);
    }
  }, []);
  return (
    <div className="-mb-16">
      {continueEpisodes?.length > 0 && (
        <div>
          <Separator className="mb-8 bg-slate-700" />
          <div className="gap-8 flex flex-col">
            <h2 className="text-3xl text-white font-bold">Continue Watching</h2>
            <HorizontalEpisodeList
              episodes={continueEpisodes}
              continueWatchingList
              hideDivider
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ContinueWatchingEpisodeList;
