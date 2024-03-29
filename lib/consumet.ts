import axios from "axios";
import { Search } from "lucide-react";

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
