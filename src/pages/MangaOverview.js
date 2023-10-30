import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useManga } from "../fetchers/fetchManga"
import { MangaCover } from "../fetchers/fetchMangaCover";
import { MangaStatistics } from "../fetchers/fetchMangaStatistics";
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
                const relatedMangaData = [];
                if (isCoverLoading === false) {
                    for (const relationship of mangaData?.relationships) {
                        if (relationship.type === 'manga') {
                            const response = await axios.get(`https://api.mangadex.org/manga/${relationship.id}`);
                            const manga = response.data.data;
                            relatedMangaData.push(manga);
                        }
                    }
                    setLoadingRelatedManga(false)
                }
                setRelatedManga(relatedMangaData);
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
        { label: 'Status', value: mangaData?.attributes.status },
        { label: 'Demographic', value: mangaData?.attributes.publicationDemographic },
        { label: 'Year', value: mangaData?.attributes.year },
        { label: 'Rating', value: `${rating?.average.toString().slice(0, 3)} ⭐` },
        { label: 'follows', value: follows }
    ];

    return (
        <div className='text-white w-[90%] mt-4 mx-auto'>
            {isCoverLoading || isStatsLoading || isLoading || isCoverError || isStatsError || isError || loadingRelatedManga ? (
                <>
                    <MangaOverviewSkeleton />
                    <div className='bg-[#1F1F1F] mt-10'>
                        <div className='flex flex-col items-center justify-center px-[20px]'>
                            <h4 className='text-white text-[25px] my-6 self-start'>Related Manga</h4>
                            <HorizontalScrollMenu>
                                {
                                    [...Array(20)].map((_, index) => (
                                        <MangaCardSkeleton itemId={index} title={index} key={index} />
                                    ))
                                }
                            </HorizontalScrollMenu>
                        </div>
                    </div>
                    <div className='bg-[#1F1F1F]'>
                        <div className='flex flex-col items-center justify-center px-[20px]'>
                            <h4 className='text-white text-[25px] my-6 self-start'>If you like this manga, you might like</h4>
                            <HorizontalScrollMenu>
                                {
                                    [...Array(20)].map((_, index) => (
                                        <MangaCardSkeleton itemId={index} title={index} key={index} />
                                    ))
                                }
                            </HorizontalScrollMenu>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className='flex text-center my-4'>
                        {mangaDetails.map((detail, index) => (
                            <div
                                key={index}
                                className='px-7 py-2 basis-1/3 border-2 border-[#1F1F1F] font-medium tracking-[0.3em] cursor-pointer bg-white text-[#1F1F1F]'
                            >
                                {detail.value}
                            </div>
                        ))}
                    </div>
                    <div className='flex justify-between mt-8 space-x-10'>
                        <img src={`https://uploads.mangadex.org/covers/${id}/${imageUrl}`} alt={mangaData?.attributes.title.en} loading="lazy" className="h-[400px] w-[250px] object-cover shadow-yellow rounded-md" />
                        <div className='mt-4'>
                            <p className="mb-3 text-[14px] text-center text-white text-start">{mangaData?.attributes.description.en ? mangaData?.attributes.description.en : mangaData?.attributes.title.en}</p>
                            <div className='mt-6'>
                                <p className='text-[20px]'>Category</p>
                                <div className='grid grid-cols-5 gap-2 mt-4'>
                                    {mangaData?.attributes.tags.slice(0, 10).map((item) => (
                                        <div
                                            className={`px-3 py-1 flex items-center justify-center rounded-md font-semibold text-center bg-white text-[13px] tracking-[0.1em] border border-[#1F1F1F] text-[#1F1F1F]`}
                                            key={item.id}
                                        >
                                            {item.attributes.name.en}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className='mt-6'>
                                <p className='text-[20px]'>My List</p>
                                <div className='grid grid-cols-5 gap-2 mt-4'>
                                    {myList.map((item, index) => (
                                        <button
                                            className={`px-3 py-1 rounded-md font-semibold text-center text-[13px] tracking-[0.1em] border border-[#1F1F1F]
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
                        relatedManga.length > 1 ?
                            <div className='bg-[#1F1F1F] mt-10'>
                                <div className='flex flex-col items-center justify-center px-[20px]'>
                                    <h4 className='text-white text-[25px] my-6 self-start'>Related Manga</h4>
                                    <HorizontalScrollMenu>
                                        {relatedManga?.map((manga) => (
                                            <MangaCard
                                                itemId={manga.id}
                                                title={manga.id}
                                                key={manga.id}
                                                manga={manga}
                                                setIsLastItem={setIsLastItem}
                                            />
                                        ))
                                        }
                                        {isLastItem && relatedManga.length > 1 && <SeeMoreLink />}
                                    </HorizontalScrollMenu>
                                </div>
                            </div> : null
                    }
                    <div className='bg-[#1F1F1F] mt-4'>
                        <div className='flex flex-col items-center justify-center px-[20px]'>
                            <h4 className='text-white text-[25px] my-6 self-start'>If you like this manga, you might like</h4>
                            <MangaCards type={"mostViewed"} order={{ rating: 'desc', followedCount: 'desc' }} limit={20} includedTags={mangaData.attributes.tags.map(item => item.attributes.name.en)} excludedTags={['']} />
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

const SeeMoreLink = () => {
    return (
        <div className="mr-7 flex justify-center bg-white text-black font-medium tracking-[0.3em] hover:bg-[#E40066] hover:text-white items-center cursor-pointer h-[100%] w-[100px] bottom-2 left-14">
            <p>See More</p>
        </div>
    );
};

export default MangaOverview;