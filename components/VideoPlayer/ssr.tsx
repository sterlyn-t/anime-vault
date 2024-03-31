import { watch } from "@/lib/consumet";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Skeleton } from "../ui/skeleton";

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
    <Suspense fallback={<Skeleton className="h-full w-full" />}>
      <VideoPlayerCSR
        animeTitle={animeTitle}
        url={
          data.sources.find((s: any) => s.quality === "1440p")?.url ||
          data.sources.find((s: any) => s.quality === "1080p")?.url ||
          data.sources.find((s: any) => s.quality === "720p")?.url ||
          data.sources[0].url
        }
      />
    </Suspense>
  );
}
