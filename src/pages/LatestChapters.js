import { useState, useEffect } from "react";
import LatestUploadedCard from "../components/Manga/LatestUploadedCard";
import LatestUploadedCardSkeleton from "../components/Manga/LatestUploadedCardSkeleton";
import useLatestUploads from "../hooks/manga/useLatestUploads";
import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Pagination from "../components/Pagination/Pagination";
import { motion as m } from "framer-motion";

const LatestChapters = () => {
  const type = "Latest Uploaded Chapter";
  const order = { readableAt: "desc" };
  const pageSize = 20;
  const includes = ["user", "scanlation_group", "manga"];

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedId, setSelectedId] = useState("");
  const [deselectedId, setDeselectedId] = useState(null);

  // Fetch latest uploads data
  const { data, isLoading, isRefetching } = useLatestUploads(
    type,
    order,
    pageSize,
    includes,
    currentPage - 1
  );

  // Calculate total pages based on data length and page size
  useEffect(() => {
    setTotalPages(Math.ceil(10000 / pageSize));
  }, [isLoading, data]);

  // Event handler for pagination click
  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Event handler for opening card details
  const openModel = (mangaId) => {
    setSelectedId(mangaId);
  };

  // Event handler for closing card details
  const closeModel = (mangaId) => {
    setSelectedId("");
    setDeselectedId(mangaId);
  };

  // Determine the number of skeleton cards based on screen width
  const skeletonCount = window.innerWidth < 425 ? 6 : 9;

  return (
    <>
      <div className="bg-[#1F1F1F] w-full max-w-[100%] min-h-[max-content] py-10 px-5 xl:px-20 relative">
        <Link
          to={`/Home`}
          className="flex items-center gap-2 mb-8 cursor-pointer w-max"
        >
          <ArrowLeftIcon className="w-8 h-8 text-gray-500 sm:h-10 sm:w-10" />
          <span className="text-white font-semibold text-xl md:text-2xl lg:text-4xl hover:text-[#F4B333]">
            Latest Chapters
          </span>
        </Link>
        <div className="grid w-full gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {(isLoading || isRefetching
            ? Array.from({ length: skeletonCount })
            : data?.data
          ).map((chapters, index) => (
            <m.div
              key={chapters?.mangaID || index}
              className={`cursor-pointer transform transition-transform duration-500 ${
                selectedId === chapters?.mangaID ? "card-selected" : ""
              }`}
              layoutId={`card-container-${chapters?.mangaID}`}
              initial={{
                scale: 1,
                zIndex: selectedId === chapters?.mangaID ? 2 : 1,
              }}
              animate={{
                scale: selectedId === chapters?.mangaID ? 1.2 : 1,
                zIndex:
                  selectedId === chapters?.mangaID
                    ? 2
                    : deselectedId === chapters?.mangaID
                    ? 3
                    : 1,
              }}
              transition={{ duration: 0.2, bounce: 0.5 }}
              onClick={() =>
                selectedId
                  ? closeModel(chapters?.mangaID)
                  : openModel(chapters?.mangaID)
              }
            >
              {isLoading || isRefetching ? (
                <LatestUploadedCardSkeleton itemID={index} title={index} />
              ) : (
                <LatestUploadedCard
                  chapters={chapters}
                  openModel={openModel}
                  isPage={true}
                />
              )}
            </m.div>
          ))}
        </div>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePaginationClick}
        />
      </div>
      {selectedId && (
        <m.div
          className="fixed inset-0 z-[30] flex items-center justify-center bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          layoutId={selectedId}
          onClick={() => closeModel(selectedId)}
        >
          {data?.data.map(
            (item) =>
              item?.mangaID === selectedId && (
                <m.div
                  key={item?.mangaID}
                  className="w-[90%] md:w-[70%%] lg:w-[50%] max-h-[70%] mt-[10%] md:mt-[5%] overflow-x-hidden overflow-y-scroll border-y-4 border-white px-1 py-2 mx-auto bg-white rounded-lg shadow-md"
                  layoutId={`card-container-${item?.mangaID}`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0}}
                  transition={{ delay: 0.2 }}
                >
                  <m.div className="relative">
                    <button
                      className="absolute px-2 py-1 text-[12px] text-center text-white bg-red-500 rounded-[4px] top-2 right-2"
                      onClick={() => closeModel(selectedId)}
                    >
                      Close
                    </button>
                    <LatestUploadedCard
                      chapters={item}
                      selectedId={selectedId}
                    />
                  </m.div>
                </m.div>
              )
          )}
        </m.div>
      )}
    </>
  );
};

export default LatestChapters;
