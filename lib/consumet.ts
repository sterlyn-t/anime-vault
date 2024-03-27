import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

interface WatchProps {
  episodeId: string;
  animeTitle: string;
}

// const url = "https://api.consumet.org/anime/gogoanime";
// const url =
//   "https://consumet-sterlyn-t.vercel.app/anime/gogoanime/watch/fullmetal-alchemist-brotherhood-episode-1";
const url = "https://consumet-sterlyn-t.vercel.app/anime/gogoanime/watch";

export async function watch({ episodeId, animeTitle }: WatchProps) {
  try {
    const { data } = await axios.get(
      `${url}/${animeTitle}-episode-${episodeId}`,
      {
        params: { server: "gogocdn" },
      }
    );
    return data;
  } catch (err) {
    // throw new Error(err.message);
  }
}
