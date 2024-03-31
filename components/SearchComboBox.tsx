"use client";
import React, { useEffect, useState, useTransition } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { useDebounce } from "@/hooks/useDebounce";
import { getSearchAnimeResult } from "@/app/action";
import { Skeleton } from "./ui/skeleton";
import { useRouter } from "next/navigation";
import { useInView } from "react-intersection-observer";

interface Data {
  title: string;
  slug: string;
  year: string;
  image: string;
}

const SearchComboBox = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [data, setData] = useState<Data[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [isPending, startTransition] = useTransition();
  const debouncedQuery = useDebounce(query, 300);
  const [isLoadingMore, startLoadingMore] = useTransition();
  const router = useRouter();
  const { ref, inView, entry } = useInView();

  useEffect(() => {
    if (debouncedQuery.length === 0) {
      setData([]);
      setPage(1);
    }

    if (debouncedQuery.length > 0) {
      startTransition(async () => {
        const searchedData = await getSearchAnimeResult({
          q: debouncedQuery,
          page: 1,
        });
        setData(searchedData.results);
        setHasMore(searchedData.hasNextPage);
        setPage(Number(searchedData.currentPage) + 1);
      });
    }
  }, [debouncedQuery]);

  useEffect(() => {
    if (inView && hasMore) {
      startLoadingMore(async () => {
        const moreData = await getSearchAnimeResult({
          q: debouncedQuery,
          page,
        });
        setData([...data, ...moreData.results]);
        setPage(Number(moreData.currentPage) + 1);
        setHasMore(moreData.hasNextPage);
        entry?.target.scrollIntoView({ behavior: "instant" });
      });
    }
  }, [inView, hasMore, data, entry, debouncedQuery, page]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/") {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setQuery("");
    }
  }, [isOpen]);

  return (
    <>
      <Button
        variant="outline"
        className="relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2 bg-[#0F1117] gap-2 hover:bg-zinc-800 border-zinc-500"
        onClick={() => setIsOpen(true)}
      >
        <Search height={18} width={18} className="mr-1 text-zinc-400" />
        <span className="text-zinc-400 hidden xl:inline-flex">
          Type{" "}
          <kbd className="pointer-events-none h-6 bg-zinc-700 px-1.5 text-[14px] opacity-100 rounded border select-none hidden xl:flex ml-1 mr-1 items-center">
            <span className="text-xs text-white">/</span>
          </kbd>{" "}
          to search anime
        </span>
      </Button>
      <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
        <CommandInput
          placeholder="Search anime..."
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
        />
        {isPending && (
          <div className="space-y-1 overflow-hidden px-1 py-2">
            <LoadingFragment />
            <LoadingFragment />
          </div>
        )}
        <CommandList>
          {!isPending && query.length > 0 && (
            <CommandEmpty className={"py-6 text-center text-sm"}>
              No anime found.
            </CommandEmpty>
          )}
          {data && (
            <CommandGroup>
              {data?.map(({ slug, title, image, year }, index) => (
                <CommandItem
                  key={index}
                  value={title}
                  ref={index === data.length - 1 ? ref : undefined}
                  onSelect={() =>
                    startTransition(() => {
                      setQuery("");
                      setIsOpen(false);
                      router.push(`/anime/${slug}`);
                    })
                  }
                >
                  <img
                    src={image}
                    alt={title}
                    className="mr-4 h-14 w-10 rounded-sm"
                  />
                  <div className="flex flex-col justify-center">
                    <h3 className="font-medium text-sm leading-none">
                      {title}
                    </h3>
                    <p className="text-muted-foreground text-xs leading-none">
                      {year}
                    </p>
                  </div>
                </CommandItem>
              ))}
              {isLoadingMore && <LoadingFragment />}
            </CommandGroup>
          )}
          {!debouncedQuery.length && !query && (
            <div className="p-4 text-center text-sm">
              Start typing to see results...
            </div>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};

function LoadingFragment() {
  return (
    <div className="flex flex-row">
      <Skeleton className="mr-4 h-16 w-10 rounded-sm" />
      <div className="flex h-15 flex-col justify-center gap-2">
        <Skeleton className="h-3 w-40" />
        <Skeleton className="h-3 w-20" />
      </div>

      <Skeleton className="h-8 rounded-sm" />
    </div>
  );
}

export default SearchComboBox;
