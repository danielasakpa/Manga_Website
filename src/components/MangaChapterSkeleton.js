import React from 'react';

const MangaChapterSkeleton = () => {
    return (
        <div className="bg-[#1F1F1F] w-full min-h-screen p-5">
            <div className="flex justify-between mb-4">
                <div className="px-2 md:px-4 text-[10px] md:text-[20px] py-2 text-white bg-gray-800 rounded hover:bg-gray-700 animate-pulse">
                    Prev Chap
                </div>
                <div className="flex">
                    <select className="px-2 md:px-4 text-[10px] md:text-[20px] py-2 bg-white text-black rounded animate-pulse">
                        {[...Array(7)].map((_, index) => (
                            <option key={index} value={index + 1}>
                                Chapter {index + 1}
                            </option>
                        ))}
                    </select>
                    <div className="px-2 md:px-4 text-[10px] md:text-[20px] py-2 ml-2 text-white bg-blue-500 rounded hover:bg-blue-400 animate-pulse">
                        Go
                    </div>
                </div>
                <div className="px-2 md:px-4 text-[10px] md:text-[20px] py-2 text-white bg-gray-800 rounded hover:bg-gray-700 animate-pulse">
                    Next Chap
                </div>
            </div>
            <div className="mt-7">
                {[...Array(10)].map((_, index) => (
                    <div
                        key={index}
                        className="w-full h-[500px] bg-gray-200 animate-pulse mb-3"
                    />
                ))}
            </div>
        </div>
    );
};

export default MangaChapterSkeleton;
