"use client";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Check } from "lucide-react";
import React, { useEffect, useState } from "react";

interface WatchedIndicatorProps {
  episodeNumber: number;
  animeId: string;
}

const WatchedIndicator = ({
  episodeNumber,
  animeId,
}: WatchedIndicatorProps) => {
  const { getWatched } = useLocalStorage();
  const [watchedData, setWatchedData] = useState<any>([]);
  useEffect(() => {
    // Check if window is defined (this code runs only on the client-side)
    if (typeof window !== "undefined") {
      const episodesFromLocalStorage = getWatched();
      setWatchedData(episodesFromLocalStorage);
    }
  }, []);

  const anime = watchedData.find((anime: any) => anime.id === animeId);

  if (anime && anime?.episodes.find((ep: any) => ep.number === episodeNumber)) {
    return <Check className="h-4 w-4 text-white justify-end" />;
  }
};

export default WatchedIndicator;
