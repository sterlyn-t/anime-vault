import { getMediaDataByTitle } from "@/app/action";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Play, Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { handleSlug } from "@/lib/consumet";
import WatchLaterButton from "./WatchLaterButton";

interface PageProps {
  params: {
    slug: string;
  };
}

function formatTitle(input: string): string | undefined {
  if (!input) return "";
  const alphanumericWords = input
    .toLowerCase()
    .match(/[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*/g);
  const cleanedStr = alphanumericWords?.join("-");
  // return input
  //   .replace(/[^a-zA-Z0-9\s-]/g, "")
  //   .toLowerCase()
  //   .replace(/\s+/g, "-");
  return cleanedStr;
}

const Page = async ({ params }: PageProps) => {
  const data = await getMediaDataByTitle({ title: params.slug });
  const { consumet, anilist } = await handleSlug(params.slug);
  const title = anilist?.title.english ?? consumet.title;

  return (
    <main className="p-8 flex flex-col gap-8 lg:container">
      <AspectRatio ratio={16 / 5} className="relative min-h-[125px]">
        <Image
          src={data?.bannerImage ? data.bannerImage : "/placeholder.svg"}
          alt="banner"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-background/10" />
        <div className="-mb-[48.5px] absolute bottom-0 left-0 ml-8 max-w-2xl">
          <div className="flex flex-row gap-4">
            <Image
              src={data?.coverImage.large}
              alt={data?.title.english || data?.title.userPreferred}
              width={140}
              height={140}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="rounded-md aspect-[7/8] object-cover"
              priority
            />

            <div className="absolute left-40 space-y-2 flex flex-col -mt-[30px]">
              <h1 className="text-black font-bold text-3xl mt-4 mb-2 flex whitespace-nowrap">
                {title}
              </h1>
              <div className="flex flex-row gap-2">
                {data?.genres.map((genre: any, index: number) => (
                  <Badge
                    variant={"secondary"}
                    key={index}
                    className="flex-shrink-0"
                  >
                    {genre}
                  </Badge>
                ))}
              </div>
              <div className="mt-12 gap-4 flex flex-row items-center">
                <Link href={`/anime/${params.slug}/1`}>
                  <Button>
                    <Play className="mr-2 h-4 w-4" />
                    Watch Ep. 1
                  </Button>
                </Link>
                <WatchLaterButton />
              </div>
            </div>
          </div>
        </div>
      </AspectRatio>

      <div
        className="text-xs md:text-sm text-zinc-400 mt-10"
        dangerouslySetInnerHTML={{ __html: data?.description }}
      />
      <Separator className="bg-zinc-700" />
      <h1 className="text-white font-bold text-2xl tracking-tight">Episodes</h1>
      <div className="relative">
        <ScrollArea>
          <div className="flex space-x-4 pb-4">
            {consumet?.episodes.length > 0 &&
              Array.from(
                { length: consumet?.episodes.length },
                (_, index) => index + 1
              )
                .reverse()
                .map((value, index) => (
                  <>
                    {value < consumet?.episodes.length && (
                      <div className="flex-col gap-2 relative" key={value}>
                        <div className="min-w-[150px]">
                          <Link
                            href={`/anime/${formatTitle(
                              data?.title.userPreferred
                            )}/${Number(consumet?.episodes.length) - index}`}
                          >
                            <Image
                              src={data?.coverImage.large}
                              alt={title}
                              width={150}
                              height={200}
                              className="rounded-md"
                            />
                          </Link>
                        </div>
                        <p className=" text-white text-xs mt-2">
                          Episode {value}
                        </p>
                      </div>
                    )}
                  </>
                ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </main>
  );
};

export default Page;
