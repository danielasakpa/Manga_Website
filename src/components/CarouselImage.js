import React, { useState, useEffect } from 'react';
import { MangaCover } from "../fetchers/fetchMangaCover";
import useMangaChapters from "../fetchers/fetchMangaChapters";
import CarouselImageSkeleton from '../components/CarouselImageSkeleton ';

const CarouselImage = ({ manga }) => {
    const { data: coverFilename, isLoading: isCoverLoading, isError: isCoverError, error: coverError } = MangaCover(manga.id);
    const { data: chaptersData, isLoading: isChaptersLoading, isError: ischaptersError, error: chaptersError } = useMangaChapters(manga.id);

    const [sortedChapters, setSortedChapters] = useState(null);

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

    if (isCoverLoading || isChaptersLoading) {
        return <CarouselImageSkeleton />;
    }

    const imageUrl = coverFilename;

    return (
        <div
            className="w-full flex-shrink-0 relative flex justify-left pt-[100px] lg:pt-[100px] xl:pt-[70px] pl-2 md:pl-4 pr-4 lg:pr-0 lg:pl-[70px] xl:pl-[120px] bg-gray-600 md:hover:bg-cover cursor-pointer hover:bg-top bg-cover md:bg-contain bg-center bg-no-repeat"
            style={{
                backgroundImage: `url(https://uploads.mangadex.org/covers/${manga.id}/${imageUrl})`,
            }}
        >
            <div className="absolute inset-0 bg-[#1F1F1F] bg-opacity-50 rounded-lg" />
            <div className="absolute flex items-center px-2 py-1 space-x-2 bg-white rounded-md top-4 right-4">
                <span className="font-semibold">{manga.type}</span>
            </div>
            <div className="z-10 lg:w-[60%] ">
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
                <button className="text-white font-bold bg-[#1B6FA8] hover:bg-[#E40066] border-2 border-[#1F1F1F] w-[60%] px-4 py-2 md:py-3 rounded">
                    Read Now
                </button>
            </div>
            {isCoverError || ischaptersError ? <CarouselImageSkeleton /> : null}
            {!coverFilename && <p>No cover found for manga ID</p>}
            {sortedChapters && (
                <div className="absolute bottom-4  left-2 md:left-4 font-semibold tracking-[0.4em] bg-white text-gray-800 px-10 py-2 rounded-lg">
                    Chapter {sortedChapters[sortedChapters.length - 1].attributes.chapter}
                </div>
            )}
        </div>
    );
};

export default CarouselImage;
