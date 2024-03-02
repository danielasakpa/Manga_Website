import React, { useState } from 'react';
import SearchForm from '../components/SearchForm/SearchForm';
import MangaCard from '../components/Manga/MangaCard';
import { MagnifyingGlassIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { useMangaContext } from '../context/MangaContext';
import { MagnifyingGlass } from 'react-loader-spinner'

const Search = () => {
    const { mangas, setMangas, clearMangas, isLoading, setLoading } = useMangaContext();
    const [vis, setVis] = useState(false);
    const [mangaVis, setMangaVis] = useState(true);
    const [error, setError] = useState("");

    const showSearchForm = () => {
        setVis(prevVis => !prevVis)
    }

    const handleCloseError = () => {
        setError("")
    };

    return (
        <div className={`bg-[#1F1F1F] px-5 py-5 ${vis ? "h-[100svh]" : "h-[max-content]"} relative overflow-hidden`}>
            <div className='top-0 z-20 flex justify-between'>
                <p className='px-2 md:px-4 py-2 text-[10px] md:text-[25px] ml-2 text-white'>
                    ALL <span className='text-[#F4B333]'>UPLOADS</span>
                </p>
                <button
                    className='flex justify-center items-center w-[150px] text-[10px] md:text-[25px] px-2 md:px-5 py-1 text-white bg-blue-500 rounded hover:bg-blue-400'
                    onClick={showSearchForm}
                >
                    Search
                    <MagnifyingGlassIcon className="w-4 h-4 md:w-8 md:h-8 text-gray-400 ml-[10px]" />
                </button>
            </div>
            <div className={`${vis ? "block" : "hidden"} inset-0 py-20 bg-[#000] z-10 absolute inset-0 overflow-y-scroll`}>
                <SearchForm setMangas={setMangas} setVis={setVis} setMangaVis={setMangaVis} setError={setError} setLoading={setLoading} />
            </div>
            {isLoading ? (
                <>
                    <div className='no-manga'>
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
                    <div className='no-manga'>
                        <p className="text-center text-white">No manga</p>
                    </div>
                    <div className={`popOut ${error ? "flex" : "hidden"} items-center justify-center`}>
                        <div className='relative w-[300px] h-[300px]'>
                            <button onClick={() => handleCloseError()}>
                                <XCircleIcon className="absolute text-black w-7 h-7 top-7 right-1" />
                            </button>
                            <div className='w-[300px] h-[300px] flex justify-center items-center text-center rounded-md py-2 bg-[#fff]'>
                                <p>{error}</p>
                            </div>
                        </div>
                    </div>
                </>

            ) : (
                mangas.length > 0 ? (
                    <div className={`${mangaVis ? "block" : "hidden"} grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 xl:grid-cols-3 justify-items-center content-center gap-y-8 mt-16`}>
                        {mangas.map((manga) => (
                            <MangaCard
                                key={manga.id}
                                manga={manga}
                            />
                        ))}
                    </div>
                ) : (
                    <div className='no-manga'>
                        <p className="text-center text-white">No manga</p>
                    </div>
                )
            )
            }
        </div >
    )
}

export default Search;
