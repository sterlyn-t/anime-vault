import { getMediaDataByTitle } from "@/app/action";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface PageProps {
  params: {
    slug: string;
  };
}

function formatTitle(input: string): string {
  if (!input) return "";
  return input
    .replace(/[^a-zA-Z0-9\s]/g, "")
    .toLowerCase()
    .replace(/\s+/g, "-");
}

const Page = async ({ params }: PageProps) => {
  const data = await getMediaDataByTitle(params.slug);

  return (
    <div className="p-8 flex flex-col gap-8 lg:container">
      <AspectRatio ratio={16 / 5} className="relative min-h-[125px]">
        <Image
          src={data?.bannerImage ? data.bannerImage : ""}
          alt="banner"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-background/10" />
        <div className="-mb-[48.5px] absolute bottom-0 left-0 ml-8 max-w-2xl">
          <div className="flex flex-row gap-4">
            <div className="w-[140px] h-[28vh] relative">
              <Image
                src={data?.coverImage.large}
                alt={data?.title.english || data?.title.userPreferred}
                fill
                className="rounded-md"
                priority
              />
            </div>
            <div className="absolute left-40 space-y-2 flex flex-col -mt-[30px] min-w-[600px]">
              <h1 className="text-black font-bold text-3xl mt-4 mb-2 flex-wrap flex">
                {data?.title.english || data?.title.userPreferred}
              </h1>
              <div className="flex flex-row gap-2 flex-wrap">
                {data?.genres.map((item: any) => (
                  <div
                    key={item}
                    className="rounded-xl border-gray-900 border-1 px-2 py-0.5 bg-slate-600"
                  >
                    <p className="text-sm text-white">{item}</p>
                  </div>
                ))}
              </div>
              <div className="mt-12 flex flex-row gap-4">
                <Link
                  href={`/anime/${formatTitle(data?.title.userPreferred)}/1`}
                >
                  <Button>
                    <Play className="mr-2 h-4 w-4" />
                    Watch Ep. 1
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </AspectRatio>

      <Separator className="bg-zinc-700 mt-8" />
      <h1 className="text-white font-bold text-2xl tracking-tight">Episodes</h1>
      <div className="relative">
        <ScrollArea>
          <div className="flex space-x-4 pb-4">
            {data?.episodes &&
              Array.from({ length: data?.episodes }, (_, index) => index + 1)
                .reverse()
                .map((value, index) => (
                  <>
                    {index < data?.episodes && (
                      <div className="flex-col gap-2 relative" key={value}>
                        <div className="min-w-[150px]">
                          <Link
                            href={`/anime/${formatTitle(
                              data?.title.userPreferred
                            )}/${Number(data?.episodes) - index}`}
                          >
                            <Image
                              src={data?.coverImage.large}
                              alt={
                                data?.title.english || data?.title.userPreferred
                              }
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
    </div>
  );
};

export default Page;
