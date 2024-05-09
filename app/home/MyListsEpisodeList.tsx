"use client";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import React, { useEffect, useState } from "react";
import HorizontalEpisodeList from "./HorizontalEpisodeList";
import { Separator } from "@/components/ui/separator";

const MyListEpisodeList = () => {
  const { getMyList } = useLocalStorage();
  const [myList, setMyList] = useState([]);
  useEffect(() => {
    // Check if window is defined (this code runs only on the client-side)
    if (typeof window !== "undefined") {
      const episodesFromLocalStorage = getMyList();
      setMyList(episodesFromLocalStorage);
    }
  }, []);
  return (
    <div className="-mb-16">
      {myList?.length > 0 && (
        <div>
          <Separator className="mb-8 bg-slate-700" />
          <div className="gap-8 flex flex-col">
            <h2 className="text-3xl text-white font-bold">My List</h2>
            <HorizontalEpisodeList episodes={myList} hideDivider myList />
          </div>
        </div>
      )}
    </div>
  );
};

export default MyListEpisodeList;
