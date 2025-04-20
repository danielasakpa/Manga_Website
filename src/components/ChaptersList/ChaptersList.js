import React from "react";
import { Link } from "react-router-dom";

const ChaptersList = ({
  id,
  chapters,
  totalPages,
  currentPage,
  handlePaginationClick,
}) => (
  <div className="overflow-x-hidden overflow-auto h-[90%] mt-8  md:mt-10 px-6">
    {chapters?.map((chapter) => (
      <Link
        key={chapter.id}
        className=""
        to={`/manga/${id}/chapter/${chapter.id}/${chapter.attributes.chapter}/${chapter?.attributes?.translatedLanguage}`}
      >
        <div
          className="chapter-container py-2 md:py-4 px-3 text-[13px] md:text-[20px] bg-white my-3 text-black rounded-md font-medium hover:bg-[#E40066] hover:text-white cursor-pointer"
          key={chapter.id}
        >
          Chapter {chapter.attributes.chapter}{" "}
          <span className="chapter-title ml-4 text-[#E40066]">
            {chapter.attributes.title}
          </span>
        </div>
      </Link>
    ))}
    {/* Pagination buttons */}
    <div className="pagination mt-6 flex items-center gap-2 overflow-x-auto px-1 py-2 custom-scrollbar rounded-full">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => handlePaginationClick(i + 1)}
          className={`min-w-[36px] px-3 py-1 rounded-md text-sm font-medium border transition-all 
                ${
                  currentPage === i + 1
                    ? "bg-[#E40066] text-white border-[#E40066]"
                    : "bg-white text-black border-gray-300 hover:bg-gray-200"
                }`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  </div>
);

export default ChaptersList;
