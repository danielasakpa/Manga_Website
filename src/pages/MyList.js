import React, { useEffect, useState } from 'react'
import { getReadingList } from '../utils/readingListUtils';
import { useAuth } from '../Auth/AuthProvider';
import ReadingListMangaCard from '../components/ReadingListMangaCard';
import { Circles } from 'react-loader-spinner'
import showToast from '../utils/toastUtils';
import LogIngSvg from '../assets/Login-bro.svg';
import { Link } from 'react-router-dom';

function MyList() {

    const { isAuthenticated, token } = useAuth();

    const [readingList, setReadingList] = useState([]);
    const [isLoadingList, setIsLoadingList] = useState(false);

    const userId = JSON.parse(localStorage.getItem('user'))?._id;

    useEffect(() => {

        const fetchRelatedManga = async () => {

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
                showToast(`Reading list not found`, "error");
            }
        }

        fetchRelatedManga();
    }, [])

    const updateReadingList = async () => {
        try {
            const res = await getReadingList(token, userId);
            const updatedList = JSON.parse(res);
            if (updatedList) {
                setReadingList(updatedList.readingList.mangas.reverse());
            }
        } catch (error) {
            console.error('Error updating reading list:', error);
        }
    };

    console.log(isAuthenticated())


    return (
        <>
            <div className={`${isLoadingList || Object.keys(readingList).length < 1 || !isAuthenticated() ? "h-[100vh]" : "h-[100%]"}  bg-[#1F1F1F] w-full relative`}>
                {
                    isLoadingList ?
                        <div className="popOut flex items-center justify-center">
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
                                        <div className='w-full h-full flex justify-center items-center'>
                                            <h1 className='text-white text-[30px]'>User has no reading list</h1>
                                        </div>
                                        :
                                        readingList.map(manga => (
                                            <ReadingListMangaCard key={manga.manga} manga={manga} updateReadingList={updateReadingList} />
                                        ))
                                    :
                                    <div className='w-full h-full flex justify-center items-center'>
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