import axios from "axios";

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
