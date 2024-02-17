import HorizontalScrollMenu from '../HorizontalScrollMenu/HorizontalScrollMenu';
import MangaCard from './MangaCard';


// Related Manga Section Component
const RelatedMangaSection = ({ relatedManga, setIsLastItem }) => {
    return (
        relatedManga.length > 0 &&
        <div className='bg-[#1F1F1F] mt-10'>
            <div className='flex flex-col items-center justify-center px-[5px] md:px-[20px]'>
                <h4 className='gradient-1 font-Kanit font-bold text-[20px] md:text-[35px] my-1 self-start'>RELATED MANGA</h4>
                <HorizontalScrollMenu>
                    {relatedManga?.map((manga) => (
                        <div className='mr-5' key={manga.id}>
                            <MangaCard
                                itemId={manga.id}
                                title={manga.id}
                                key={manga.id}
                                manga={manga}
                                setIsLastItem={setIsLastItem}
                            />
                        </div>
                    ))}
                </HorizontalScrollMenu>
            </div>
        </div>
    );
};

export default RelatedMangaSection;