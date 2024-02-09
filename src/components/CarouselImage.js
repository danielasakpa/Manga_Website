import React, { useState, useEffect } from 'react';
import { MangaCover } from "../utils/fetchMangaCover";
import useMangaChapters from "../utils/fetchMangaChapters";
import CarouselImageSkeleton from '../components/CarouselImageSkeleton ';
import { Link } from "react-router-dom";

const CarouselImage = ({ manga }) => {
    const { data: coverFilename, isLoading: isCoverLoading, isError: isCoverError, error: coverError } = MangaCover(manga.id);
    const { data: chaptersData, isLoading: isChaptersLoading, isError: ischaptersError, error: chaptersError } = useMangaChapters(manga.id);

    const [sortedChapters, setSortedChapters] = useState(null);

    const PROXY_SERVER_URL = 'https://manga-proxy-server.onrender.com';

    useEffect(() => {
        if (chaptersData && chaptersData.data && chaptersData.data.length > 0) {
            const filteredChapters = chaptersData.data.filter(
                (chapter, index, self) => {
                    const firstIndex = self.findIndex(
                        (c) => c.attributes.chapter === chapter.attributes.chapter
                    );
                    return index === firstIndex;
                }
            );

            const sortedChapters = filteredChapters.sort((a, b) => {
                return (
                    parseInt(a.attributes.chapter, 10) - parseInt(b.attributes.chapter, 10)
                );
            });

            setSortedChapters(sortedChapters);
        } else {
            setSortedChapters(null);
        }
    }, [chaptersData]);

    const imageUrl = coverFilename;

    return (
        <>
            {
                isChaptersLoading || isCoverLoading || isCoverError || ischaptersError ?
                    <CarouselImageSkeleton />
                    :
                    <div
                        className="w-full flex-shrink-0 relative flex justify-left pt-[100px] lg:pt-[100px] xl:pt-[70px] pl-2 md:pl-4 pr-4 lg:pr-0 lg:pl-[70px] xl:pl-[120px] bg-gray-600 md:hover:bg-cover cursor-pointer md:hover:bg-top bg-cover md:bg-contain bg-top md:bg-center bg-no-repeat"
                        style={{
                            backgroundImage: `url(${PROXY_SERVER_URL}/images/${manga.id}/${encodeURIComponent(imageUrl)})`,
                        }}
                    >
                        <div className="absolute inset-0 bg-[#1F1F1F] bg-opacity-50 rounded-lg" />
                        <div className="absolute flex items-center px-2 py-1 font-semibold tracking-[0.1em] bg-white text-gray-800 space-x-2 bg-white rounded-md top-4 right-4">
                            <span className="">{manga.type.toUpperCase()}</span>
                        </div>
                        <div className="z-10 lg:w-[60%] ml-3 sm:ml-5 lg:ml-0 ">
                            <h1 className="text-white font-semibold md:text-[40px] text-[25px] leading-9 lg:leading-10 mb-2">
                                {manga.attributes.title.en
                                    ? manga.attributes.title.en.split(" ").slice(0, 3).join(" ")
                                    : manga.attributes.altTitles[0].en.split(" ").slice(0, 3).join(" ")}
                            </h1>
                            <p className="text-white text-[15px] md:text-[17px] mb-5">
                                {manga.attributes.description.en
                                    ? manga.attributes.description.en.split(" ").slice(0, 20).join(" ")
                                    : manga.attributes.title.en}...
                            </p>
                            <div className='list-none mx-auto'>
                                <Link to={`/manga/${manga.id}/overview`} className="flex justify-center items-center text-white font-bold bg-[#1B6FA8] btn border border-[#1F1F1F] w-[60%] px-4 py-2 md:py-3 rounded">
                                    <span className='z-20'> Read Now </span>
                                </Link>
                            </div>
                        </div>
                        {sortedChapters === null ? (
                            <div className="absolute bottom-4 left-2 md:left-4 text-[13px] md:text-[16px] font-semibold tracking-[0.4em] bg-white text-gray-800 px-10 py-2 rounded-lg">
                                No Chapter
                            </div>
                        ) : (
                            <div className="absolute bottom-4 left-2 md:left-4 font-semibold tracking-[0.4em] bg-white text-gray-800 px-10 py-2 rounded-lg">
                                Chapter {sortedChapters[sortedChapters.length - 1].attributes.chapter}
                            </div>
                        )}
                    </div>
            }
        </>
    );
};

export default CarouselImage;
