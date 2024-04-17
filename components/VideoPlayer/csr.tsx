"use client";
import ReactPlayer from "react-player";
import { useTransition } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface VideoPlayerCSRProps {
  animeTitle: string;
  episodeId: string;
  url: string;
}

export default function VideoPlayerCSR({
  url,
  episodeId,
  animeTitle,
}: VideoPlayerCSRProps) {
  const [isPending, startTransition] = useTransition();
  const { setWatched } = useLocalStorage();
  const handlePause = () => {
    setWatched({
      id: animeTitle,
      title: animeTitle,
      episode: { id: episodeId, number: Number(episodeId), url: url },
    });
  };

  return (
    <div className="relative w-full h-full">
      <ReactPlayer
        url={url}
        width="100%"
        height="100%"
        controls={true}
        loop={false}
        onPause={handlePause}
        onBuffer={handlePause}
      />
    </div>
  );
}
