interface Episode {
  id: string;
  number?: number;
  url?: string;
}

interface WatchEntryProps {
  id: string;
  title: string;
  episode: Episode;
}

export interface WatchedHistory {
  id: string;
  title: string;
  episodes: Episode[];
}

export function useLocalStorage() {
  const getWatched = () => {
    try {
      const watched = localStorage.getItem("watched");
      if (watched !== null) {
        const result = JSON.parse(watched);
        return result;
      }
    } catch (error) {
      console.error("Error getting watched list from localStorage:", error);
    }
  };

  const setWatched = ({ id, title, episode }: WatchEntryProps) => {
    try {
      console.log("hereee");
      const watched = localStorage.getItem("watched");
      const watchedArr: WatchedHistory[] = watched ? JSON.parse(watched) : [];
      console.log("hereeeee");

      const existingItemIndex = watchedArr.findIndex((item) => item.id === id);

      if (existingItemIndex !== -1) {
        const existingEpisodeIndex = watchedArr[
          existingItemIndex
        ].episodes.findIndex((episode) => episode.id === episode?.id);

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
          episodes: episode ? [episode] : [],
        });
      }
      localStorage.setItem("watched", JSON.stringify(watchedArr));
    } catch (error) {
      console.error("Error setting watched item to localStorage:", error);
    }
  };

  return { getWatched, setWatched };
}
