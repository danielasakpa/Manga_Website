import React, { useState, useEffect } from 'react';
import { MangaCover } from "../../API/fetchMangaCover";
import { MangaStatistics } from "../../API/fetchMangaStatistics";
import { useManga } from "../../API/fetchManga";
import { useAuth } from '../../Auth/AuthProvider';
import { useReadingList } from '../../context/ReadingListContext';
import ReadingListMangaCardSkeleton from './ReadingListMangaCardSkeleton';
import showToast from '../../utils/toastUtils';
import { Circles } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

function ReadingListMangaCard({ manga, updateReadingList }) {
    const { data: mangaData, isLoading: isMangaLoading, isError: isMangaError } = useManga(manga.manga);
    const { data: coverFilename, isLoading: isCoverLoading, isError: isCoverError } = MangaCover(manga.manga);
    const { data: statistics, isLoading: isStatsLoading, isError: isStatsError } = MangaStatistics(manga.manga);

    const PROXY_SERVER_URL = 'https://manga-proxy-server.onrender.com';

    const { isAuthenticated, token } = useAuth();

    const { addManga, updateManga, getManga, deleteManga } = useReadingList();
    const [selectedReading, setSelectedReading] = useState("");
    const [isInReadingList, setIsInReadingList] = useState(false);
    const [loadingReadingList, setLoadingReadingList] = useState(false);

    const userId = localStorage.getItem("userId");

    useEffect(() => {
        const fetchReadingStatus = async () => {
            if (isAuthenticated() && token) {
                const mangaInList = await getManga(token, userId, manga.manga);

                if (mangaInList?.manga.manga === manga.manga) {
                    setSelectedReading(mangaInList.manga.status);
                    setIsInReadingList(true);
                }
            }
        };

        fetchReadingStatus();
    }, [getManga, isAuthenticated, token, manga.manga, userId]);

    const handleReadingSelect = async (status) => {
        try {
            setSelectedReading(status);

            setLoadingReadingList(true);

            if (isInReadingList) {
                if (status === "Remove from list") {
                    await deleteManga(token, userId, manga.manga, status);
                    setIsInReadingList(false);
                } else {
                    await updateManga(token, userId, manga.manga, status);
                    setIsInReadingList(true);
                }
            } else {
                await addManga(token, userId, manga.manga, status);
                setIsInReadingList(true);
            }

            setLoadingReadingList(false);
        } catch (error) {
            showToast(
                error.response?.data?.message || 'An error occurred while updating the reading list status.',
                "info"
            );
        }
    };

    if (isMangaLoading || isCoverLoading || isStatsLoading || isMangaError || isCoverError || isStatsError) {
        // Handle loading and error states
        return <ReadingListMangaCardSkeleton />;
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
                        src={`${PROXY_SERVER_URL}/images/${manga.manga}/${encodeURIComponent(imageUrl)}`}
                        alt={mangaData.attributes.title.en}
                        loading="lazy"
                        className="object-cover w-20 text-white h-28"
                    />
                </Link>
            </div>
            <div className="flex flex-col ml-4">
                <Link to={`/manga/${manga.manga}/overview`} className="hover:underline hover:underline-offset-1 hover:decoration-blue-500" >
                    <h2 className="text-[16px] lg:text-xl font-semibold text-white">{title}</h2>
                </Link>
                <p className="text-gray-500">{mangaData.attributes.status}</p>
                <div className="flex items-center my-2 text-white">
                    <p className="mr-4 text-[13px]">Rating: <span className='text-gray-500'>{rating?.average?.toFixed(2)}</span></p>
                    <p className='text-[13px]'>Follows:  <span className='text-gray-500'>{follows.toLocaleString()}</span></p>
                </div>
                {/* Reading list status buttons */}
                <div className="flex mt-2">
                    {/* Render buttons or select based on screen width */}
                    {
                        <select
                            className={`block md:hidden px-2 py-1 rounded bg-white text-[13px] ${loadingReadingList ? "text-[#FF004D]" : "text-gray-500"}`}
                            value={selectedReading}
                            onChange={(e) => handleReadingSelect(e.target.value)}
                            disabled={loadingReadingList}
                        >
                            {statusButtons.map((status) => (
                                <option key={status} value={status}>
                                    {loadingReadingList && selectedReading === status ? (
                                        <span>
                                            Loading...
                                        </span>
                                    ) : (
                                        status
                                    )}
                                </option>
                            ))}
                            {isInReadingList && (
                                <option value="Remove from list">Remove from list</option>
                            )}
                        </select>
                    }

                    {statusButtons.map((status) => (
                        <button
                            key={status}
                            className={`hidden md:flex items-center justify-center text-[12px] px-1 py-1 mr-2 w-[100px] h-[30px] rounded ${selectedReading === status
                                ? 'bg-blue-500 text-white'
                                : 'bg-white text-gray-500'
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
                            ) : (
                                status
                            )}
                        </button>
                    ))}
                    {/* Render the "Remove from list" button for mobile */}
                    {
                        isInReadingList && (
                            <button
                                className={`flex justify-center items-center hidden md:block px-2 py-1 rounded ${selectedReading === 'Remove from list'
                                    ? 'bg-red-500 text-white'
                                    : 'bg-white text-[13px] text-red-500'
                                    }`}
                                onClick={() => handleReadingSelect('Remove from list')}
                                disabled={loadingReadingList}
                            >
                                {loadingReadingList && selectedReading === 'Remove from list' ? (
                                    <Circles
                                        height="35"
                                        width="35"
                                        color="#ffffff"
                                        ariaLabel="circles-loading"
                                        wrapperStyle={{}}
                                        wrapperClass=""
                                        visible={true}
                                    />
                                ) : (
                                    'Remove from list'
                                )}
                            </button>
                        )}
                </div>
            </div>
        </div >
    );
}

export default ReadingListMangaCard;
