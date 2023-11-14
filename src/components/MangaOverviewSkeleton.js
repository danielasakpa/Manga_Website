import React from 'react';

export const MangaOverviewSkeleton = () => {
    return (
        <div className="text-white w-[90%] mt-4 mx-auto">
            <div className="flex text-center my-4">
                {[...Array(5)].map((_, index) => (
                    <div key={index} className="animate-pulse px-7 py-5 basis-1/3 border-2 border-[#1F1F1F] font-medium tracking-[0.3em] cursor-pointer bg-white text-[#1F1F1F]" ></div>
                ))}
            </div>
            <div className="flex justify-between mt-8 space-x-3">
                <SkeletonImage />
                <div className="mt-4 grow">
                    <SkeletonText />
                    <div className="mt-6">
                        <p className="text-[20px]">Category</p>
                        <div className="grid grid-cols-5 gap-2 mt-4">
                            {[...Array(10)].map((_, index) => (
                                <SkeletonElement key={index} />
                            ))}
                        </div>
                    </div>
                    <div className="mt-6">
                        <p className="text-[20px]">My List</p>
                        <div className="grid grid-cols-5 gap-2 mt-4">
                            {[...Array(5)].map((_, index) => (
                                <SkeletonButton key={index} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const SkeletonElement = () => {
    return (
        <div className="animate-pulse bg-white bg-opacity-20 px-7 py-3 w-24" />
    );
};

const SkeletonImage = () => {
    return (
        <div className="basis-1/4 mr-20 animate-pulse bg-white bg-opacity-20 h-[300px] w-[1500px] shadow-yellow rounded-md" />
    );
};

const SkeletonText = () => {
    return (
        <div className="animate-pulse bg-white bg-opacity-20 mb-3 text-[14px] text-center text-white text-start h-[120px] w-full" />
    );
};

const SkeletonButton = () => {
    return (
        <div className="animate-pulse bg-white bg-opacity-20 px-3 py-1 rounded-md font-semibold text-center text-[13px] tracking-[0.1em] border border-[#1F1F1F] text-[#1F1F1F] h-10" />
    );
};

