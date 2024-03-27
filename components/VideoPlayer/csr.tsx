"use client";

import { watch } from "@/lib/consumet";
import { NextResponse } from "next/server";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";

interface VideoPlayerCSRProps {
  animeTitle: string;
}

let url = "";

export default function VideoPlayerCSR({ animeTitle }: VideoPlayerCSRProps) {
  //   const [url, setUrl] = useState<NextResponse<any> | undefined>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await watch({ episodeId: "1", animeTitle: animeTitle });
        console.log("here we go", data);
        url =
          data.sources.find((s: any) => s.quality === "720p")?.url ||
          data.sources[0].url;
        console.log(url);
        // setUrl(data.sources[0].url);
      } catch (error) {
        // setError(error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="relative w-full h-full">
      <ReactPlayer
        url={url}
        width="100%"
        height="100%"
        controls={true}
        loop={false}
      />
    </div>
  );
}
