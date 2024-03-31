import { getMediaDataByTitle } from "@/app/action";
import axios from "axios";
import { info } from "console";
import { Search } from "lucide-react";
import { notFound } from "next/navigation";

interface WatchProps {
  episodeId: string;
  animeTitle: string;
}

const url = "https://consumet-sterlyn-t.vercel.app/anime/gogoanime";

export async function watch({ episodeId, animeTitle }: WatchProps) {
  try {
    const { data } = await axios.get(
      `${url}/watch/${animeTitle}-episode-${episodeId}`,
      {
        params: { server: "gogocdn" },
      }
    );
    return data;
  } catch (err) {
    // throw new Error(err.message);
  }
}

export async function getRecentEpisodes() {
  try {
    const { data } = await axios.get(`${url}/recent-episodes`, {
      params: { page: 1, type: 1 },
    });
    return data.results;
  } catch (err) {
    // throw new Error(err.message);
  }
}

export async function getTrendingEpisodes() {
  try {
    const { data } = await axios.get(`${url}/top-airing`, {
      params: { page: 1, type: 1 },
    });

    return data.results;
  } catch (err) {
    // throw new Error(err.message);
  }
}

type SearchProps = {
  query: string;
  page?: number;
};

type Search = {
  id: string;
  title: string;
  image: string;
  url: string;
  releaseDate: string;
};

export type ConsumetResponse<T> = {
  currentPage: string;
  hasNextPage: boolean;
  results: T[];
};

export async function search({ query, page = 1 }: SearchProps) {
  const response = await fetch(`${url}/${query}?page=${page}`);
  if (!response.ok) throw new Error("Failed to fetch search.");
  const data: ConsumetResponse<Search> = await response.json();
  return data;
}

export async function getAnimeData(id: string) {
  const response = await fetch(url);
  const data: any = await response.json();
  console.log(data);
  return data;
}

export async function handleSlug(slug: string) {
  const [settleSlug] = await Promise.allSettled([getAnimeData(slug)]);
  const data = settleSlug.status === "fulfilled" ? settleSlug.value : null;
  if (!data) notFound();

  const anilist = await getMediaDataByTitle({ title: data.title });
  console.log("hereeeeeeeex2", anilist);

  return { consumet: data, anilist: anilist };
}
