import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import useChapterData from "../utils/fetchMangaChapter";
import useMangaChapters from '../utils/fetchMangaChapters';

function MangaChapter() {
    const { id, chapterId } = useParams();

    const { data, isLoading, isError, error } = useChapterData(chapterId);

    const { data: chaptersData, isLoading: isChaptersLoading, isError: isChaptersError, error: chaptersError } = useMangaChapters(
        id,
        ['en']
    );

    const [selectedChapter, setSelectedChapter] = useState(chapterId);

    if (isChaptersLoading || isLoading) {
        return (
            <div className="flex bg-[#1F1F1F] w-full justify-center items-center h-[80%] px-10">
                <p className='text-[20px] text-white'>Loading manga chapter...</p>
            </div>
        );
    }

    if (isChaptersError || isError) {
        return (
            <div className="flex bg-[#1F1F1F] w-full justify-center items-center h-[500px] px-10">
                <p className='text-[20px] text-white'>Error fetching manga chapter...</p>
            </div>
        );
    }

    // Filter the chapters array to remove duplicates based on the chapter number
    const filteredChapters = chaptersData.data.filter((chapter, index, self) => {
        // Find the index of the first occurrence of the chapter number in the array
        const firstIndex = self.findIndex((c) => c.attributes.chapter === chapter.attributes.chapter);

        // Keep only the chapter if its index matches the first occurrence index
        return index === firstIndex;
    });

    const sortedChapters = filteredChapters.sort((a, b) => {
        return parseInt(a.attributes.chapter, 10) - parseInt(b.attributes.chapter, 10);
    });

    const handleChapterChange = (e) => {
        const selectedChapter = e.target.value;
        setSelectedChapter(selectedChapter);
    };

    const handlePrevChapter = () => {
        const currentIndex = sortedChapters.findIndex((chapter) => chapter.id === selectedChapter);
        if (currentIndex > 0) {
            const prevChapter = sortedChapters[currentIndex - 1];
            setSelectedChapter(prevChapter.id);
        }
    };

    const handleNextChapter = () => {
        const currentIndex = sortedChapters.findIndex((chapter) => chapter.id === selectedChapter);
        if (currentIndex < sortedChapters.length - 1) {
            const nextChapter = sortedChapters[currentIndex + 1];
            setSelectedChapter(nextChapter.id);
        }
    };


    const currentIndex = sortedChapters.findIndex((chapter) => chapter.id === selectedChapter);

    return (
        <div className='bg-[#1F1F1F] w-full p-5'>
            <div className='flex justify-between mb-4'>
                {selectedChapter !== sortedChapters[0]?.id && (
                    <Link
                        to={`/manga/${id}/chapter/${sortedChapters[currentIndex - 1]?.id}`}
                        className='px-4 py-2 text-white bg-gray-800 rounded hover:bg-gray-700'
                        onClick={handlePrevChapter}
                    >
                        Previous Chapter
                    </Link>
                )}
                <div>
                    <select
                        value={selectedChapter}
                        onChange={handleChapterChange}
                        className='px-4 py-2 bg-white text-black rounded'
                    >
                        {sortedChapters.map((chapter) => (
                            <option key={chapter.id} value={chapter.id}>
                                Chapter {chapter.attributes.chapter}
                            </option>
                        ))}
                    </select>
                    <Link
                        to={`/manga/${id}/chapter/${selectedChapter}`}
                        className='px-4 py-2 ml-2 text-white bg-blue-500 rounded hover:bg-blue-400'
                    >
                        Go
                    </Link>
                </div>
                {selectedChapter !== sortedChapters[sortedChapters.length - 1]?.id && (
                    <Link
                        to={`/manga/${id}/chapter/${sortedChapters[currentIndex + 1]?.id}`}
                        className='px-4 py-2 text-white bg-gray-800 rounded hover:bg-gray-700'
                        onClick={handleNextChapter}
                    >
                        Next Chapter
                    </Link>
                )}
            </div>
            <div className='mt-7'>
                {data?.data.map((img) => (
                    <img src={`${data.baseUrl}/data/${data.hash}/${img}`} alt='manga img' loading="lazy" className='mx-auto object-cover mb-3 w-[700px]' key={img} />
                ))}
            </div>
        </div>
    );
}

export default MangaChapter;
