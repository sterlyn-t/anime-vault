import AnimeCard, { AnimeProp } from "@/components/AnimeCard";
import LoadMore from "../../components/LoadMore";
import { getRecentEpisodes, getTrendingEpisodes } from "@/lib/consumet";
import Link from "next/link";
import HorizontalEpisodeList from "./HorizontalEpisodeList";

const Home = async () => {
  const recentEpisodes = await getRecentEpisodes();
  const trendingEpisodes = await getTrendingEpisodes();

  return (
    <main className="sm:p-16 py-16 px-8 flex flex-col gap-8">
      <h2 className="text-3xl text-white font-bold">Explore Recent</h2>
      <HorizontalEpisodeList episodes={recentEpisodes} />
      <h2 className="text-3xl text-white font-bold">Explore Popular</h2>
      <HorizontalEpisodeList episodes={trendingEpisodes} hideDivider />
    </main>
  );
};

export default Home;
