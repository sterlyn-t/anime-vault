import { getMediaDataByTitle } from "@/app/action";
import { buttonVariants } from "@/components/ui/button";
import VideoPlayerSSR from "@/components/VideoPlayer/ssr";
import { prevEpisode } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import EpisodesList from "./EpisodesList";
import MarkWatchedButton from "./MarkWatchedButton";
import { getAnimeData } from "@/lib/consumet";

interface EpisodePageProps {
  params: {
    episode: string;
    slug: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

function reverseFormatTitle(input: string): string {
  if (!input) return "";

  let revertedString = input.replace(/-/g, " ");

  revertedString = revertedString.replace(/\b\w/g, (match) =>
    match.toUpperCase()
  );

  return revertedString;
}

const Page = async ({ params, searchParams }: EpisodePageProps) => {
  const currentEpisodeIndex = params.episode;
  const data = await getMediaDataByTitle({ title: params.slug });
  const animeInfo = await getAnimeData(params.slug);

  const prevEp = await prevEpisode(
    Number(currentEpisodeIndex),
    animeInfo?.episodes.length
  );

  return (
    <div className="px-8 flex flex-col gap-4 bg-[#0F1117] mb-8">
      <div className="mt-8 -mb-4">
        <Link
          href={`/anime/${params.slug}`}
          className={buttonVariants({ variant: "secondary" })}
        >
          <ArrowLeft height={16} width={16} />
          <p>Back to series</p>
        </Link>
      </div>
      <div className="grid grid-cols-5">
        <section className="col-span-5 lg:col-span-4">
          <VideoPlayerSSR
            animeTitle={params.slug}
            episodeId={params.episode}
            animeImage={data.coverImage.large}
          />
        </section>
        <aside className="lg:col-span-1">
          <div className="ml-4 hidden lg:block">
            <EpisodesList
              episodes={
                animeInfo?.episodes?.length ? animeInfo.episodes.length : 0
              }
              currentEpisodeIndex={Number(params.episode)}
              slug={params.slug}
            />
          </div>
        </aside>
      </div>
      <div>
        <p className="text-white font-bold text-2xl tracking-tight">
          Episode {currentEpisodeIndex} - {reverseFormatTitle(params.slug)}
        </p>
      </div>
      <div className="flex flex-row mb-2 gap-4">
        {prevEp && (
          <Link
            href={`/anime/${params.slug}/${prevEp}`}
            className={buttonVariants({ variant: "secondary" })}
          >
            <ArrowLeft className="mr-1" height={16} width={16} />
            Previous
          </Link>
        )}
        <MarkWatchedButton
          animeId={params.slug}
          image={data.coverImage.large}
          episodeNumber={Number(currentEpisodeIndex)}
        />
        {animeInfo?.episodes?.length > 1 &&
          Number(currentEpisodeIndex) + 1 < animeInfo?.episodes?.length && (
            <Link
              href={`/anime/${params.slug}/${Number(currentEpisodeIndex) + 1}`}
              className={buttonVariants({ variant: "secondary" })}
            >
              Next
              <ArrowRight className="ml-1" height={16} width={16} />
            </Link>
          )}
      </div>
    </div>
  );
};

export default Page;
