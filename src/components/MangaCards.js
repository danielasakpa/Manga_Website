import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import MangaCard from './MangaCard';
import MangaCardSkeleton from './MangaCardSkeleton';
import { useMangasFetcher } from '../utils/fetchMangas';
import HorizontalScrollMenu from './HorizontalScrollMenu';
import { fetchMangas } from '../utils/fetchMangas';
import { Oval } from 'react-loader-spinner'

const MangaCards = ({ type, order, limit, includedTags, excludedTags }) => {
    const queryClient = useQueryClient();

    const [page, setPage] = useState(0);
    const { data, isLoading, isError, error } = useMangasFetcher(type, order, limit, includedTags, excludedTags, page);
    const [mangaList, setMangaList] = useState([]);
    const [isLastItem, setIsLastItem] = useState(false);
    const [isLoadingNewMangas, setILoadingNewMangas] = useState(false);

    // Update manga list when new data is loaded
    useEffect(() => {
        if (data && data.data.length > 0) {
            setILoadingNewMangas(false);
            setMangaList(prevList => [...prevList, ...data.data]);
        }
    }, [data]);

    const handleSeeMore = () => {
        // Increment the page when "See More" is clicked
        setILoadingNewMangas(true);
        setPage(prevPage => prevPage + 1);

        if ((page * limit) <= data.total) {
            queryClient.prefetchQuery([type, page], () => fetchMangas(order, includedTags, excludedTags, limit, page));
        }
    };

    return (
        <HorizontalScrollMenu>
            {isLoading || isError ? (
                [...Array(20)].map((_, index) => (
                    <div className="mr-5" key={index}>
                        <MangaCardSkeleton itemId={index} title={index} />
                    </div>
                ))
            ) : (
                mangaList.map((manga, i) => (
                    <div className="mr-5" key={manga.id + i}>
                        <MangaCard
                            itemId={manga.id + i}
                            title={manga.id + i}
                            manga={manga}
                            setIsLastItem={setIsLastItem}
                        />
                    </div>
                ))
            )}
            {isLastItem && mangaList.length > 1 && <SeeMoreLink onClick={handleSeeMore} isLoadingNewMangas={isLoadingNewMangas} />}
        </HorizontalScrollMenu>
    );
};

const SeeMoreLink = ({ onClick, isLoadingNewMangas }) => {
    console.log(isLoadingNewMangas)
    return (
        <div
            className="md:mr-7 flex justify-center items-center bg-white text-black font-medium tracking-[0.3em] hover:bg-[#E40066] hover:text-white cursor-pointer h-[100%] w-[100px] bottom-2 left-14"
            onClick={onClick}
        >
            {
                isLoadingNewMangas ?
                    <Oval
                        visible={true}
                        height="30"
                        width="30"
                        color="#000000"
                        ariaLabel="oval-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                    :
                    <p className="text-center">See More</p>
            }
        </div>
    );
};

export default MangaCards;
