import dynamic from "next/dynamic";

const VideoPlayerCSR = dynamic(() => import("./csr"), { ssr: false });

export default async function VideoPlayerSSR() {
  return <VideoPlayerCSR />;
}
