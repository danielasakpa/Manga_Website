import React from 'react'

const CarouselImageSkeleton = () => {
    return (
        <div className="w-full flex-shrink-0 relative flex justify-left pt-[130px] pl-[20px] bg-gray-300 bg-contain bg-center bg-no-repeat animate-pulse">
            <div className="absolute inset-0 bg-black bg-opacity-50" />
            <div className="absolute flex items-center px-2 py-1 space-x-2 bg-white top-4 right-4">
                <span className="font-semibold rounded-[4px]">Loading</span>
            </div>
            <div className="z-10 w-[90%] md:w-[70%]">
                <div className="h-8 bg-gray-400 w-[100%] rounded mb-2" />
                <div className="h-6 mb-5 bg-gray-400" />
                <div className="h-10 bg-gray-400 rounded w-[60%]" />
            </div>
            <div className="absolute bottom-4 left-4 font-semibold tracking-[0.4em] bg-white text-gray-800 px-10 py-2 rounded-[4px]">
                Loading
            </div>
        </div>
    );
}

export default CarouselImageSkeleton 