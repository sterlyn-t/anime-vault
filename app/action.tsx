"use server";

import { search } from "@/lib/consumet";

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
      averageScore
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
  if (!res.ok) return null;
  const { data } = await res.json();
  return data?.Media;
}

export async function getSearchAnimeResult({
  q,
  page,
}: {
  q: string;
  page: number;
}) {
  const data = await search({ query: q, page });
  const results = data.results.map(({ title, id, releaseDate, image }) => {
    const data = {
      title: title,
      slug: id,
      year: releaseDate,
      image,
    };
    return data;
  });
  return { ...data, results };
}
