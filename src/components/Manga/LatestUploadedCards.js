import React from "react";
import LatestUploadedCard from "./LatestUploadedCard";
import useLatestUploads from "../../hooks/manga/useLatestUploads";
import LatestUploadedCardSkeleton from "./LatestUploadedCardSkeleton";

const LatestUploadedCards = ({ type, order, limit, includes }) => {
  const { data, isLoading, isRefetching, isError, error } = useLatestUploads(
    type,
    order,
    limit,
    includes,
    0
  );

  const screenWidth = window.innerWidth;

  return (
    <>
      <div className="w-[100%] grid gap-3 md:gap-6 lg:grid-cols-2 xl:grid-cols-3 ">
        {isLoading
          ? [...Array(6)].map((_, index) => (
              <div
                className="w-[100%] mx-auto mr-5"
                key={index}
                itemID={index}
                title={index}
              >
                <LatestUploadedCardSkeleton />
              </div>
            ))
          : data?.data
              ?.slice(0, `${screenWidth < 425 ? 5 : data?.data?.length}`)
              .map((chapters, index) => (
                <LatestUploadedCard
                  key={index}
                  chapters={chapters}
                />
              ))}
      </div>
    </>
  );
};

export default LatestUploadedCards;
