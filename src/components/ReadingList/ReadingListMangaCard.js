import React, { useState } from 'react';
import useMangaCover from "../../hooks/manga/useMangaCover";
import { useAuth } from '../../Auth/AuthProvider';
import { useReadingList } from '../../context/ReadingListContext';
import showToast from '../../utils/toastUtils';
import { Circles } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

function ReadingListMangaCard({ manga }) {
    const { data: coverFilename, isLoading: isCoverLoading, isError: isCoverError } = useMangaCover(manga.manga);

    const PROXY_SERVER_URL = 'https://yuki-proxy-server.netlify.app';

    const { token } = useAuth();

    const { updateManga, deleteManga } = useReadingList();
    const [selectedReading, setSelectedReading] = useState(manga.status);
    const [loadingReadingList, setLoadingReadingList] = useState(false);

    const userId = JSON.parse(localStorage.getItem("user"))?._id;

    const handleReadingSelect = async (status) => {
        try {
            setSelectedReading(status);

            setLoadingReadingList(true);

            if (status === "Remove from list") {
                await deleteManga(token, userId, manga.manga);
            } else {
                await updateManga(token, userId, manga.manga, status);
            }

        } catch (error) {
            showToast(
                error.response?.data?.message || 'An error occurred while updating the reading list status.',
                "info"
            );
        } finally {
            setLoadingReadingList(false);
        }
    };

    const statusButtons = ['Reading', 'Completed', 'On-Hold', 'Dropped', 'Plan to Read'];

    return (
        <div className="z-0 flex p-4 border-b border-gray-300">
            <div className="flex-shrink-0">
                {
                    isCoverLoading || isCoverError ?
                        <div className="flex-shrink-0">
                            <div className="w-20 bg-gray-200 rounded-md h-28 animate-pulse" />
                        </div>
                        :
                        <Link to={`/manga/${manga.manga}/overview`}>
                            <img
                                src={`${PROXY_SERVER_URL}/images/${manga.manga}/${encodeURIComponent(coverFilename)}`}
                                alt={manga?.title.split(" ").slice(0, 3).join(" ") + "..."}
                                loading="eager"
                                decoding='async'
                                fetchPriority='high'
                                className="object-cover w-20 text-white text-[10px] h-28 text-center"
                            />
                        </Link>
                }

            </div>
            <div className="flex flex-col ml-4">
                <Link to={`/manga/${manga.manga}/overview`} className="hover:underline hover:underline-offset-1 hover:decoration-blue-500" >
                    <h2 className="text-[16px] lg:text-xl font-semibold text-white">{manga.title}</h2>
                </Link>
                <p className="text-gray-500">{manga.manga_status}</p>
                <div className="flex items-center my-2 text-white">
                    <p className="mr-4 text-[13px]">Rating: <span className='text-gray-500'>{manga?.statistics?.rating.toFixed(2)}</span></p>
                    <p className='text-[13px]'>Follows:  <span className='text-gray-500'>{manga?.statistics?.follow.toLocaleString()}</span></p>
                </div>

                {/* Reading list status buttons */}
                <div className="flex flex-wrap mt-2 gap-y-2">
                    {/* Render buttons or select based on screen width */}
                    {
                        <select
                            className={`block md:hidden px-2 py-1 rounded bg-blue-500 text-[13px] ${loadingReadingList && selectedReading === "Remove from list" ? "text-[#FF004D]" : loadingReadingList ? "text-[blue]" : "text-white"}`}
                            value={selectedReading}
                            onChange={(e) => handleReadingSelect(e.target.value)}
                            disabled={loadingReadingList}
                        >
                            {[...statusButtons, "Remove from list"].map((status) => (
                                <option key={status} value={status} className='text-white'>
                                    {loadingReadingList && selectedReading === status ? (
                                        <span>
                                            Loading...
                                        </span>
                                    ) : (
                                        status
                                    )}
                                </option>
                            ))}
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
                                height="20"
                                width="20"
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
                </div>
            </div>
        </div >
    );
}

export default ReadingListMangaCard;
