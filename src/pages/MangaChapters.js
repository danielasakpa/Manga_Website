import React from 'react';
import { useParams, Link } from 'react-router-dom';
import useMangaChapters from '../utils/fetchMangaChapters';

function MangaChapters() {
    let { id } = useParams();

    const { data: chaptersData, isLoading: isChaptersLoading, isError: isChaptersError, error: chaptersError } = useMangaChapters(
        id,
        ['en']
    );

    if (isChaptersLoading) {
        return (
            <div className="flex justify-center items-center h-[500px] mt-16 px-10">
                <p className='text-[13px] md:text-[20px] text-white'>Loading manga chapters...</p>
            </div>
        );
    }

    if (isChaptersError) {
        return (
            <div className="flex justify-center items-center h-[500px] mt-16 px-10">
                <p className='text-[13px] md:text-[20px] text-white'>Error fetching manga chapters..</p>
            </div>
        );
    }

    // Filter the chapters array to remove duplicates based on the chapter number
    const filteredChapters = chaptersData.data.filter(
        (chapter, index, self) => {
            // Find the index of the first occurrence of the chapter number in the array
            const firstIndex = self.findIndex(
                (c) => c.attributes.chapter === chapter.attributes.chapter
            );

            // Keep only the chapter if its index matches the first occurrence index
            return index === firstIndex;
        }
    );

    const sortedChapters = filteredChapters.sort((a, b) => {
        return parseInt(a.attributes.chapter, 10) - parseInt(b.attributes.chapter, 10);
    });

    return (
        <div className="text-white h-[100%]">
            {
                chaptersData.data.length < 1 ?
                    <div className="flex justify-center items-center h-[90%] mt-16 px-10">
                        <p className='text-[13px] md:text-[20px] text-center text-white'>No Available chapters...</p>
                    </div>
                    :
                    <div className="overflow-x-hidden overflow-auto h-[90%] mt-8 md:mt-16 px-10">
                        {sortedChapters.map((chapter) => (
                            <Link key={chapter.id} className='' to={`/manga/${id}/chapter/${chapter.id}`}>
                                <div className="py-2 md:py-4 px-3 text-[13px] md:text-[20px] bg-white my-3 text-black rounded-md font-medium hover:bg-[#E40066] hover:text-white cursor-pointer" key={chapter.id}>
                                    Chapter {chapter.attributes.chapter}
                                </div>
                            </Link>
                        ))}
                    </div>
            }
        </div>
    );
}

export default MangaChapters;
