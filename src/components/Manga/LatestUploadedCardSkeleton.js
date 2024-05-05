

const LatestUploadedCardSkeleton = () => {
  return (
    <div className="w-[100%] basis-6/12 flex-1 flex flex-col p-4 bg-[#2C2C2C] rounded-[4px] animate-pulse">
      <p className="text-[14px] sm:text-[16px] lg:text-lg font-semibold text-white">Loading manga...</p>
      <div className="mb-3 border-b border-gray-300" />
      <div className="flex">
        <div className="">
          <div className="w-20 h-24 bg-gray-200 rounded-[3px] min-w-16 md:h-28" />
        </div>{" "}
        <div className="w-[100%] flex md:justify-between ml-4 gap-1 md:gap-4 py-4 rounded-[4px] bg-[#344955] bg-clip-padding bg-opacity-60 border border-gray-200" style={{backdropFilter: "blur(20px)"}}>
          <div className="w-[40%] flex flex-col flex-1 gap-2 px-4">
            <div className="h-4 bg-gray-200 rounded-[3px] md:h-6 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded-[3px] md:h-6 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded-[3px] md:h-6 animate-pulse" />
          </div>
          <div className="w-[40%] flex flex-col flex-1 gap-1 px-4">
            <div className="h-4 bg-gray-200 rounded-[3px] md:h-6 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LatestUploadedCardSkeleton;
