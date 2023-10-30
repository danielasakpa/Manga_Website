import React from 'react'

const CarouselImageSkeleton = () => {
    return (
        <div className="w-full flex-shrink-0 relative flex justify-left pt-[70px] pl-[120px] bg-gray-300 bg-contain bg-center bg-no-repeat animate-pulse">
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg" />
            <div className="absolute bg-white top-4 right-4 px-2 py-1 flex items-center space-x-2">
                <span className="font-semibold">Loading</span>
            </div>
            <div className="z-10 w-[50%]">
                <div className="h-6 bg-gray-400 rounded mb-2" />
                <div className="h-4 bg-gray-400 w-3/4 mb-5" />
                <div className="h-10 bg-gray-400 rounded w-[60%]" />
            </div>
            <div className="absolute bottom-4 left-4 font-semibold tracking-[0.4em] bg-white text-gray-800 px-10 py-2 rounded-lg">
                Loading
            </div>
        </div>
    );
}

export default CarouselImageSkeleton 