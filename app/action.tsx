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
