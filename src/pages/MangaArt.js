import React from "react";
import { useParams } from "react-router-dom";
import useMangaArt from "../hooks/manga/useMangaArt";
import Image from "../components/Image/Image";
import { IoIosExpand } from "react-icons/io";

import { Dialog, DialogContent, DialogTrigger } from "../components/ui/dialog";

function MangaArt() {
  // Retrieve manga ID from URL parameters
  const { id } = useParams();

  const { data, isLoading } = useMangaArt(id);

  return (
    <div className="min-h-[100vh] h-[max-content] py-7 px-4 md:p-10 text-white">
      {isLoading ? (
        <div className="flex items-center justify-center w-full h-[100vh]">
          <p className="text-[13px] md:text-[20px] text-white">
            Loading Manga Art...
          </p>
        </div>
      ) : (
        <div className="flex items-center justify-center w-full ">
          <div className="grid content-center grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-start">
            {data?.data.map((artItem) => {
              return (
                <Dialog>
                  <DialogTrigger>
                    <div key={artItem?.id} className="relative cursor-pointer">
                      <Image
                        id={id}
                        coverFilename={artItem?.attributes.fileName}
                        className="h-[180px] md:h-[280px] lg:h-[380px] w-[120px] md:w-[250px] lg:w-[300px] bg-white rounded-md"
                        decoding="async"
                        fetchPriority="high"
                        loading="lazy"
                        size={512}
                      />
                      <div className="absolute inset-0 z-10 w-full h-full flex justify-center items-center bg-black bg-center bg-cover rounded-[4px] opacity-20 hover:opacity-70">
                        {" "}
                      </div>
                      <div className="absolute inset-0 z-20 w-full h-full flex justify-center items-center bg-center bg-cover rounded-[4px] opacity-0 hover:opacity-100">
                        <IoIosExpand size={50} />
                      </div>
                      <span className="absolute z-20 bottom-1 left-1">
                        Volume {artItem?.attributes.volume}
                      </span>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="flex items-center justify-center w-[85%] rounded-sm">
                    <Image
                      key={artItem?.id}
                      id={id}
                      coverFilename={artItem?.attributes?.fileName}
                      className="h-[300px] md:h-[280px] lg:h-[380px] w-[200px] md:w-[250px] lg:w-[300px] bg-white rounded-md"
                      decoding="async"
                      fetchPriority="high"
                      loading="lazy"
                      size={512}
                    />
                  </DialogContent>
                </Dialog>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default MangaArt;
