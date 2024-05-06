import { useMemo } from 'react';

// Manga Details Section Component
const MangaDetailsSection = ({ mangaData, statistics, isStatsLoading }) => {

    const { rating, follows } = statistics || {};

    const mangaDetails = useMemo(() => [
        { label: 'Status', value: mangaData?.attributes?.status || "No Status" },
        { label: 'Demographic', value: mangaData?.attributes?.publicationDemographic || "No Demographic".slice(0, 6) + "..." },
        { label: 'Year', value: mangaData?.attributes?.year || "No date" },
        { label: 'Rating', value: `${rating?.average?.toString().slice(0, 3)} ⭐` || "No rating" },
        { label: 'follows', value: follows || 0 }
    ], [mangaData, rating, follows]);

    return (
        <>
            {
                !isStatsLoading && statistics ?
                    <div className='flex flex-wrap justify-center my-4 text-center xl:flex-nowrap gap-y-1'>
                        {mangaDetails.map((detail, index) => (
                            <div
                                key={index}
                                className='text-[10px] md:text-[15px] px-4 md:px-7 py-2 basis-1/3 border-x-[1.5px] border-opacity-30 border-[#1F1F1F] font-medium tracking-[0.1em] lg:tracking-[0.2em] cursor-pointer bg-white text-[#1F1F1F]'
                            >
                                {
                                    detail.label === "follows" ?
                                        detail.value.toLocaleString()
                                        :
                                        detail.value
                                }
                            </div>
                        ))}
                    </div> :
                    <div className="flex flex-wrap justify-center mt-4 text-center xl:flex-nowrap gap-y-1">
                        {[...Array(5)].map((_, index) => (
                            <div key={index} className="animate-pulse basis-1/3 px-4 py-3.5 md:py-4 w-full md:w-1/3 border-x-[1.5px] border-opacity-30 border-[#1F1F1F] font-medium tracking-[0.3em] cursor-pointer bg-white text-[#1F1F1F]"></div>
                        ))}
                    </div>
            }
        </>
    );
};

export default MangaDetailsSection;