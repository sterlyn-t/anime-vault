"use client";
import { fetchAnimeDetails, getMediaIdByTitle } from "@/app/action";
import { AnimeProp } from "@/components/AnimeCard";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

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

const Page = ({ params }: PageProps) => {
  const [data, setData] = useState<any>();

  useEffect(() => {
    fetchAnimeDetails(params.slug).then((res) => {
      setData(res);
    });
  }, []);

  return (
    <div className="p-8 flex flex-col gap-4">
      <div className="flex flex-row gap-4">
        <div className="w-[200px] h-[37vh] relative">
          <Image
            src={`https://shikimori.one${data?.image.original}`}
            alt={data?.name}
            fill
            className="rounded-md"
          />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-white font-bold text-2xl mt-4">{data?.name}</h1>
          <div className="flex flex-row gap-4 items-center">
            <div className="flex flex-row gap-2 items-center">
              <Image
                src="/star.svg"
                alt="star"
                width={18}
                height={18}
                className="object-contain"
              />
              <p className="text-base font-bold text-[#FFAD49]">
                {data?.score}
              </p>
            </div>
            <div className="bg-slate-400 py-0.5 px-1.5 rounded-lg">
              <p className="text-white text-sm">{data?.rating.toUpperCase()}</p>
            </div>
          </div>
          <div className="flex flex-row gap-2 flex-wrap">
            {data?.genres.map((item: any) => (
              <div
                key={item.name}
                className="rounded-xl border-gray-300 border-2 px-2 py-0.5 bg-slate-600"
              >
                <p className="text-sm text-white">{item?.name}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-row gap-4">
            <Link href={`/anime/${formatTitle(data?.name)}/1`}>
              <Button>
                <Play className="mr-2 h-4 w-4" />
                Watch Ep. 1
              </Button>
            </Link>
            <Link
              href={data?.videos[0].player_url ? data.videos[0].player_url : ""}
              target="_blank"
            >
              <Button variant="secondary">
                <Play className="mr-2 h-4 w-4" />
                Watch Trailer
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <Separator />
      <h1 className="text-white font-bold text-2xl tracking-tight">Episodes</h1>
      <div className="relative">
        <ScrollArea>
          <div className="flex space-x-4 pb-4">
            {Array.from({ length: data?.episodes }, (_, index) => index + 1)
              .reverse()
              .map((value, index) => (
                <div className="flex-col gap-2 relative" key={value}>
                  <div className="min-w-[140px]">
                    <Link
                      href={`/anime/${formatTitle(data?.name)}/${
                        Number(data?.episodes) - index
                      }`}
                    >
                      <Image
                        src={`https://shikimori.one${data?.image.original}`}
                        alt={data?.name}
                        width={140}
                        height={200}
                        className="rounded-md"
                      />
                    </Link>
                  </div>
                  <p className=" text-white text-xs mt-2">Episode {value}</p>
                </div>
              ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
};

export default Page;
