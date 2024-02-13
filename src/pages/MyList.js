import React, { useEffect, useState } from 'react'
import { useAuth } from '../Auth/AuthProvider';
import ReadingListMangaCard from '../components/ReadingList/ReadingListMangaCard';
import { Circles } from 'react-loader-spinner'
import LogIngSvg from '../assets/Login-bro.svg';
import { Link } from 'react-router-dom';
import { useReadingList } from '../context/ReadingListContext';

function MyList() {

    const { isAuthenticated, token, error } = useAuth();

    const { readingList, getReadingList, setReadingList } = useReadingList();
    const [isLoadingList, setIsLoadingList] = useState(false);

    const userId = localStorage.getItem("userId");

    useEffect(() => {

        const fetchReadingList = async () => {

            try {
                if (isAuthenticated()) {
                    setIsLoadingList(true);

                    const res = await getReadingList(token, userId);
                    const readList = JSON.parse(res);

                    if (readList) {
                        setReadingList(readList.readingList.mangas.reverse());
                    }

                    setIsLoadingList(false);
                }
            } catch (error) {
                setIsLoadingList(false);
            }
        }

        fetchReadingList();
    }, [])


    return (
        <>
            <div className={`h-[100vh] pt-5 my-list bg-[#1F1F1F] overflow-y-scroll w-full relative`}>
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
                                                    error ? error : "User has no reading list"
                                                }
                                            </h1>
                                        </div>
                                        :
                                        readingList.map(manga => (
                                            <ReadingListMangaCard key={manga.manga} manga={manga} />
                                        ))
                                    :
                                    <div className='flex items-center justify-center w-full h-full'>
                                        <div className="  w-[90%] lg:w-[40%] h-[300px] border-0 rounded-lg shadow-lg relative flex flex-col justify-center items-center pt-4 bg-white outline-none focus:outline-none">
                                            <img src={LogIngSvg} alt='' className='h-[150px]' />
                                            <p className="mb-5 text-[16px] font-Kanit font-medium">Sign is required before continuing</p>
                                            <Link to={"/login"} className='w-[60%]' >
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