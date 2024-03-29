"use server";

import { data } from "./_data";

export const fetchAnime = async (page: number) => {
  const response = await fetch(
    `https://shikimori.one/api/animes?page=${page}&limit=8&order=popularity`
  );

  const data = await response.json();

  return data;
};

export const fetchAnimeDetails = async (id: string) => {
  const response = await fetch(`https://shikimori.one/api/animes/${id}`);

  const data = await response.json();
  console.log("here", data);

  return data;
};

export async function getMediaDataByTitle(title: string) {
  const query = `query($query: String){
    Media(search: $query){
      id
      description
      coverImage {
        extraLarge
        large
        medium
        color
      }
      episodes
      genres
      bannerImage
      relations {
        edges {
          id
          node {
            coverImage {
              extraLarge
              large
              medium
              color
            }
            startDate {
              year
              month
              day
            }
            type
            siteUrl
            title {
              romaji
              english
              native
              userPreferred
            }
          }
        }
      }
      title {
        romaji
        english
        native
        userPreferred
      }
    }
  }`;
  const res = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query,
      variables: {
        query: title,
      },
    }),
  });
  // if (!res.ok) return null;
  const { data } = await res.json();
  console.log(data);
  return data?.Media;
}
