import MangaCategories from './MangaCategories';
import MangaStatusButtons from './MangaStatusButtons';

// Manga Image and Description Section Component
const MangaImageAndDescriptionSection = ({ imageUrl, mangaData, myList, selectedReading, loadingReadingList, handleReadingSelect }) => {
    return (
        <div className='flex flex-col md:flex-row justify-between items-center md:items-start mt-8 md:space-x-10'>
            <div className='h-[300px] w-[90%] md:w-[400px] shadow-yellow rounded-md'>
                <img src={imageUrl} alt={mangaData?.attributes.title.en} className="h-full w-full object-cover rounded-md" />
            </div>
            <div className='mt-4 md:mt-0 w-[95%] md:w-full'>
                <p className="mb-3 mt-5 md:mt-0 text-[14px] text-start text-white">{mangaData?.attributes.description.en ? mangaData?.attributes.description.en : mangaData?.attributes.title.en}</p>
                <MangaCategories mangaData={mangaData} />
                <MangaStatusButtons myList={myList} selectedReading={selectedReading} handleReadingSelect={handleReadingSelect} loadingReadingList={loadingReadingList} />
            </div>
        </div>
    );
};

export default MangaImageAndDescriptionSection;