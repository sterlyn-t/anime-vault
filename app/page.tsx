"use client";
import AnimeCard, { AnimeProp } from "@/components/AnimeCard";
import LoadMore from "../components/LoadMore";
import { fetchAnime } from "./action";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Home = () => {
  const [data, setData] = useState<AnimeProp[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchAnime(1).then((res) => {
      setData(res);
    });
  }, [data]);
  return (
    <main className="sm:p-16 py-16 px-8 flex flex-col gap-10">
      <h2 className="text-3xl text-white font-bold">Explore Anime</h2>

      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {data.map((item: AnimeProp, index: number) => (
          <AnimeCard
            key={item.id}
            anime={item}
            index={index}
            onClick={() => router.push(`/anime/${item.id}`)}
          />
        ))}
      </section>
      <LoadMore />
    </main>
  );
};

export default Home;
