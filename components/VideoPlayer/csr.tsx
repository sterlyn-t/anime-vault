"use client";
import ReactPlayer from "react-player";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Play } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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
    <div className="relative w-full h-full">
      <ReactPlayer
        url={url}
        width="100%"
        height="100%"
        controls={true}
        loop={false}
        playIcon={<Play />}
        onPause={handlePause}
        onEnded={handleEnded}
        onBuffer={handlePause}
      />
    </div>
  );
}
