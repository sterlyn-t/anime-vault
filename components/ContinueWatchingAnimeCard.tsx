import Image from "next/image";
import { MotionDiv } from "./MotionDiv";

function reverseFormatTitle(input: string): string {
  if (!input) return "";

  let revertedString = input.replace(/-/g, " ");

  revertedString = revertedString.replace(/\b\w/g, (match) =>
    match.toUpperCase()
  );

  return revertedString;
}

export interface Anime {
  id: string;
  title: string;
  epsiodes: Episode[];
  image: string;
}

interface Episode {
  id: string;
  number: number;
  url: string;
}

interface Prop {
  anime: Anime;
  index: number;
  count?: number;
  onClick?: () => void;
  highestEpisodeIndex?: number;
}

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

function ContinueWatchingAnimeCard({
  anime,
  index,
  count,
  onClick,
  highestEpisodeIndex,
}: Prop) {
  return (
    <MotionDiv
      className={`max-w-sm rounded relative ${
        count && count >= 5 ? "w-full" : "w-[220px]"
      }`}
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{
        delay: index * 0.25,
        ease: "easeInOut",
        duration: 0.5,
      }}
      viewport={{ amount: 0 }}
    >
      <div
        className={`relative h-[310px] overflow-hidden rounded-lg ${
          count && count >= 5 ? "w-full" : "w-[220px]"
        }`}
      >
        <Image
          src={anime.image}
          alt={anime.title}
          fill
          onClick={onClick}
          className="rounded-lg hover:scale-105 transform transition-all object-cover duration-400 cursor-pointer aspect-[3/4]"
        />
      </div>
      <div className="py-4 flex flex-col gap-1">
        <div className="flex justify-between items-center gap-1">
          <h2
            className={`font-semibold text-white text-lg line-clamp-1 ${
              count && count >= 5 ? "w-full" : "w-[220px]"
            } flex-wrap flex`}
          >
            {reverseFormatTitle(anime.title)}
          </h2>
        </div>
        {highestEpisodeIndex && (
          <p className="text-zinc-400 text-xs">Episode {highestEpisodeIndex}</p>
        )}
      </div>
    </MotionDiv>
  );
}

export default ContinueWatchingAnimeCard;
