import React, { useEffect, useState } from 'react'
import { getReadingList } from '../utils/readingListUtils';
import { useAuth } from '../Auth/AuthProvider';
import ReadingListMangaCard from '../components/ReadingListMangaCard';
import { Circles } from 'react-loader-spinner'

function MyList() {

    const { isAuthenticated, token } = useAuth();

    const [readingList, setReadingList] = useState([]);
    const [isLoadingList, setIsLoadingList] = useState(false);

    const userId = JSON.parse(localStorage.getItem('user'))?._id;

    useEffect(() => {

        const fetchRelatedManga = async () => {

            try {
                setIsLoadingList(true);

                const res = await getReadingList(token, userId);
                const readList = JSON.parse(res);

                if (readList) {
                    setReadingList(readList.readingList.mangas.reverse());
                }

                setIsLoadingList(false);
            } catch (error) {
                console.error('Error fetching related manga:', error);
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

    console.log(readingList)


    return (
        <>
            <div className='h-[100%] bg-[#1F1F1F] w-full relative'>
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
                                readingList.map(manga => (
                                    <ReadingListMangaCard key={manga.manga} manga={manga} updateReadingList={updateReadingList} />
                                ))
                            }
                        </>
                }
            </div>
        </>
    )
}

export default MyList