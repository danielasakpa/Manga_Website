import MangaCardSkeleton from './MangaCardSkeleton';
import HorizontalScrollMenu from '../HorizontalScrollMenu/HorizontalScrollMenu';

// You Might Like This Skeleton Component
const YouMightLikeThisSkeleton = () => {
    return (
        <div className='bg-[#1F1F1F] mt-4'>
            <div className='flex flex-col items-center justify-center px-[5px] md:px-[20px]'>
                <h4 className='gradient-2 font-Kanit font-bold text-[20px] md:text-[35px] my-1 self-start'>YOU MIGHT LIKE THIS</h4>
                <HorizontalScrollMenu>
                    {[...Array(20)].map((_, index) => (
                        <div key={index} className='mr-5'>
                            <MangaCardSkeleton itemId={index} title={index} key={index} />
                        </div>
                    ))}
                </HorizontalScrollMenu>
            </div>
        </div>
    );
};

export default YouMightLikeThisSkeleton;