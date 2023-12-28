import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useManga } from "../utils/fetchManga"
import { MangaCover } from "../utils/fetchMangaCover";
import { MangaStatistics } from "../utils/fetchMangaStatistics";
import HorizontalScrollMenu from '../components/HorizontalScrollMenu';
import MangaCards from '../components/MangaCards';
import MangaCard from '../components/MangaCard';
import MangaCardSkeleton from '../components/MangaCardSkeleton';
import { MangaOverviewSkeleton } from '../components/MangaOverviewSkeleton';

function MangaOverview() {
    let { id } = useParams();

    const [selectedReading, setSelectedReading] = useState("");
    const [relatedManga, setRelatedManga] = useState([]);
    const [loadingRelatedManga, setLoadingRelatedManga] = useState(true);
    const [isLastItem, setIsLastItem] = useState(false);


    const { data: mangaData, isLoading, isError, error } = useManga(id);
    const { data: coverFilename, isLoading: isCoverLoading, isError: isCoverError, error: coverError } = MangaCover(id);
    const { data: statistics, isLoading: isStatsLoading, isError: isStatsError, error: statsError } = MangaStatistics(id);

    useEffect(() => {
        const fetchRelatedManga = async () => {
            try {
                // const relatedMangaData = [];
                if (isCoverLoading === false) {
                    for (const relationship of mangaData?.relationships || []) {
                        if (relationship.type === 'manga') {
                            const response = await axios.get(`https://manga-proxy-server.onrender.com/api?url=${encodeURIComponent(`https://api.mangadex.org/manga/${relationship.id}`)}`);
                            const manga = response.data.data;
                            // relatedMangaData.push(manga);
                            setRelatedManga(prevList => [...prevList, manga]);
                        }
                    }
                    setLoadingRelatedManga(false)
                }
                // setRelatedManga(relatedMangaData);
            } catch (error) {
                console.error('Error fetching related manga:', error);
            }
        };

        fetchRelatedManga();
    }, [mangaData, isCoverLoading]);

    const imageUrl = coverFilename || "coverFilename";

    const { rating, follows } = statistics || {};

    const handleReadingSelect = (category) => {
        setSelectedReading(category);
    };

    const myList = ['Reading', 'Completed', 'On-Hold', 'Dropped', 'Plan to Read']

    const mangaDetails = [
        { label: 'Status', value: mangaData?.attributes?.status || "No Status" },
        { label: 'Demographic', value: mangaData?.attributes?.publicationDemographic || "No Demographic".slice(0, 6) + "..." },
        { label: 'Year', value: mangaData?.attributes?.year || "No date" },
        { label: 'Rating', value: `${rating?.average?.toString().slice(0, 3)} ⭐` || "No rating" },
        { label: 'follows', value: follows || 0 }
    ];


    console.log(statistics)
    return (
        <div className='text-white w-[90%] h-[100%] mt-4 mx-auto'>
            {isCoverLoading || isStatsLoading || loadingRelatedManga || isLoading || isCoverError || isStatsError || isError ? (
                <>
                    <MangaOverviewSkeleton />
                    <div className='bg-[#1F1F1F] mt-10'>
                        <div className='flex flex-col items-center justify-center px-[5px] md:px-[20px]'>
                            <h4 className='gradient-1 font-Kanit font-bold text-[20px] md:text-[35px] my-1 self-start'>RELATED MANGA</h4>
                            <HorizontalScrollMenu>
                                {
                                    [...Array(20)].map((_, index) => (
                                        <div key={index} className='mr-5'>
                                            <MangaCardSkeleton itemId={index} title={index} key={index} />
                                        </div>
                                    ))
                                }
                            </HorizontalScrollMenu>
                        </div>
                    </div>
                    <div className='bg-[#1F1F1F] mt-4'>
                        <div className='flex flex-col items-center justify-center px-[5px] md:px-[20px]'>
                            <h4 className='gradient-2 font-Kanit font-bold text-[20px] md:text-[35px] my-1 self-start'>YOU MIGHT LIKE THIS</h4>
                            <HorizontalScrollMenu>
                                {
                                    [...Array(20)].map((_, index) => (
                                        <div key={index} className='mr-5'>
                                            <MangaCardSkeleton itemId={index} title={index} key={index} />
                                        </div>
                                    ))
                                }
                            </HorizontalScrollMenu>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className='flex flex-wrap xl:flex-nowrap justify-center text-center my-4'>
                        {mangaDetails.map((detail, index) => (
                            <div
                                key={index}
                                className='text-[10px] md:text-[15px] px-4 md:px-7 py-2 basis-1/3 border-2 border-[#1F1F1F] font-medium tracking-[0.1em] lg:tracking-[0.2em] cursor-pointer bg-white text-[#1F1F1F]'
                            >
                                {detail.value}
                            </div>
                        ))}
                    </div>
                    <div className='flex flex-col md:flex-row justify-between items-center md:items-start mt-8 md:space-x-10'>
                        <div className='h-[300px] w-[90%] md:w-[400px] shadow-yellow rounded-md'>
                            <img src={`https://manga-proxy-server.onrender.com/image?url=${encodeURIComponent(`https://uploads.mangadex.org/covers/${id}/${imageUrl}`)}`} alt={mangaData?.attributes.title.en} className=" h-full w-full object-cover rounded-md" />
                        </div>
                        <div className='mt-4 md:mt-0 w-[95%] md:w-full'>
                            <p className="mb-3 mt-5 md:mt-0 text-[14px] text-start text-white">{mangaData?.attributes.description.en ? mangaData?.attributes.description.en : mangaData?.attributes.title.en}</p>
                            <div className='mt-6 flex justify-center flex-col'>
                                <p className='text-[20px]'>Category</p>
                                <div className='grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-2 mt-4 w-[100%] md:w-[100%]'>
                                    {mangaData?.attributes.tags.slice(0, 10).map((item) => (
                                        <div
                                            className={`py-1 px-1 flex items-center justify-center rounded-md font-semibold text-center bg-white text-[10px] md:text-[13px] tracking-[0.1em] border border-[#1F1F1F] text-[#1F1F1F]`}
                                            key={item.id}
                                        >
                                            {item.attributes.name.en.toString()}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className='mt-6'>
                                <p className='text-[20px]'>My List</p>
                                <div className='flex flex-wrap lg:flex-nowrap mt-4 border-box'>
                                    {/* <div className='grid grid-cols-5 gap-2 mt-4'> */}
                                    {myList.map((item, index) => (
                                        <button
                                            className={`md:basis-1/5 mr-1 md:mr-2 grow my-1 px-3 py-1 rounded-md font-semibold text-center text-[10px] md:text-[13px] tracking-[0.1em] border border-[#1F1F1F]
                                    ${selectedReading === item
                                                    ? "bg-blue-500 text-white"
                                                    : "bg-gray-200 text-[#1F1F1F]"
                                                }`}
                                            key={index}
                                            onClick={() => handleReadingSelect(item)}
                                        >
                                            {item}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        relatedManga.length > 0 ?
                            <div className='bg-[#1F1F1F] mt-10'>
                                <div className='flex flex-col items-center justify-center px-[5px] md:px-[20px]'>
                                    <h4 className='gradient-1 font-Kanit font-bold text-[20px] md:text-[35px] my-1 self-start'>RELATED MANGA</h4>
                                    <HorizontalScrollMenu>
                                        {relatedManga?.map((manga) => (
                                            <div className='mr-5'>
                                                <MangaCard
                                                    itemId={manga.id}
                                                    title={manga.id}
                                                    key={manga.id}
                                                    manga={manga}
                                                    setIsLastItem={setIsLastItem}
                                                />
                                            </div>
                                        ))
                                        }
                                        {isLastItem && relatedManga.length > 1 && <SeeMoreLink />}
                                    </HorizontalScrollMenu>
                                </div>
                            </div> : null
                    }
                    <div className='bg-[#1F1F1F] mt-4'>
                        <div className='flex flex-col items-center justify-center px-[5px] md:px-[20px]'>
                            <h4 className='gradient-2 font-Kanit font-bold text-[20px] md:text-[35px] my-1 self-start'>YOU MIGHT LIKE THIS</h4>
                            <MangaCards type={"mostViewed"} order={{ rating: 'desc', followedCount: 'desc' }} limit={10} includedTags={mangaData.attributes.tags.map(item => item.attributes.name.en)} excludedTags={['']} />
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

const SeeMoreLink = () => {
    return (
        <div className="md:mr-7 flex justify-center bg-white text-black font-medium tracking-[0.3em] hover:bg-[#E40066] hover:text-white items-center cursor-pointer h-[100%] w-[100px] bottom-2 left-14">
            <p className="text-center">See More</p>
        </div>
    );
};

export default MangaOverview;