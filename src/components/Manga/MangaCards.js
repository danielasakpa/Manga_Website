import { useState, useEffect, useCallback } from "react";
import MangaCard from "./MangaCard";
import MangaCardSkeleton from "./MangaCardSkeleton";
import useMangas from "../../hooks/manga/useMangas";
import HorizontalScrollMenu from "../HorizontalScrollMenu/HorizontalScrollMenu";
import SeeMore from "../SeeMore/SeeMore";

const MangaCards = ({ type, order, limit, includedTags, excludedTags }) => {
  const [page, setPage] = useState(0);
  const { data, isLoading, isError, error, isRefetching } = useMangas(
    type,
    order,
    limit,
    includedTags,
    excludedTags,
    page
  );
  const [mangaList, setMangaList] = useState([]);
  const [isLastItem, setIsLastItem] = useState(false);

  // Update manga list when new data is loaded
  useEffect(() => {
    if (data && data?.data?.length > 0) {
      setMangaList((prevList) => [...prevList, ...data.data]);
    }
  }, [data]);

  const handleSeeMore = useCallback(() => {
    // Increment the page when "See More" is clicked
    setPage((prevPage) => prevPage + 1);
  }, []);

  return (
    <HorizontalScrollMenu>
      {isLoading || isError
        ? [...Array(20)].map((_, index) => (
            <div className="mr-5" key={index} itemID={index} title={index}>
              <MangaCardSkeleton />
            </div>
          ))
        : mangaList.map((manga, i) => (
            <div
              className="mr-5"
              key={manga.id + i}
              itemID={manga.id + i}
              title={manga.id + i}
            >
              <MangaCard manga={manga} setIsLastItem={setIsLastItem} />
            </div>
          ))}
      {isLastItem && mangaList?.length > 1 && (
        <SeeMore handleSeeMore={handleSeeMore} isRefetching={isRefetching} />
      )}
    </HorizontalScrollMenu>
  );
};

export default MangaCards;
