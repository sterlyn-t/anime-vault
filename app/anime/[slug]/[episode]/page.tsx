import VideoPlayerSSR from "@/components/VideoPlayer/ssr";
import React from "react";

interface EpisodePageProps {
  params: {
    episode: string;
    slug: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const Page = ({ params, searchParams }: EpisodePageProps) => {
  return (
    <div className="px-8 flex flex-col gap-4 bg-[#0F1117]  mb-8">
      <VideoPlayerSSR animeTitle={params.slug} episodeId={params.episode} />
      <div>
        <p className="text-white text-bold text-xl">
          Episode {params.episode} - {params.slug}
        </p>
      </div>
    </div>
  );
};

export default Page;
