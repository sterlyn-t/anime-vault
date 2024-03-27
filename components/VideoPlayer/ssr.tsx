import dynamic from "next/dynamic";

const VideoPlayerCSR = dynamic(() => import("./csr"), { ssr: false });

interface VideoPlayerSSRProps {
  animeTitle: string;
}

export default async function VideoPlayerSSR({
  animeTitle,
}: VideoPlayerSSRProps) {
  return <VideoPlayerCSR animeTitle={animeTitle} />;
}
