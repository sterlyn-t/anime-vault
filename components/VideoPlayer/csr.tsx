"use client";
import ReactPlayer from "react-player";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

interface VideoPlayerCSRProps {
  animeTitle: string;
  episodeId: string;
  animeImage: string;
  episodeCount: number;
  url: string;
}

export default function VideoPlayerCSR({
  url,
  episodeId,
  animeImage,
  animeTitle,
  episodeCount,
}: VideoPlayerCSRProps) {
  const [playing, setPlaying] = useState<boolean>(false);
  const { setWatched } = useLocalStorage();
  const router = useRouter();
  const handlePause = () => {
    setWatched({
      id: animeTitle,
      title: animeTitle,
      image: animeImage,
      episode: { id: episodeId, number: Number(episodeId), url: url },
    });
  };

  const handleEnded = () => {
    setWatched({
      id: animeTitle,
      title: animeTitle,
      image: animeImage,
      episode: { id: episodeId, number: Number(episodeId), url: url },
    });
    if (episodeCount > Number(episodeId)) {
      const url = `/anime/${animeTitle}/${Number(episodeId) + 1}`;
      router.prefetch(url);
      toast(`Go to episode ${Number(episodeId) + 1}?`, {
        duration: 60 * 5 * 1000,
        dismissible: true,
        id: "next-episode",
        action: {
          label: "Yes",
          onClick: () => {
            toast.loading(`Going to episode ${Number(episodeId) + 1}`);
            router.push(url);
            toast.dismiss("next-episode");
          },
        },
      });
    }
  };

  return (
    <div className="relative w-full h-full" style={{ overflow: "hidden" }}>
      <div style={{ borderRadius: 8, overflow: "hidden" }} className="mt-4">
        <ReactPlayer
          url={url}
          playing={playing}
          onReady={() => {
            setPlaying(true);
          }}
          width="100%"
          height="100%"
          controls={true}
          style={{
            borderRadius: 8,
            overflow: "hidden",
          }}
          loop={false}
          onPause={handlePause}
          onEnded={handleEnded}
          onBuffer={handlePause}
        />
      </div>
    </div>
  );
}
