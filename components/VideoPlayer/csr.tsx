"use client";

import ReactPlayer from "react-player";

export default function VideoPlayerCSR() {
  return (
    <div className="relative w-full h-full">
      <ReactPlayer
        url={"https://www.youtube.com/watch?v=dzsYBJLVFFs"}
        width="100%"
        height="100%"
        controls={true}
        loop={false}
      />
    </div>
  );
}
