// Import statements
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { useManga } from "../hooks/manga/useManga";
import fetchRelatedManga from '../API/manga/fetchRelatedManga';
import useMangaCover from "../hooks/manga/useMangaCover";
import useMangaStatistics from "../hooks/manga/useMangaStatistics";
import RelatedMangaSkeleton from '../components/Manga/RelatedMangaSkeleton';
import YouMightLikeThisSkeleton from '../components/Manga/YouMightLikeThisSkeleton';
import MangaDetailsSection from '../components/Manga/MangaDetailsSection';
import MangaImageAndDescriptionSection from '../components/Manga/MangaImageAndDescriptionSection';
import RelatedMangaSection from '../components/Manga/RelatedMangaSection';
import RecommendedMangaSection from '../components/Manga/RecommendedMangaSection';
import { MangaOverviewSkeleton } from '../components/Manga/MangaOverviewSkeleton';
import { useAuth } from '../Auth/AuthProvider';
import { useReadingList } from '../context/ReadingListContext';
import showToast from '../utils/toastUtils';
import { XCircleIcon } from "@heroicons/react/24/outline";
import LogIngSvg from '../assets/Login-bro.svg';

function MangaOverview() {
    // Get manga id from URL params
    let { id } = useParams();

    const { isAuthenticated, token } = useAuth();

    const { addManga, updateManga, getManga, deleteManga } = useReadingList();
    const [selectedReading, setSelectedReading] = useState("");
    const [relatedManga, setRelatedManga] = useState([]);
    const [loadingRelatedManga, setLoadingRelatedManga] = useState(true);
    const [loadingReadingList, setLoadingReadingList] = useState(true);
    const [isInReadingList, setIsInReadingList] = useState(false);
    const [authenticated, setAuthenticated] = useState(true);
    const [vis, setVis] = useState(false);

    // User and manga IDs with token
    const userId = localStorage.getItem("userId");
    const mangaId = id;

    // Fetch manga data, cover, and statistics
    const { data: mangaData, isLoading, isError } = useManga(id);
    const { data: coverFilename, isLoading: isCoverLoading } = useMangaCover(id);
    const { data: statistics, isLoading: isStatsLoading } = useMangaStatistics(id);

    const PROXY_SERVER_URL = 'https://manga-proxy-server.onrender.com';

    // Fetch related manga
    useEffect(() => {
        const RelatedManga = async () => {
            try {
                for (const relationship of mangaData?.relationships || []) {
                    if (relationship.type === 'manga' && relationship.related !== "doujinshi") {
                        const manga = await fetchRelatedManga(relationship);
                        setRelatedManga(prevList => [...prevList, manga]);
                    }
                }
            } catch (error) {
                showToast(error.message, "error");
            } finally {
                setLoadingRelatedManga(false);
            }
        };

        RelatedManga();
    }, [mangaData]);

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
        }

        fetchMangaInList();
    }, [getManga, mangaId, token, userId]);

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
                    setSelectedReading("");
                } else {
                    await updateManga(token, userId, mangaId, status);
                    setIsInReadingList(true);
                }
            } else {
                if (status === "Remove form list") {
                    showToast("This Manga does not exist in the list and can't be deleted");
                } else {
                    await addManga(token, userId, mangaId, status);
                    setIsInReadingList(true);
                }
            }

            setLoadingReadingList(false);
        } catch (error) {
            setLoadingReadingList(false)
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
            {isLoading || loadingRelatedManga || isStatsLoading || isError ? (
                // Skeleton loading UI
                <>
                    <MangaOverviewSkeleton />
                    <RelatedMangaSkeleton />
                    <YouMightLikeThisSkeleton />
                </>
            ) : (
                <>
                    <MangaDetailsSection mangaDetails={mangaDetails} />
                    <MangaImageAndDescriptionSection
                        isCoverLoading={isCoverLoading}
                        imageUrl={`${PROXY_SERVER_URL}/images/${id}/${encodeURIComponent(imageUrl)}`}
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
                                        <XCircleIcon className="absolute text-black w-7 h-7 top-2 right-2" />
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
