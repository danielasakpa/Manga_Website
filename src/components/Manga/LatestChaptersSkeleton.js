const LatestChaptersSkeleton = () => {
    return (
      <div className="w-[100%] flex md:justify-between gap-1 md:gap-4 py-4 rounded-md bg-[#344955] bg-clip-padding bg-opacity-60 border border-gray-200" style={{backdropFilter: "blur(20px)"}}>
          <div className="w-[40%] flex flex-col flex-1 gap-2 px-4">
            <div className="h-4 bg-gray-200 rounded-md md:h-6 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded-md md:h-6 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded-md md:h-6 animate-pulse" />
          </div>
          <div className="w-[40%] flex flex-col flex-1 gap-1 px-4">
            <div className="h-4 bg-gray-200 rounded-md md:h-6 animate-pulse" />
          </div>
        </div>
    );
  }
  
  export default LatestChaptersSkeleton;