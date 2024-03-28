import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function prevEpisode(
  currentEpisodeIndex: number,
  episodes: number
) {
  return episodes > 1 && currentEpisodeIndex > 1
    ? currentEpisodeIndex - 1
    : null;
}
