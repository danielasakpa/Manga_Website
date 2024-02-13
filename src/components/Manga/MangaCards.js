import { useState, useEffect } from 'react';
import MangaCard from './MangaCard';
import MangaCardSkeleton from './MangaCardSkeleton';
import useMangas from '../../hooks/manga/useMangas';
import HorizontalScrollMenu from '../HorizontalScrollMenu/HorizontalScrollMenu';
import SeeMoreLink from '../SeeMoreLink/SeeMoreLink';

const MangaCards = ({ type, order, limit, includedTags, excludedTags }) => {

    const [page, setPage] = useState(0);
    const { data, isLoading, isError, error } = useMangas(type, order, limit, includedTags, excludedTags, page);
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

export default MangaCards;
