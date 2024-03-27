import { watch } from "@/lib/consumet";
import dynamic from "next/dynamic";

const VideoPlayerCSR = dynamic(() => import("./csr"), { ssr: false });

interface VideoPlayerSSRProps {
  animeTitle: string;
  episodeId: string;
}

export default async function VideoPlayerSSR({
  animeTitle,
  episodeId,
}: VideoPlayerSSRProps) {
  const data = await watch({ episodeId: episodeId, animeTitle: animeTitle });

  return (
    <VideoPlayerCSR
      animeTitle={animeTitle}
      url={
        data.sources.find((s: any) => s.quality === "720p")?.url ||
        data.sources[0].url
      }
    />
  );
}
