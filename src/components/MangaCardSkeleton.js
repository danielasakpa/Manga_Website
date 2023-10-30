import React from 'react'

const MangaCardSkeleton = () => {
    return (
        <div
            className={`relative rounded-lg cursor-pointer w-[160px] h-[200px] lg:w-[300px] lg:h-[530px] mr-5 overflow-hidden shadow-lg bg-white transform transition-transform animate-pulse`}

        >
            <div className="h-[200px] w-[100%] md:h-[300px] bg-gray-200 animate-pulse" />
            <div className="bg-[#1B6FA8] hidden lg:block p-2 flex flex-col items-center justify-center border-y-2 border-[#1F1F1F]">
                <div className="text-lg text-white tracking-[0.2em] mx-auto mb-1 animate-pulse rounded-md bg-gray-400 w-[60%] h-[1.5em]" />
                <p className="text-[16px] text-white animate-pulse  mx-auto bg-gray-400 w-[80%] h-[1em] rounded-md" />
            </div>
            <div className="hidden p-2 lg:block">
                <div className="flex flex-col px-2 mt-1 mb-2">
                    <div className="flex mb-2">
                        <div className="mb-2 mr-2 animate-pulse bg-gray-400 w-[3em] h-[1em] rounded-md" />
                        <div className="mb-2 font-bold animate-pulse bg-gray-400 w-[4em] h-[1em] rounded-md" />
                    </div>
                    <div className="flex flex-wrap space-y-2">
                        <span className="mt-2 mr-2 text-gray-500">Genres:</span>
                        {[...Array(4)].map((_, index) => (
                            <span key={index} className="flex items-center justify-center px-5 mr-1 bg-gray-400 rounded-md px2 animate-pulse" />
                        ))}
                    </div>
                </div>
                <div className="flex items-center px-2 mb-2">
                    <span className="text-gray-500">Rating:</span>
                    <div className="flex items-center ml-1">
                        <span className="mr-1 animate-pulse bg-gray-400 w-[2em] h-[1em] rounded-md" />
                        ⭐
                    </div>
                </div>
                <div className="px-2 ml-2 animate-pulse bg-gray-400 w-[40%] h-[1em] rounded-md" />
            </div>
        </div>

    );
}

export default MangaCardSkeleton 