import React, { useState } from 'react'
import MangaSlider from '../components/MangaSlider';
import MangaCards from '../components/MangaCards';

function Home() {

    const [selectedCategory, setSelectedCategory] = useState("");

    const categories = [
        "Action",
        "Adventure",
        "Comedy",
        "Drama",
        "Fantasy",
        "Horror",
        "Romance",
        "Sci-Fi",
        "Slice of Life",
        "Sports",
        "Thriller",
        "Historical",
        "Psychological",
        "School Life",
        "Shounen",
        "Shoujo",
        "Seinen",
        "Josei",
    ];

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    return (
        <div className='w-full'>
            <div className='flex justify-center w-full mt-10'>
                <MangaSlider />
            </div>

            <div className='flex justify-center w-full mt-10'>
                <div className="pt-4 w-[90%]">
                    <h4 className="text-[20px] tracking-[0.4em] font-semibold mb-3"><span className='text-[#E40066]'>Hot</span> Categories</h4>
                    <div className="flex flex-wrap justify-center rounded-t-lg p-5 gap-4 bg-[#F4B333]">
                        {categories.map((category, index) => (
                            <button
                                key={index}
                                className={`px-2 md:px-6 py-2 text-[11px] md:text-[20px] rounded-md font-semibold tracking-[0.2em] border border-[#1F1F1F] text-[##1F1F1F]
                                ${selectedCategory === category
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-200 text-[#1F1F1F]"
                                    }`}
                                onClick={() => handleCategorySelect(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div className='py-5 bg-[#1F1F1F]'>
                <div className='flex flex-col items-center justify-center px-[20px] py-4'>
                    <h4 className='gradient-1 font-Bebas font-bold text-[25px] md:text-[45px] my-1 self-start'>Most Viewed</h4>
                    <MangaCards type={"viewedMost"} order={{ rating: 'desc', followedCount: 'desc' }} limit={10} includedTags={[]} excludedTags={[]} />
                </div>
                <div className='flex flex-col items-center justify-center px-[20px] py-4'>
                    <h4 className='gradient-2 font-Bebas font-bold text-[25px] md:text-[45px] my-1 self-start'>Popular New</h4>
                    <MangaCards type={"popularNew"} order={{ year: 'desc', rating: 'desc' }} limit={10} includedTags={[]} excludedTags={[]} />
                </div>
                <div className='flex flex-col items-center justify-center px-[20px] py-4'>
                    <h4 className='gradient-3 font-Bebas font-bold text-[25px] md:text-[45px] my-1 self-start'>Recently Added</h4>
                    <MangaCards type={"recentlyAdded"} order={{ year: 'desc' }} limit={10} includedTags={[]} excludedTags={[]} />
                </div>
            </div>

        </div>
    )
}

export default Home