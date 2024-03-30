import { getRecentEpisodes, getTrendingEpisodes } from "@/lib/consumet";
import HorizontalEpisodeList from "./HorizontalEpisodeList";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { getMediaDataByTitle } from "../action";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Play } from "lucide-react";
import { data } from "../_data";

const Home = async () => {
  const recentEpisodes = await getRecentEpisodes();
  const trendingEpisodes = await getTrendingEpisodes();

  return (
    <main className="sm:p-16 py-16 px-8 flex flex-col gap-8">
      <Carousel className="-mt-12 overflow-hidden">
        <CarouselContent>
          {trendingEpisodes.map((anime: any) => (
            <CarouselItem key={anime.id}>
              <Suspense fallback={<Skeleton className="h-full w-full" />}>
                <Slide key={anime.id} slug={anime.id} title={anime.title} />
              </Suspense>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <h2 className="text-3xl text-white font-bold">Explore Recent</h2>
      <HorizontalEpisodeList episodes={recentEpisodes} />
      <h2 className="text-3xl text-white font-bold">Explore Popular</h2>
      <HorizontalEpisodeList episodes={trendingEpisodes} hideDivider />
    </main>
  );
};

async function Slide({
  slug,
  title: animeTitle,
}: {
  slug: string;
  title: string;
}) {
  const data = await getMediaDataByTitle({
    title: animeTitle,
    revalidate: 60 * 60 * 24,
  });
  if (!data)
    return (
      <div className="relative">
        <Skeleton className="h-full w-full" />
        <div className="absolute flex items-center justify-center">
          Failed to load!
        </div>
      </div>
    );
  const title = data?.title?.english || data?.title?.userPreferred;
  return (
    <AspectRatio ratio={16 / 7} className="relative">
      <div className="absolute top-5 left-10 z-10 w-1/2 md:top-10">
        <div className="flex max-w-xl flex-col gap-4">
          <div className="flex gap-2">
            <h1 className="line-clamp-1 font-bold text-md 2xl:line-clamp-0 md:line-clamp-2 md:text-2xl sm:text-lg">
              {title}
            </h1>
          </div>
          <div
            className="line-clamp-2 text-xs 2xl:line-clamp-0 sm:line-clamp-4 md:text-sm"
            dangerouslySetInnerHTML={{ __html: data?.description }}
          />
          <div className="hidden md:block">
            <div className="flex flex-shrink-0 flex-wrap gap-1">
              {data?.genres.map((genre: any, index: number) => (
                <Badge variant={"secondary"} key={index}>
                  {genre}
                </Badge>
              ))}
            </div>
          </div>
          <Link
            className={cn(buttonVariants({ size: "sm" }), "max-w-fit")}
            href={`/anime/${slug}`}
          >
            <Play className="mr-2 h-4 w-4" />
            Watch Now
          </Link>
        </div>
      </div>
      <Image
        src={data?.bannerImage || "/placeholder.svg"}
        alt={title}
        fill
        className="absolute inset-0 object-cover rounded-xl"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background to-background/60 md:to-background/40 rounded-xl" />
    </AspectRatio>
  );
}

export default Home;
