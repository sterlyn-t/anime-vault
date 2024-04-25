"use client";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Eye, EyeOff } from "lucide-react";
import React, { useEffect, useState } from "react";

interface MarkWatchedButtonProps {
  episodeNumber: number;
  animeId: string;
  image: string;
}

const MarkWatchedButton = ({
  episodeNumber,
  animeId,
  image,
}: MarkWatchedButtonProps) => {
  const { getWatched, setWatched, removeWatchedEpisode } = useLocalStorage();
  const [watchedData, setWatchedData] = useState<any>([]);
  const [watchedState, setWatchedState] = useState<boolean>(false);

  useEffect(() => {
    // Check if window is defined (this code runs only on the client-side)
    if (typeof window !== "undefined") {
      const episodesFromLocalStorage = getWatched();
      setWatchedData(episodesFromLocalStorage);
    }
  }, []);

  useEffect(() => {
    const anime = watchedData?.find((anime: any) => anime.id === animeId);
    setWatchedState(
      anime && anime?.episodes?.find((ep: any) => ep.number === episodeNumber)
    );
  }, [watchedData]);

  return (
    <>
      {watchedState ? (
        <Button
          onClick={() => {
            removeWatchedEpisode(animeId, episodeNumber);
            setWatchedState(!watchedState);
          }}
        >
          <EyeOff className="w-4 h-4 mr-2" />
          <p>Mark as Unwatched</p>
        </Button>
      ) : (
        <Button
          onClick={() => {
            setWatchedState(!watchedState);
            setWatched({
              id: animeId,
              title: animeId,
              episode: {
                id: String(episodeNumber),
                number: Number(episodeNumber),
                url: undefined,
              },
              image: image,
            });
          }}
        >
          <Eye className="w-4 h-4 mr-2" />
          <p>Mark as Watched</p>
        </Button>
      )}
    </>
  );
};

export default MarkWatchedButton;
