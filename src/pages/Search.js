import React, { useState, useEffect } from 'react';
import { MagnifyingGlassIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlass } from 'react-loader-spinner';
import { useLocation } from 'react-router-dom';
import fetchMangaByTitle from '../API/manga/fetchMangaByTitle';
import fetchMangas from '../API/manga/fetchMangas';
import tags from '../assets/tags';
import SearchForm from '../components/SearchForm/SearchForm';
import MangaCard from '../components/Manga/MangaCard';
import Pagination from '../components/Pagination/Pagination';

const Search = () => {
  const [mangas, setMangas] = useState([]);
  const [totalManga, setTotalManga] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [vis, setVis] = useState(false);
  const [mangaVis, setMangaVis] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 30;

  const totalPages = Math.ceil(totalManga / pageSize);

  // Get the current location
  const location = useLocation();

  // Fetch data based on search criteria when location.search or currentPage changes
  useEffect(() => {
    const fetchData = async () => {
      const searchParams = new URLSearchParams(location.search);
      const title = searchParams.get('title');
      const category = searchParams.get('category');
      const advanced = searchParams.get('advanced');

      if (title || category || advanced) {
        try {
          setLoading(true);

          if (title) {
            const res = await fetchMangaByTitle(title, pageSize, currentPage - 1);
            setMangas(res.data.data);
            setTotalManga(res.data.total);
          } else if (category) {
            const excludedTags = ["Boys' Love"];
            const res = await fetchMangas(tags, { rating: "desc" }, pageSize, [category], excludedTags, currentPage - 1);
            setMangas(res.data);
            setTotalManga(res.total);
          } else if (advanced) {
            const includedTags = searchParams.getAll('includedTags')[0]?.split(',');
            const excludedTags = searchParams.getAll('excludedTags')[0]?.split(',');
            const status = searchParams.get('status');
            const order = searchParams.get('order');
            
            const res = await fetchMangas(
              tags,
              order ? JSON.parse(order) : { followedCount: "desc" },
              pageSize,
              includedTags || [],
              excludedTags ? ["Boys' Love", "doujinshi", ...excludedTags] : ["Boys' Love", "doujinshi"],
              currentPage - 1,
              status
            );

            setMangas(res.data);
            setTotalManga(res.total);
          }

        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      setMangas([]);
    };
  }, [location.search, currentPage]);


  // Event handler for pagination click
  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Event handler to toggle search form visibility
  const showSearchForm = () => {
    setVis(prevVis => !prevVis)
  }

  // Event handler to close error message
  const handleCloseError = () => {
    setError("")
  };

  return (
    <div
      className={`bg-[#1F1F1F] px-5 py-5 ${vis ? "h-[100svh]" : "h-[max-content]"
        } relative overflow-hidden`}
    >
      <div className="top-0 z-20 flex justify-between">
        <p className="px-2 md:px-4 py-2 text-[10px] md:text-[25px] ml-2 text-white">
          ALL <span className="text-[#F4B333]">UPLOADS</span>
        </p>
        <button
          className="flex justify-center items-center w-[150px] text-[10px] md:text-[25px] px-2 md:px-5 py-1 text-white bg-blue-500 rounded hover:bg-blue-400"
          onClick={showSearchForm}
        >
          Search
          <MagnifyingGlassIcon className="w-4 h-4 md:w-8 md:h-8 text-gray ml-[10px]" />
        </button>
      </div>
      <div
        className={`${vis ? "block" : "hidden"
          } inset-0 py-20 bg-[#000] z-10 absolute overflow-y-scroll`}
      >
        <SearchForm
          setVis={setVis}
          setMangaVis={setMangaVis}
          setError={setError}
          setLoading={setLoading}
        />
      </div>
      {isLoading ? (
        <>
          <div className="no-manga">
            <p className="text-center text-white">No manga</p>
          </div>
          <div className="flex items-center justify-center popOut">
            <MagnifyingGlass
              type="Audio"
              height={80}
              width={80}
              color="green"
              ariaLabel="loading"
            />
          </div>
        </>
      ) : error ? (
        <>
          <div className="no-manga">
            <p className="text-center text-white">No manga</p>
          </div>
          <div
            className={`popOut ${error ? "flex" : "hidden"
              } items-center justify-center`}
          >
            <div className="relative mx-auto w-[85%] md:w-[300px] h-[300px]">
              <button onClick={() => handleCloseError()}>
                <XCircleIcon className="absolute text-black w-7 h-7 top-7 right-1" />
              </button>
              <div className="w-full md:w-[300px] h-[300px] flex justify-center items-center text-center rounded-md py-2 bg-[#fff]">
                <p>{error}</p>
              </div>
            </div>
          </div>
        </>
      ) : mangas?.length > 0 ? (
        <>
          <div
            className={`${mangaVis ? "block" : "hidden"
              } grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center content-center gap-x-2 gap-y-8 mt-16`}
          >
            {mangas.map((manga) => (
              <MangaCard key={manga.id} manga={manga} />
            ))}
          </div>
        </>
      ) : (
        <div className="no-manga">
          <p className="text-center text-white">No manga</p>
        </div>
      )}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePaginationClick}
      />
    </div>
  );
}

export default Search;
