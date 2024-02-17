import MangaCards from './MangaCards';

// Recommended Manga Section Component
const RecommendedMangaSection = ({ mangaData }) => {
    return (
        <div className='bg-[#1F1F1F] mt-4'>
            <div className='flex flex-col items-center justify-center px-[5px] md:px-[20px]'>
                <h4 className='gradient-2 font-Kanit font-bold text-[20px] md:text-[35px] my-1 self-start'>YOU MIGHT LIKE THIS</h4>
                <MangaCards type={"RecommendedMangaSection"} order={{ rating: 'desc', followedCount: 'desc' }} limit={10} includedTags={mangaData.attributes.tags.map(item => item.attributes.name.en)} excludedTags={['']} />
            </div>
        </div>
    );
};

export default RecommendedMangaSection;