import React from 'react';
import RelatedMangaSkeleton from './RelatedMangaSkeleton';
import YouMightLikeThisSkeleton from './YouMightLikeThisSkeleton';

export const MangaOverviewSkeleton = () => {
  return (
    <>
      <div className="w-full mx-auto mt-4 text-white">
        <div className="flex flex-wrap justify-center mt-4 text-center xl:flex-nowrap gap-y-1">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="animate-pulse basis-1/3 px-4 py-3.5 md:py-4 w-full md:w-1/3 border-1 md:mx-[2px] border-[#1F1F1F] font-medium tracking-[0.3em] cursor-pointer bg-white text-[#1F1F1F]"></div>
          ))}
        </div>
        <div className='flex flex-col items-center mt-3 mb-6 md:mt-8 md:flex-row md:items-start md:gap-8'>
          <SkeletonImage />
          <div className="flex-grow w-full md:w-2/3">
            <SkeletonText />
            <div className="mt-6">
              <p className="text-[20px]">Category</p>
              <div className="grid grid-cols-2 gap-2 mt-4 md:grid-cols-5">
                {[...Array(10)].map((_, index) => (
                  <SkeletonElement key={index} />
                ))}
              </div>
            </div>
            <div className="mt-6">
              <p className="text-[20px]">My List</p>
              <div className="grid grid-cols-2 gap-2 mt-4 md:grid-cols-5">
                {[...Array(5)].map((_, index) => (
                  <SkeletonButton key={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <RelatedMangaSkeleton />
      <YouMightLikeThisSkeleton />
    </>
  );
};

const SkeletonElement = () => {
  return (
    <div className="w-full px-4 py-2 bg-white animate-pulse bg-opacity-20" />
  );
};

const SkeletonImage = () => {
  return (
    <div className='h-[100%] w-[90%] md:w-[max-content] shadow-yellow rounded-md mx-auto mt-8 mb-12 sm:m-0'>
      <div className="animate-pulse bg-white bg-opacity-40 h-[350px] md:h-[310px] lg:h-[450px] min-w-[250px] lg:w-[273px] rounded-md" />
    </div>
  );
};

const SkeletonText = () => {
  return (
    <div className="animate-pulse bg-white bg-opacity-20 mb-3 text-[14px] text-center text-white h-[160px] lg:h-[250px] w-full" />
  );
};

const SkeletonButton = () => {
  return (
    <div className="animate-pulse bg-white bg-opacity-20 px-3 py-3 rounded-md font-semibold text-center text-[13px] tracking-[0.1em] border border-[#1F1F1F] text-[#1F1F1F] w-full" />
  );
};
