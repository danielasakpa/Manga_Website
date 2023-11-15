import React, { useState } from 'react';
import SearchComponent from '../components/Search';
import MangaCard from '../components/MangaCard';
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useMangaContext } from '../context/MangaContext';
import { MagnifyingGlass } from 'react-loader-spinner'

const Search = () => {
    const { mangas, setMangas, clearMangas, isLoading, setLoading } = useMangaContext();
    const [vis, setVis] = useState(false);
    const [mangaVis, setMangaVis] = useState(true);
    const [isLastItem, setIsLastItem] = useState(false);

    console.log(mangas);

    const handleSearch = () => {
        setMangaVis(false);
        setVis(prevVis => !prevVis)
        clearMangas()
    }

    return (
        <div className='bg-[#1F1F1F] px-5 py-5 min-h-[100%] relative'>
            <div className='flex top-0 z-20 justify-between'>
                <p className='px-4 py-2 ml-2 text-white text-[25px]'>
                    ALL <span className='text-[#F4B333]'>UPLOADS</span>
                </p>
                <button
                    className='flex justify-center items-center w-[150px] px-5 py-1 text-white bg-blue-500 rounded hover:bg-blue-400'
                    onClick={() => handleSearch()}
                >
                    Search
                    <MagnifyingGlassIcon className="w-4 h-4 text-gray-400 ml-[10px]" />
                </button>
            </div>
            <div className={`${vis ? "block" : "hidden"} inset-0 py-20  bg-[#000] z-20 absolute inset-0 overflow-y-scroll`}>
                <SearchComponent setMangas={setMangas} setVis={setVis} setMangaVis={setMangaVis} setLoading={setLoading} />
            </div>
            {isLoading ? (
                <div className="searchPopOut">
                    <MagnifyingGlass
                        type="Audio"
                        height={80}
                        width={80}
                        color="green"
                        ariaLabel="loading"
                    />
                </div>
            ) : (
                mangas.length > 0 ? (
                    <div className={`${mangaVis ? "block" : "hidden"} grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 justify-items-center content-center gap-4 mt-16`}>
                        {mangas.map((manga) => (
                            <MangaCard
                                key={manga.id}
                                manga={manga}
                                setIsLastItem={setIsLastItem}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-white text-center w-full">No manga</p>
                )
            )}
        </div>
    )
}

export default Search;
