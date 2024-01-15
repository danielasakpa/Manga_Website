// Import statements
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { useManga } from "../utils/fetchManga";
import { MangaCover } from "../utils/fetchMangaCover";
import { MangaStatistics } from "../utils/fetchMangaStatistics";
import RelatedMangaSkeleton from '../components/RelatedMangaSkeleton';
import YouMightLikeThisSkeleton from '../components/YouMightLikeThisSkeleton';
import MangaDetailsSection from '../components/MangaDetailsSection';
import MangaImageAndDescriptionSection from '../components/MangaImageAndDescriptionSection';
import RelatedMangaSection from '../components/RelatedMangaSection';
import RecommendedMangaSection from '../components/RecommendedMangaSection';
import { MangaOverviewSkeleton } from '../components/MangaOverviewSkeleton';
import { addManga, updateManga, getManga, deleteManga } from '../utils/readingListUtils';
import { useAuth } from '../Auth/AuthProvider';
import showToast from '../utils/toastUtils';
import { XCircleIcon } from "@heroicons/react/24/outline";
import LogIngSvg from '../assets/Login-bro.svg';

function MangaOverview() {
    // Get manga id from URL params
    let { id } = useParams();

    const { isAuthenticated, token } = useAuth();

    // State variables
    const [selectedReading, setSelectedReading] = useState("");
    const [relatedManga, setRelatedManga] = useState([]);
    const [loadingRelatedManga, setLoadingRelatedManga] = useState(true);
    const [loadingReadingList, setLoadingReadingList] = useState(false);
    const [isInReadingList, setIsInReadingList] = useState(false);
    const [authenticated, setAuthenticated] = useState(true);
    const [vis, setVis] = useState(false);

    // User and manga IDs with token
    const userId = JSON.parse(localStorage.getItem('user'))?._id;
    const mangaId = id;
    // const token = localStorage.getItem('token');

    // Fetch manga data, cover, and statistics
    const { data: mangaData, isLoading, isError } = useManga(id);
    const { data: coverFilename, isLoading: isCoverLoading } = MangaCover(id);
    const { data: statistics, isLoading: isStatsLoading } = MangaStatistics(id);

    // Fetch related manga
    useEffect(() => {
        const fetchRelatedManga = async () => {
            try {
                if (!isCoverLoading) {
                    for (const relationship of mangaData?.relationships || []) {
                        if (relationship.type === 'manga') {
                            const response = await axios.get(`https://manga-proxy-server.onrender.com/api?url=${encodeURIComponent(`https://api.mangadex.org/manga/${relationship.id}`)}`);
                            const manga = response.data.data;
                            setRelatedManga(prevList => [...prevList, manga]);
                        }
                    }
                    setLoadingRelatedManga(false);
                }
            } catch (error) {
                showToast(error.message, "error");
            }
        };

        fetchRelatedManga();
    }, [mangaData, isCoverLoading]);

    // Check if the manga is in the reading list
    useEffect(() => {
        const fetchMangaInList = async () => {
            try {

                if (userId && token) {
                    const res = await getManga(token, userId, mangaId);
                    const mangaInList = JSON.parse(res);

                    if (mangaInList.manga.manga === mangaId) {
                        setSelectedReading(mangaInList.manga.status);
                        setIsInReadingList(true);
                    }
                }

            } catch (error) {
                // showToast(error.message, "error");
            }
        }

        fetchMangaInList();
    }, [mangaId, token, userId]);

    // Handle selection of reading status
    const handleReadingSelect = async (status) => {

        if (!isAuthenticated()) {
            setAuthenticated(false);
            setVis(prevVis => !prevVis)
            return;
        }

        try {
            setSelectedReading(status);
            setLoadingReadingList(true);

            if (isInReadingList) {
                if (status === "Remove form list") {
                    await deleteManga(token, userId, mangaId, status);
                    setIsInReadingList(false);
                    showToast("Manga was removed from the list");
                } else {
                    await updateManga(token, userId, mangaId, status);
                    setIsInReadingList(true);
                    showToast("Manga was updated in the list");
                }
            } else {
                if (status === "Remove form list") {
                    showToast("This Manga does not exist in the list and can't be deleted");
                } else {
                    await addManga(token, userId, mangaId, status);
                    setIsInReadingList(true);
                    showToast("Manga was added to the list");
                }
            }

            setLoadingReadingList(false);
        } catch (error) {
            showToast(
                error.response?.data?.message || 'An error occurred while adding the Manga to the Reading List.',
                "info"
            );
        }
    };

    const handleCloseMenu = () => {
        setVis(prevVis => !prevVis)
    };

    // Manga cover URL
    const imageUrl = coverFilename || "coverFilename";

    // Manga details
    const { rating, follows } = statistics || {};
    const myList = ['Reading', 'Completed', 'On-Hold', 'Dropped', 'Plan to Read', 'Remove form list'];
    const mangaDetails = [
        { label: 'Status', value: mangaData?.attributes?.status || "No Status" },
        { label: 'Demographic', value: mangaData?.attributes?.publicationDemographic || "No Demographic".slice(0, 6) + "..." },
        { label: 'Year', value: mangaData?.attributes?.year || "No date" },
        { label: 'Rating', value: `${rating?.average?.toString().slice(0, 3)} ⭐` || "No rating" },
        { label: 'follows', value: follows || 0 }
    ];

    return (
        <div className='text-white w-[90%] h-[100%] mt-4 mx-auto'>
            {isLoading || isCoverLoading || isStatsLoading || loadingRelatedManga || isError ? (
                // Skeleton loading UI
                <>
                    <MangaOverviewSkeleton />
                    <RelatedMangaSkeleton />
                    <YouMightLikeThisSkeleton />
                </>
            ) : (
                // Manga Overview Content
                <>
                    <MangaDetailsSection mangaDetails={mangaDetails} />
                    <MangaImageAndDescriptionSection
                        imageUrl={`https://manga-proxy-server.onrender.com/image?url=${encodeURIComponent(`https://uploads.mangadex.org/covers/${id}/${imageUrl}`)}`}
                        mangaData={mangaData}
                        myList={myList}
                        selectedReading={selectedReading}
                        loadingReadingList={loadingReadingList}
                        handleReadingSelect={handleReadingSelect}
                    />
                    <RelatedMangaSection relatedManga={relatedManga} />
                    <RecommendedMangaSection mangaData={mangaData} />
                    {!authenticated && (
                        <>
                            <div
                                className={`${vis ? "flex" : "hidden"}  justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none`}
                            >
                                <div className="  w-[90%] lg:w-[40%] h-[300px] border-0 rounded-lg shadow-lg relative flex flex-col justify-center items-center pt-4 bg-white outline-none focus:outline-none">
                                    <button onClick={() => handleCloseMenu()}>
                                        <XCircleIcon className="w-7 h-7 text-black absolute top-2 right-2" />
                                    </button>
                                    <img src={LogIngSvg} alt='' className='h-[150px]' />
                                    <p className="mb-5 text-[16px] font-Kanit font-medium">Sign is required before continuing</p>
                                    <Link to={"/login"} className='w-[60%]' >
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
};

export default MangaOverview;
