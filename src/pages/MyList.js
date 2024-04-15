import React, { useEffect, useState } from 'react'
import { useAuth } from '../Auth/AuthProvider';
import ReadingListMangaCard from '../components/ReadingList/ReadingListMangaCard';
import { Circles } from 'react-loader-spinner'
import LogIngSvg from '../assets/Login-bro.svg';
import { Link, useLocation} from 'react-router-dom';
import { useReadingList } from '../context/ReadingListContext';
import showToast from '../utils/toastUtils';

function MyList() {
    const location = useLocation()

    const { isAuthenticated, error } = useAuth();
    const { readingList, getReadingList, isLoadingList, readingListError, setIsLoadingList, setReadingListError } = useReadingList();
    const [sortedList, setSortedList] = useState([]);

    useEffect(() => {
        const fetchReadingList = async () => {
            try {
                if (isAuthenticated()) {
                    setIsLoadingList(true);
                    await getReadingList();
                }
            } catch (error) {
                setReadingListError(error.message);
                showToast(`Error getting reading list: ${error.message}`, "error");
            } finally {
                setIsLoadingList(false);
            }
        };

        fetchReadingList();
    }, []);

    useEffect(() => {
        // Initialize the sorted list with the original reading list
        setSortedList(readingList);
    }, [readingList]);

    const handleFilter = (status = "All") => {

        // Filter the reading list based on the selected status
        const filteredList = status === 'All' ? readingList : readingList.filter(manga => manga.status === status);

        // Update the sorted list with the filtered list
        setSortedList(filteredList);
    };

    const statusList = ['All', 'Reading', 'Completed', 'On-Hold', 'Dropped', 'Plan to Read'];

    return (
        <>
            <div className={`min-h-[100vh] h-[max-content] my-list bg-[#1F1F1F] w-full relative`}>
                <div className="sticky top-0 z-10 flex-wrap items-center justify-start hidden gap-2 px-4 py-6 mb-5 bg-white md:flex">
                    {statusList.map(status => (
                        <button key={status} onClick={() => handleFilter(status)} className="text-white text-[12px] md:text-[15px] bg-[#F4B333] border border-[#1F1F1F] tracking-[0.2em] px-2 py-1 md:px-3 md:py-2 rounded mr-2">{status}</button>
                    ))}
                </div>
                {
                    isLoadingList ?
                        <div className="flex items-center justify-center popOut">
                            <Circles
                                height="35"
                                width="35"
                                color="#ffffff"
                                ariaLabel="circles-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                            />
                        </div>
                        :
                        <>
                            {
                                isAuthenticated() ?
                                    Object.keys(readingList).length < 1 ?
                                        <div className='flex items-center justify-center w-full h-full'>
                                            <h1 className='text-white text-[15px] md:text-[30px]'>
                                                {
                                                    readingListError
                                                }
                                            </h1>
                                        </div>
                                        :
                                        sortedList?.reverse().map(manga => (
                                            <ReadingListMangaCard key={manga.manga} manga={manga} />
                                        ))
                                    :
                                    <div className='flex items-center justify-center w-full h-full'>
                                        <div className="  w-[90%] lg:w-[40%] h-[300px] border-0 rounded-lg shadow-lg relative flex flex-col justify-center items-center pt-4 bg-white outline-none focus:outline-none">
                                            <img src={LogIngSvg} alt='' className='h-[150px]' />
                                            <p className="mb-5 text-[16px] font-Kanit font-medium">Sign is required before continuing</p>
                                            <Link to={"/login"} state={{prevUrl: location.pathname}} className='w-[60%]' >
                                                <button className='text-white text-[13px] font-bold bg-[#1B6FA8] hover:bg-[#E40066] border-2 border-[#1F1F1F] w-[100%] px-2 py-2 mb-2 rounded'>Sign in</button>
                                            </Link>
                                        </div>
                                    </div>
                            }
                        </>
                }
            </div>
        </>
    )
}

export default MyList