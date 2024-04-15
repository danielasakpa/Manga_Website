import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { XCircleIcon } from "@heroicons/react/24/outline";

// Hooks
import { useManga } from "../hooks/manga/useManga";
import { useAuth } from '../Auth/AuthProvider';
import { useReadingList } from '../context/ReadingListContext';
import useMangaStatistics from "../hooks/manga/useMangaStatistics";

// Components
import { MangaOverviewSkeleton } from '../components/Manga/MangaOverviewSkeleton';
import MangaImageAndDescriptionSection from '../components/Manga/MangaImageAndDescriptionSection';
import RelatedMangaSection from '../components/Manga/RelatedMangaSection';
import RecommendedMangaSection from '../components/Manga/RecommendedMangaSection';


// Utils
import showToast from '../utils/toastUtils';
import LogIngSvg from '../assets/Login-bro.svg';


const MangaOverview = React.memo(() => {
    // Get manga id from URL params
    let { id } = useParams();

    const location = useLocation()

    const { isAuthenticated, token } = useAuth();

    const { addManga, updateManga, getManga, deleteManga } = useReadingList();
    const [selectedReading, setSelectedReading] = useState("");
    const [loadingReadingList, setLoadingReadingList] = useState(false);
    const [isInReadingList, setIsInReadingList] = useState(false);
    const [authenticated, setAuthenticated] = useState(true);
    const [vis, setVis] = useState(false);

    // User and manga IDs with token
    const userId = JSON.parse(localStorage.getItem("user"))?._id;
    const mangaId = id;

    // Fetch manga data
    const { data: mangaData, isLoading, isError } = useManga(id);
    const { data: statistics, isLoading: isStatsLoading } = useMangaStatistics(id);


    // Check if the manga is in the reading list
    useEffect(() => {
        const fetchMangaInList = async () => {
            if (userId && token) {
                const mangaInList = await getManga(token, userId, mangaId);

                if (mangaInList?.manga.manga === mangaId) {
                    setSelectedReading(mangaInList.manga.status);
                    setIsInReadingList(true);
                }
            }
        };

        fetchMangaInList();
    }, [getManga, mangaId, token, userId]);

    // Handle selection of reading status
    const handleReadingSelect = async (status) => {
        if (!isAuthenticated()) {
            setAuthenticated(false);
            setVis(prevVis => !prevVis);
            return;
        }

        try {
            setSelectedReading(status);
            setLoadingReadingList(true);

            if (isInReadingList) {
                if (status === "Remove form list") {
                    await deleteManga(token, userId, mangaId);
                    setIsInReadingList(false);
                    setSelectedReading("");
                } else {
                    await updateManga(token, userId, mangaId, status);
                    setIsInReadingList(true);
                }
            } else {
                if (status === "Remove form list") {
                    showToast("This Manga does not exist in the list and can't be deleted");
                } else {
                    const getTitle = (language) => {
                        const altTitle = mangaData.attributes.altTitles.find((title) => title[language]);
                        return altTitle ? altTitle[language] : mangaData.attributes.title.en;
                    };

                    const title = getTitle('en') || getTitle('ja') || mangaData.attributes.title.en;

                    await addManga(token, userId, mangaId, status, { title, manga_status: mangaData.attributes.status, statistics: { follow: statistics?.follows, rating: statistics?.rating?.average } });
                    setIsInReadingList(true);
                }
            }

        } catch (error) {
            showToast(
                error.response?.data?.message || 'An error occurred while adding the Manga to the Reading List.',
                "info"
            );
        } finally {
            setLoadingReadingList(false);
        }
    };

    const handleCloseMenu = () => {
        setVis(prevVis => !prevVis);
    };



    return (
        <div className='text-white w-[90%] h-[100%] mt-4 mx-auto'>
            {isLoading || isStatsLoading || isError ? (
                // Skeleton loading UI
                <>
                    <MangaOverviewSkeleton />
                </>
            ) : (
                <>
                    <MangaImageAndDescriptionSection
                        id={id}
                        mangaData={mangaData}
                        statistics={statistics}
                        isStatsLoading={isStatsLoading}
                        selectedReading={selectedReading}
                        loadingReadingList={loadingReadingList}
                        handleReadingSelect={handleReadingSelect}
                    />
                    <RelatedMangaSection mangaData={mangaData} />
                    <RecommendedMangaSection mangaData={mangaData} />
                    {!authenticated && (
                        <>
                            <div
                                className={`${vis ? "flex" : "hidden"}  justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none`}
                            >
                                <div className="  w-[90%] lg:w-[40%] h-[300px] border-0 rounded-lg shadow-lg relative flex flex-col justify-center items-center pt-4 bg-white outline-none focus:outline-none">
                                    <button onClick={() => handleCloseMenu()}>
                                        <XCircleIcon className="absolute text-black w-7 h-7 top-2 right-2" />
                                    </button>
                                    <img src={LogIngSvg} alt='' className='h-[150px]' />
                                    <p className="mb-5 text-[16px] font-Kanit font-medium">Sign is required before continuing</p>
                                    <Link to={"/login"} state={{prevUrl: location.pathname}} className='w-[60%]' >
                                        <button className='text-white text-[13px] font-bold bg-[#1B6FA8] hover:bg-[#E40066] border-2 border-[#1F1F1F] w-[100%] px-2 py-2 mb-2 rounded'>Sign in</button>
                                    </Link>
                                </div>
                            </div>
                            <div className={`${vis ? "opacity-25 fixed" : "opacity-0"} inset-0 z-40 bg-black`}></div>
                        </>
                    )}
                </>
            )}
        </div>
    );
});

export default MangaOverview;
