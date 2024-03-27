"use client";
import ReactPlayer from "react-player";

interface VideoPlayerCSRProps {
  animeTitle: string;
  url: string;
}

export default function VideoPlayerCSR({
  animeTitle,
  url,
}: VideoPlayerCSRProps) {
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
