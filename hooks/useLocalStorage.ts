interface Episode {
  id: string;
  number?: number;
  url?: string;
}

interface WatchEntryProps {
  id: string;
  title: string;
  image: string;
  episode: Episode;
}

export interface WatchedHistory {
  id: string;
  title: string;
  image: string;
  episodes: Episode[];
}

interface MarkWatchedButtonProps {
  episodeNumber: number;
  animeId: string;
}

export function useLocalStorage() {
  const getWatched = () => {
    try {
      if (typeof window !== "undefined") {
        const watched = localStorage.getItem("watched");
        if (watched !== null) {
          const result = JSON.parse(watched);
          return result;
        }
      }
    } catch (error) {
      console.error("Error getting watched list from localStorage:", error);
    }
    return null;
  };

  const removeWatchedEpisode = (
    animeId: string,
    episodeIdToRemove: number
  ): void => {
    try {
      const watched = localStorage.getItem("watched");
      const watchedArr: WatchedHistory[] = watched ? JSON.parse(watched) : [];

      const animeIndex = watchedArr.findIndex((item) => item.id === animeId);

      if (animeIndex !== -1) {
        const episodeIndex = watchedArr[animeIndex].episodes.findIndex(
          (e) => e.id === String(episodeIdToRemove)
        );

        if (episodeIndex !== -1) {
          watchedArr[animeIndex].episodes.splice(episodeIndex, 1);
          localStorage.setItem("watched", JSON.stringify(watchedArr));
          console.log(
            `Episode ${episodeIdToRemove} removed from anime with ID ${animeId} successfully.`
          );
        } else {
          console.log(
            `Episode ${episodeIdToRemove} not found in anime with ID ${animeId}.`
          );
        }
      } else {
        console.log(`Anime with ID ${animeId} not found in watched history.`);
      }
    } catch (error) {
      console.error("Error removing episode from watched history:", error);
    }
  };

  const setWatched = ({ id, title, episode, image }: WatchEntryProps) => {
    try {
      const watched = localStorage.getItem("watched");
      const watchedArr: WatchedHistory[] = watched ? JSON.parse(watched) : [];

      const existingItemIndex = watchedArr.findIndex((item) => item.id === id);

      if (existingItemIndex !== -1) {
        const existingEpisodeIndex = watchedArr[
          existingItemIndex
        ].episodes.findIndex((e) => e.id === episode?.id);

        if (existingEpisodeIndex !== -1) {
          const removedEpisode = watchedArr[existingItemIndex].episodes.splice(
            existingEpisodeIndex,
            1
          )[0];
          watchedArr[existingItemIndex].episodes.push(removedEpisode);
        } else {
          watchedArr[existingItemIndex].episodes.push(episode);
        }
      } else {
        watchedArr.push({
          id,
          title,
          image,
          episodes: episode ? [episode] : [],
        });
      }
      localStorage.setItem("watched", JSON.stringify(watchedArr));
    } catch (error) {
      console.error("Error setting watched item to localStorage:", error);
    }
  };

  return { getWatched, setWatched, removeWatchedEpisode };
}
