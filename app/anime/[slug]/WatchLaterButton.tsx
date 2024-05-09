"use client";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Check, LoaderCircle, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";

interface WatchLaterButtonProps {
  animeId: string;
  image: string;
}

const WatchLaterButton = ({ animeId, image }: WatchLaterButtonProps) => {
  const [myListData, setMyListData] = useState<any[]>();
  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(true);
  const { setMyList, getMyList, removeMyListEpisode } = useLocalStorage();

  useEffect(() => {
    // Check if window is defined (this code runs only on the client-side)
    if (typeof window !== "undefined") {
      const episodesFromLocalStorage = getMyList();
      setMyListData(episodesFromLocalStorage);
      if (episodesFromLocalStorage.find((value: any) => value.id === animeId)) {
        setClicked(true);
      }
      setTimeout(() => {
        setLoading(false);
      }, 100);
    }
  }, []);

  return (
    <div
      className="rounded-2xl items-center border-zinc-500 border-2 hover:border-zinc-700 cursor-pointer bg-zinc-300 hover:bg-zinc- hover:opacity-90"
      onClick={() => setClicked(!clicked)}
    >
      {loading && (
        <LoaderCircle className="h-6 w-6 text-zinc-500 animate-spin" />
      )}
      {!clicked && !loading && (
        <Plus
          className="h-6 w-6 text-zinc-500 hover:text-zinc-800"
          onClick={() => {
            setMyList({ id: animeId, title: animeId, image: image });
          }}
        />
      )}
      {clicked && !loading && (
        <Check
          className="h-6 w-6 text-zinc-500 hover:text-zinc-800"
          onClick={() => {
            removeMyListEpisode(animeId);
          }}
        />
      )}
    </div>
  );
};

export default WatchLaterButton;
