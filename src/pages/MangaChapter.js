import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import useMangaChapter from "../hooks/manga/useMangaChapter";
import useMangaChapters from "../hooks/manga/useMangaChapters";
import MangaChapterSkeleton from "../components/Manga/MangaChapterSkeleton";
import useWindowWidth from "../hooks/useWindowWidth";
import Image from "../components/Image/Image";

function MangaChapter() {
  // Retrieve parameters from the URL
  const { id, chapterId, chapterNum, lang } = useParams();

  const PROXY_SERVER_URL = "https://yuki-proxy-server.netlify.app";

  // Get the current window width
  const windowWidth = useWindowWidth();

  // Fetch data for the current manga chapter
  const { data, isLoading, isError } = useMangaChapter(chapterId);

  // Fetch data for all chapters of the manga
  const {
    data: chaptersData,
    isLoading: isChaptersLoading,
    isError: isChaptersError,
  } = useMangaChapters(id, [`${lang}`], 100, 0, true);

  // State to keep track of the selected chapter
  const [selectedChapter, setSelectedChapter] = useState(chapterId);

  // Function to render loading skeleton
  const renderLoading = () => <MangaChapterSkeleton />;

  // Function to render error message
  const renderError = () => (
    <div className="flex bg-[#1F1F1F] w-full justify-center items-center h-[500px] px-10">
      <p className="text-[13px] md:text-[20px] text-white">
        Error fetching manga chapter...
      </p>
    </div>
  );

  // Function to render options for selecting chapters
  const renderChapterOptions = () =>
    sortedChapters.map((chapter) => (
      <option
        key={chapter.id}
        value={chapter.id}
        className={`${
          selectedChapter === chapter.id ? "text-white bg-gray-800" : "#ffffff"
        }`}
      >
        Chapter {chapter.attributes.chapter}
      </option>
    ));

  // Function to render navigation links for previous and next chapters
  const renderChapterLinks = (direction) =>
    sortedChapters[currentIndex + direction] && (
      <Link
        to={`/manga/${id}/chapter/${
          sortedChapters[currentIndex + direction].id
        }/${sortedChapters[currentIndex + direction].attributes.chapter}/${
          sortedChapters[currentIndex + direction].attributes.translatedLanguage
        }`}
        className="px-2 md:px-4 text-[10px] md:text-[20px] py-2 text-white bg-gray-800 rounded hover:bg-gray-700"
        onClick={() =>
          handleChapterChange(sortedChapters[currentIndex + direction].id)
        }
      >
        {direction > 0
          ? windowWidth > 768
            ? "Next Chapter"
            : "Next Chap"
          : windowWidth > 768
          ? "previous chapter"
          : " Prev Chap"}
      </Link>
    );

  // Function to handle change in selected chapter
  const handleChapterChange = (chapterId) => {
    setSelectedChapter(chapterId);
  };

  // Render loading skeleton if data is loading
  if (isChaptersLoading || isLoading) {
    return renderLoading();
  }

  // Render error message if there is an error
  if (isChaptersError || isError) {
    return renderError();
  }

  // Filter and sort chapters data
  const filteredChapters = chaptersData.filter((chapter, index, self) => {
    const firstIndex = self.findIndex(
      (c) => c.attributes.chapter === chapter.attributes.chapter
    );
    return index === firstIndex;
  });
  const sortedChapters = filteredChapters.sort(
    (a, b) =>
      parseInt(a.attributes.chapter, 10) - parseInt(b.attributes.chapter, 10)
  );

  // Find index of currently selected chapter
  const currentIndex = sortedChapters.findIndex(
    (chapter) => chapter.id === selectedChapter
  );

  // Retrieve data of currently selected chapter
  const selectedChapterData = sortedChapters.find(
    (item) => item.id === selectedChapter
  );

  return (
    <div className="bg-[#1F1F1F] w-full min-h-screen py-5 px-2 sm:px-5 lg:px-12">
      <div className="sticky flex justify-between bg-[#1F1F1F] mb-4 top-[78px] z-10 md:top-[80px] w-full py-2">
        {renderChapterLinks(-1)}
        <div>
          <select
            value={selectedChapter}
            onChange={(e) => handleChapterChange(e.target.value)}
            className="px-2 md:pl-4 md:pr-12 text-[10px] md:text-[20px] py-2 bg-white text-black rounded"
          >
            {renderChapterOptions()}
          </select>
          <Link
            to={`/manga/${id}/chapter/${selectedChapter}/${selectedChapterData?.attributes.chapter}/${selectedChapterData?.attributes.translatedLanguage}`}
            className="px-2 md:px-4 text-[10px] md:text-[20px] py-2 ml-2 text-white bg-blue-500 rounded hover:bg-blue-400"
          >
            Go
          </Link>
        </div>
        {renderChapterLinks(1)}
      </div>
      <div className="mt-10 md:mt-16">
        {data?.dataSaver.map((img, index) => (
            <Image
              id={data.hash}
              coverFilename={img}
              decoding="async"
              fetchPriority="high"
              loading="lazy"
              isChapterImg={true}
              index={index}
              className="mx-auto object-cover mb-[1px] w-[90%] lg:w-[700px]"
              key={img}
            />
        ))}
      </div>
    </div>
  );
}

export default MangaChapter;
