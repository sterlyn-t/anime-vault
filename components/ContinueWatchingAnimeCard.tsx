import Image from "next/image";
import { MotionDiv } from "./MotionDiv";
import { reverseFormatTitle } from "@/app/anime/[slug]/[episode]/page";

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
  onClick?: () => void;
  highestEpisodeIndex: number;
}

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

function ContinueWatchingAnimeCard({
  anime,
  index,
  onClick,
  highestEpisodeIndex,
}: Prop) {
  return (
    <MotionDiv
      className="max-w-sm rounded relative w-full"
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
      <div className="relative w-full h-[310px] overflow-hidden rounded-lg">
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
          <h2 className="font-semibold text-white text-lg line-clamp-1 w-full flex-wrap flex">
            {reverseFormatTitle(anime.title)}
          </h2>
        </div>
        <p className="text-zinc-400 text-xs">Episode {highestEpisodeIndex}</p>
      </div>
    </MotionDiv>
  );
}

export default ContinueWatchingAnimeCard;
