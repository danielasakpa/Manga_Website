import React from 'react';

const ReadingListMangaCardSkeleton = () => {
    return (
        <div className="flex p-4 border-b border-gray-300">
            <div className="flex-shrink-0">
                <div className="w-20 h-28 bg-gray-200 animate-pulse rounded-md" />
            </div>
            <div className="ml-4 flex flex-col">
                <div className="h-6 bg-gray-200 animate-pulse rounded-md mb-2" />
                <div className="text-gray-500 h-4 bg-gray-200 animate-pulse rounded-md mb-2" />
                <div className="flex items-center mt-2 text-white">
                    <div className="mr-4 bg-gray-200 animate-pulse w-16 h-4 rounded-md" />
                    <div className="bg-gray-200 animate-pulse w-16 h-4 rounded-md" />
                </div>
                {/* Reading list status buttons */}
                <div className="flex mt-2">
                    <select
                        className="block md:hidden px-2 py-1 rounded bg-gray-200 text-[13px] text-gray-500"
                        disabled
                    >
                        <option>Loading...</option>
                    </select>

                    {[...Array(5)].map((_, index) => (
                        <div
                            key={index}
                            className={`hidden md:block flex items-center justify-center px-1 py-1 mr-2 w-[100px] h-[30px] rounded bg-gray-200 text-gray-500`}
                        >
                            Loading...
                        </div>
                    ))}

                    <div
                        className={`hidden md:block px-2 py-1 rounded bg-gray-200 text-[13px] text-gray-500`}
                    >
                        Loading...
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReadingListMangaCardSkeleton;
