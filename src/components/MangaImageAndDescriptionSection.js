import React, { useState } from 'react';
import MangaCategories from './MangaCategories';
import MangaStatusButtons from './MangaStatusButtons';

// Manga Image and Description Section Component
const MangaImageAndDescriptionSection = ({ imageUrl, mangaData, myList, selectedReading, loadingReadingList, handleReadingSelect }) => {
    const [showFullDescription, setShowFullDescription] = useState(false);


    const authorRelationship = mangaData.relationships.find(
        (relationship) => relationship.type === 'author'
    );

    const artistRelationship = mangaData.relationships.find(
        (relationship) => relationship.type === 'artist'
    );


    const authorAttributes = authorRelationship?.attributes;
    const artistAttributes = artistRelationship?.attributes;

    const artistName = artistAttributes?.name;
    const authorName = authorAttributes?.name;

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    const truncatedDescription = mangaData?.attributes.description.en ? mangaData?.attributes.description.en.slice(0, 200) : '';
    return (
        <div className='flex flex-col md:flex-row justify-between items-center md:items-start mt-8 md:space-x-10'>
            <div className='h-[300px] w-[90%] md:w-[400px] shadow-yellow rounded-md'>
                <img src={imageUrl} alt={mangaData?.attributes.title.en} className="h-full w-full object-cover rounded-md" />
            </div>
            <div className='mt-4 md:mt-0 w-[95%] md:w-full'>
                <h2 className='mb-3 mt-5 md:mt-0 text-[25px] md:text-[30px] font-bold text-start text-white'>{mangaData?.attributes.title.en}</h2>
                <div className="mb-3 mt-5 md:mt-0 text-[14px]">
                    <span className='text-start text-white mr-1'> {showFullDescription ? mangaData?.attributes.description.en : truncatedDescription} </span>
                    {mangaData?.attributes.description.en.length > 200 && (
                        <span className="cursor-pointer text-blue-500" onClick={toggleDescription}>
                            {showFullDescription ? 'See Less' : 'See More'}
                        </span>
                    )}
                </div>
                <div className='mb-3 mt-5 md:mt-0 flex items-start md:items-center flex-col md:flex-row gap-2'>
                    {authorName && <p className="text-[17px] text-start text-white"><span className='text-[20px] font-semibold'>Author: </span> {authorName}</p>}
                    {artistName && <p className=" text-[17px] text-start text-white"><span className='text-[20px] font-semibold'>Artist: </span> {artistName}</p>}
                </div>

                <MangaCategories mangaData={mangaData} />
                <MangaStatusButtons myList={myList} selectedReading={selectedReading} handleReadingSelect={handleReadingSelect} loadingReadingList={loadingReadingList} />
            </div>
        </div>
    );
};

export default MangaImageAndDescriptionSection;
