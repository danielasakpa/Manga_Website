import React, { useState, useEffect } from "react";
import useMangaCover from "../../hooks/manga/useMangaCover";
import useMangaChapters from "../../hooks/manga/useMangaChapters";
import CarouselImageSkeleton from "./CarouselImageSkeleton ";
import { Link } from "react-router-dom";
import Image from "../Image/Image";

const CarouselImage = ({ manga }) => {
  const {
    data: coverFilename,
    isLoading: isCoverLoading,
    isError: isCoverError,
    error: coverError,
  } = useMangaCover(manga.id);
  const {
    data: chaptersData,
    isLoading: isChaptersLoading,
    isError: ischaptersError,
    error: chaptersError,
  } = useMangaChapters(manga.id, ["en"], 100, 0, true);

  const [sortedChapters, setSortedChapters] = useState(null);

  
  useEffect(() => {
    if (chaptersData && chaptersData && chaptersData.length > 0) {
      const filteredChapters = chaptersData.filter((chapter, index, self) => {
        // Find the index of the first occurrence of the chapter number in the array
        const firstIndex = self.findIndex(
          (c) => c.attributes.chapter === chapter.attributes.chapter
        );

        // Keep only the chapter if its index matches the first occurrence index
        return index === firstIndex;
      });

      const sortedChapters = filteredChapters.sort((a, b) => {
        return (
          parseInt(a.attributes.chapter, 10) -
          parseInt(b.attributes.chapter, 10)
        );
      });

      setSortedChapters(sortedChapters);
    } else {
      setSortedChapters(null);
    }
  }, [chaptersData]);

  const imageUrl = coverFilename;

  return (
    <>
      {isCoverError || ischaptersError ? (
        <CarouselImageSkeleton />
      ) : (
        <div className="w-full flex-shrink-0 relative flex justify-left pt-[110px] lg:pt-[100px] pl-2 md:pl-4 pr-4 lg:pr-0 lg:pl-[70px] xl:pl-[120px] bg-gray-600">
          <Image
            id={manga.id}
            coverFilename={imageUrl}
            decoding="async"
            fetchPriority="high"
            className="absolute w-full !bg-[#1F1F1F] md:!bg-gray-200 text-opacity-0 md:text-opacity-100 bg-cover md:bg-contain md:w-[300px] h-full z-10 inset-0 left-1/2 transform -translate-x-1/2"
            size={512}
          />
          <Image
            id={manga.id}
            coverFilename={imageUrl}
            decoding="async"
            fetchPriority="high"
            className="hidden md:block absolute w-full inset-0 text-opacity-0 !bg-[#1F1F1F] bg-cover bg-top opacity-30 rounded-[4px]"
            size={512}
          />
          <div className="absolute inset-0 z-20 w-full bg-black bg-center bg-cover rounded-[4px] opacity-40" />
          <div className="absolute z-30 flex items-center px-2 py-1 font-semibold tracking-[0.1em] bg-white text-gray-800 space-x-2 rounded-[3px] top-4 right-4">
            <span className="">{manga.type.toUpperCase()}</span>
          </div>
          <div className="z-30 lg:w-[60%] ml-3 sm:ml-5 lg:ml-0">
            <h1 className="text-white font-semibold text-[30px] md:text-[40px] leading-9 lg:leading-10 mb-2">
              {manga?.attributes.title.en
                ? manga.attributes.title.en.split(" ").slice(0, 3).join(" ")
                : manga.attributes.altTitles[0].en
                    .split(" ")
                    .slice(0, 3)
                    .join(" ")}
            </h1>
            <p className="text-white text-[15px] md:text-[17px] mb-5">
              {manga?.attributes.description.en
                ? manga.attributes.description.en
                    .split(" ")
                    .slice(0, 20)
                    .join(" ")
                : manga.attributes.title.en}
              ...
            </p>
            <div className="mx-auto list-none">
              <Link
                to={`/manga/${manga.id}/overview`}
                className="flex justify-center items-center text-white font-bold bg-[#1B6FA8] btn border border-[#1F1F1F] w-[60%] px-4 py-2 md:py-3 rounded"
              >
                <span className="z-20"> Read Now </span>
              </Link>
            </div>
          </div>
          {isChaptersLoading ? (
            <div className="absolute bottom-4 left-4 z-30 font-semibold tracking-[0.4em] bg-white text-gray-800 px-10 py-2 rounded-[3px]">
              Loading
            </div>
          ) : sortedChapters === null ? (
            <div className="absolute bottom-4 left-2 z-30 md:left-4 text-[13px] md:text-[16px] font-semibold tracking-[0.4em] bg-white text-gray-800 px-10 py-2 rounded-[3px]">
              No Chapter
            </div>
          ) : (
            <div className="absolute bottom-4 left-2 z-30 md:left-4 font-semibold tracking-[0.4em] bg-white text-gray-800 px-10 py-2 rounded-[3px]">
              Chapter{" "}
              {sortedChapters[sortedChapters.length - 1]?.attributes.chapter}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CarouselImage;
