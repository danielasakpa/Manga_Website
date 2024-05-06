import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useMangaChapters from '../hooks/manga/useMangaChapters';
import { useManga } from '../hooks/manga/useManga';
import LanguageSelector from '../components/LanguageSelector/LanguageSelector';
import ChaptersList from '../components/ChaptersList/ChaptersList';

function MangaChapters() {
    // Retrieve manga ID from URL parameters
    const { id } = useParams();

    const [currentPage, setCurrentPage] = useState(1);
    const [chapterLang, setChapterLang] = useState("en");
    const chaptersPerPage = 50;

    // Fetch manga data and chapters data
    const { data: mangaData, isLoading: isMangaLoading, isError: isMangaError } = useManga(id);
    const { data: chaptersData, isLoading: isChaptersLoading, isRefetching, isError: isChaptersError, total: totalChapters, refetch } = useMangaChapters(
        id,
        [`${chapterLang}`],
        chaptersPerPage,
        currentPage - 1
    );

    // Event handler for changing language selection
    const handleChapterLang = (e) => {
        const selectedLang = e.target.value;
        setChapterLang(selectedLang);
    };

    // Event handler for pagination click
    const handlePaginationClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Render loading message while data is being fetched
    if (isChaptersLoading || isMangaLoading || isRefetching) {
        return <LoadingMessage />;
    }

    // Render error message if there is an error fetching chapters or manga
    if (isChaptersError || isMangaError) {
        return <ErrorMessage refetch={refetch} />;
    }

    // Calculate total pages for pagination
    const totalPages = Math.ceil(totalChapters / chaptersPerPage);

    return (
        <div className="min-h-[100vh] h-[max-content] text-white md:px-5 md:pb-6">
            {/* Language selection dropdown */}
            <LanguageSelector
                chapterLang={chapterLang}
                availableTranslatedLanguages={mangaData.attributes.availableTranslatedLanguages}
                handleChapterLang={handleChapterLang}
            />
            {chaptersData?.data?.length === 0 ? (
                <NoChaptersMessage />
            ) : (
                <ChaptersList
                    id={id}
                    chapters={chaptersData.data}
                    totalPages={totalPages}
                    currentPage={currentPage}
                    handlePaginationClick={handlePaginationClick}
                />
            )}
        </div>
    );
}

// Component for rendering loading message
const LoadingMessage = () => (
    <div className="flex justify-center items-center h-[500px] mt-16 px-10">
        <p className='text-[13px] md:text-[20px] text-white'>Loading manga chapters...</p>
    </div>
);

// Component for rendering error message
const ErrorMessage = ({refetch}) => (
  <div className="flex flex-col justify-center items-center h-[500px] gap-3 mt-16 px-10">
    <p className="text-[13px] md:text-[20px] text-white">
      Error fetching manga chapters..
    </p>
    <button
      onClick={refetch}
      className="flex justify-center items-center btn text-white font-bold bg-[#1B6FA8] hover:bg-[#E40066] border border-[#1F1F1F] w-[75%] md:w-[450px] px-4 py-1 rounded"
    >
      <span className="z-20 text-[13px] md:text-[20px]">Retry</span>
    </button>
  </div>
);


// Component for rendering message when no chapters are available
const NoChaptersMessage = () => (
    <div className="flex justify-center items-center h-[90%] mt-16 px-10">
        <p className="text-[13px] md:text-[20px] text-center text-white">
            No Available chapters...
        </p>
    </div>
);


export default MangaChapters;
