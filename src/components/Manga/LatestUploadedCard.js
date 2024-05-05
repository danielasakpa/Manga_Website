import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import useMangaCover from "../../hooks/manga/useMangaCover";
import { useManga } from "../../hooks/manga/useManga";
import LatestChapters from "./LatestChapters";
import LatestUploadedCardSkeleton from "./LatestUploadedCardSkeleton";
import Image from "../Image/Image";

const LatestUploadedCard = ({
  chapters,
  openModel,
  selectedId,
  isPage,
}) => {
  const {
    data: mangaData,
    isLoading: isLaodingManga,
    isError,
  } = useManga(chapters?.mangaID);
  const {
    data: coverFilename,
    isLoading: isCoverLoading,
    isError: isCoverError,
  } = useMangaCover(chapters?.mangaID);

  const truncateTitle = useCallback((title) => {
    // Check if title is provided
    if (!title || typeof title !== "string") {
      return "No Title";
    }

    // Split the title into words
    const words = title.split(" ");

    // Initialize variables
    let truncatedTitle = "";
    let count = 0;

    // Loop through the words
    for (const word of words) {
      // Truncate the word if it exceeds 7 characters
      truncatedTitle += word.length > 8 ? word.slice(0, 8) : word;
      truncatedTitle += " ";
      count++;

      // Check if we have reached the maximum word count or if the current word exceeds 7 characters
      if (count >= 3 || word?.length > 8) {
        break;
      }
    }

    // Remove the trailing space
    truncatedTitle = truncatedTitle.trim();

    // Add ellipsis if there are more than three words
    if (words.length >= 3) {
      truncatedTitle += "...";
    }

    return truncatedTitle;
  }, []);

  if (isLaodingManga) {
    return <LatestUploadedCardSkeleton />;
  }

  return (
    <div className="w-[100%] basis-6/12 flex-1 flex flex-col p-4 bg-[#2C2C2C] rounded-[4px]">
      <Link
        to={`/manga/${chapters?.mangaID}/overview`}
        className="pb-2 mb-3 border-b border-gray-300 hover:underline hover:underline-offset-1 hover:decoration-blue-500"
      >
        <h2 className="text-[14px] sm:text-[16px] lg:text-xl font-semibold text-white">
          {`${truncateTitle(mangaData?.attributes?.title?.en)}`}
        </h2>
      </Link>
      <div className="flex">
        <div className="">
          {isCoverLoading || isCoverError ? (
            <div className="">
              <div className="w-20 bg-gray-200 rounded-[3px] h-28 animate-pulse" />
            </div>
          ) : (
            <Link
              to={`/manga/${chapters?.mangaID}/overview`}
              className="block w-16 h-24 lg:w-20 md:h-28"
            >
              <Image
                id={chapters?.mangaID}
                coverFilename={coverFilename}
                alt={mangaData?.attributes?.title?.en}
                decoding="async"
                fetchPriority="high"
                loading="lazy"
                className="object-fill text-[10px] h-full w-full text-start"
                size={256}
              />
            </Link>
          )}
        </div>{" "}
        <div className="w-[100%] flex flex-col justify-center ml-4 gap-4">
          {chapters?.chapters
            ?.slice(0, selectedId ? chapters?.chapters?.length : 1)
            .map((chapter, index) => (
              <LatestChapters key={index} chapter={chapter} />
            ))}
          {isPage && chapters?.chapters?.length > 1 && (
            <button
              className="text-[#F4B333]"
              onClick={() => openModel(chapters?.mangaID)}
            >
              See More
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LatestUploadedCard;
