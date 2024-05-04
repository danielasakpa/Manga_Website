import React from 'react'
import { Link } from 'react-router-dom';

const ChaptersList = ({ id, chapters, totalPages, currentPage, handlePaginationClick }) => (
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
        <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => (
                <button
                    key={i + 1}
                    onClick={() => handlePaginationClick(i + 1)}
                    className={currentPage === i + 1 ? "active" : ""}
                >
                    {i + 1}
                </button>
            ))}
        </div>
    </div>
);

export default ChaptersList