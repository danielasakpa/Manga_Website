import React, { useState, useEffect } from 'react';
import { MangaCover } from "../utils/fetchMangaCover";
import { MangaStatistics } from "../utils/fetchMangaStatistics";
import { useManga } from "../utils/fetchManga";
import { useAuth } from '../Auth/AuthProvider';
import { addManga, updateManga, deleteManga, getManga } from '../utils/readingListUtils';
import showToast from '../utils/toastUtils';
import { Circles } from 'react-loader-spinner'
import { Link } from 'react-router-dom';

function ReadingListMangaCard({ manga, updateReadingList }) {
    const { data: mangaData, isLoading: isMangaLoading, isError: isMangaError } = useManga(manga.manga);
    const { data: coverFilename, isLoading: isCoverLoading, isError: isCoverError } = MangaCover(manga.manga);
    const { data: statistics, isLoading: isStatsLoading, isError: isStatsError } = MangaStatistics(manga.manga);

    const { isAuthenticated, token } = useAuth();

    const [selectedReading, setSelectedReading] = useState("");
    const [isInReadingList, setIsInReadingList] = useState(false);
    const [loadingReadingList, setLoadingReadingList] = useState(false);

    const userId = JSON.parse(localStorage.getItem('user'))?._id;

    useEffect(() => {
        const fetchReadingStatus = async () => {
            try {
                if (isAuthenticated() && token) {
                    const res = await getManga(token, userId, manga.manga);
                    const mangaInList = JSON.parse(res);

                    if (mangaInList.manga.manga === manga.manga) {
                        setSelectedReading(mangaInList.manga.status);
                        setIsInReadingList(true);
                    }
                }
            } catch (error) {
                console.error('Error fetching reading status:', error);
            }
        };

        fetchReadingStatus();
    }, [isAuthenticated, token, manga.manga, userId]);

    const handleReadingSelect = async (status) => {
        try {
            setSelectedReading(status);

            setLoadingReadingList(true);

            if (isInReadingList) {
                if (status === "Remove from list") {
                    await deleteManga(token, userId, manga.manga, status);
                    setIsInReadingList(false);
                    showToast("Manga was removed from the list");
                } else {
                    await updateManga(token, userId, manga.manga, status);
                    setIsInReadingList(true);
                    showToast("Manga was updated in the list");
                }
            } else {
                await addManga(token, userId, manga.manga, status);
                setIsInReadingList(true);
                showToast("Manga was added to the list");
            }

            setLoadingReadingList(false);
            updateReadingList()
        } catch (error) {
            showToast(
                error.response?.data?.message || 'An error occurred while updating the reading list status.',
                "info"
            );
        }
    };

    if (isMangaLoading || isCoverLoading || isStatsLoading || isMangaError || isCoverError || isStatsError) {
        // Handle loading and error states
        return (
            <div>
                {/* Add loading or error UI */}
            </div>
        );
    }

    const imageUrl = coverFilename;
    const { rating, follows } = statistics;

    const getTitle = (language) => {
        const altTitle = mangaData.attributes.altTitles.find((title) => title[language]);
        return altTitle ? altTitle[language] : mangaData.attributes.title.en;
    };

    const title = getTitle('en') || getTitle('ja') || mangaData.attributes.title.en;

    const statusButtons = ['Reading', 'Completed', 'On-Hold', 'Dropped', 'Plan to Read'];

    return (
        <div className="flex p-4 border-b border-gray-300">
            <div className="flex-shrink-0">
                <Link to={`/manga/${manga.manga}/overview`}>
                    <img
                        src={`https://manga-proxy-server.onrender.com/image?url=${encodeURIComponent(`https://uploads.mangadex.org/covers/${manga.manga}/${imageUrl}`)}`}
                        alt={mangaData.attributes.title.en}
                        loading="lazy"
                        className="w-20 h-28 object-cover text-white"
                    />
                </Link>
            </div>
            <div className="ml-4 flex flex-col">
                <Link to={`/manga/${manga.manga}/overview`} className="hover:underline hover:underline-offset-1 hover:decoration-blue-500" >
                    <h2 className="text-xl font-semibold text-white">{title}</h2>
                </Link>
                <p className="text-gray-500">{mangaData.attributes.status}</p>
                <div className="flex items-center mt-2 text-white">
                    <p className="mr-4">Rating: <span className='text-gray-500'>{rating?.average?.toFixed(2)}</span></p>
                    <p>Follows:  <span className='text-gray-500'>{follows.toLocaleString()}</span></p>
                </div>
                {/* Reading list status buttons */}
                <div className="flex mt-2">
                    {statusButtons.map((status) => (
                        <button
                            key={status}
                            className={`flex items-center justify-center px-1 py-1 mr-2 w-[100px] h-[30px] rounded ${selectedReading === status ? 'bg-blue-500 text-white' : 'bg-white text-[13px] text-gray-500'
                                }`}
                            onClick={() => handleReadingSelect(status)}
                            disabled={loadingReadingList}
                        >
                            {loadingReadingList && selectedReading === status ? (
                                <Circles
                                    height="20"
                                    width="20"
                                    color="#ffffff"
                                    ariaLabel="circles-loading"
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                    visible={true}
                                />
                            )
                                :
                                status
                            }
                        </button>
                    ))}
                    {isInReadingList && (
                        <button
                            className={`px-2 py-1 rounded ${selectedReading === "Remove from list" ? 'bg-red-500 text-white' : 'bg-white text-[13px] text-red-500'
                                }`}
                            onClick={() => handleReadingSelect("Remove from list")}
                            disabled={loadingReadingList}
                        >
                            {loadingReadingList && selectedReading === "Remove from list" ? (
                                <Circles
                                    height="35"
                                    width="35"
                                    color="#ffffff"
                                    ariaLabel="circles-loading"
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                    visible={true}
                                />
                            )
                                :
                                "Remove from list"
                            }
                        </button>
                    )}
                </div>
            </div>
        </div >
    );
}

export default ReadingListMangaCard;
