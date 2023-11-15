import { useState } from 'react';
import MangaCard from './MangaCard';
import MangaCardSkeleton from './MangaCardSkeleton';
import { useMangasFetcher } from '../utils/fetchMangas';
import HorizontalScrollMenu from './HorizontalScrollMenu';

const MangaCards = ({ type, order, limit, includedTags, excludedTags }) => {
    const { data, isLoading, isError, error } = useMangasFetcher(type, order, limit, includedTags, excludedTags);
    const [isLastItem, setIsLastItem] = useState(false);

    return (
        <HorizontalScrollMenu>
            {isLoading || isError ? (
                [...Array(20)].map((_, index) => (
                    <MangaCardSkeleton itemId={index} title={index} key={index} />
                ))
            ) : (
                data?.map((manga) => (
                    <div className='mr-5'>
                        <MangaCard
                            itemId={manga.id}
                            title={manga.id}
                            key={manga.id}
                            manga={manga}
                            setIsLastItem={setIsLastItem}
                        />
                    </div>
                ))
            )}
            {isLastItem && data.length > 1 && <SeeMoreLink />}
        </HorizontalScrollMenu>
    );
};

const SeeMoreLink = () => {
    return (
        <div className="mr-7 flex justify-center bg-white text-black font-medium tracking-[0.3em] hover:bg-[#E40066] hover:text-white items-center cursor-pointer h-[100%] w-[100px] bottom-2 left-14">
            <p>See More</p>
        </div>
    );
};

export default MangaCards;
