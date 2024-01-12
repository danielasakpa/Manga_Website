import { useState } from "react";
import { useMangasFetcher } from "../utils/fetchMangas";
import CarouselImage from "./CarouselImage";
import CarouselImageSkeleton from '../components/CarouselImageSkeleton ';



const Carousel = () => {
    const [index, setIndex] = useState(0);

    const type = "mangaCarousel"
    const limit = 5;
    const order = {
        followedCount: 'desc'
    }
    const includedTags = ['Action', 'Shounen', "Thriller"];
    const excludedTags = ['Harem'];

    const page = 0;

    const { data, isLoading, isError, error } = useMangasFetcher(type, order, limit, includedTags, excludedTags, page);;

    const handleArrow = (direction) => {
        if (direction === "l") {
            setIndex((prevIndex) =>
                prevIndex !== 0 ? prevIndex - 1 : data.data.length - 1
            );
        }
        if (direction === "r") {
            setIndex((prevIndex) =>
                prevIndex !== data.data.length - 1 ? prevIndex + 1 : 0
            );
        }
    };

    return (
        <div className="w-[90%] mx-auto">
            {isLoading || isError ? (
                <div>
                    <p className="text-[20px] font-semibold mr-2 tracking-[0.4em] mb-4">
                        Loading manga list...
                    </p>
                    <div className="relative overflow-hidden rounded-lg">
                        <div className="flex h-[400px] rounded-lg">
                            {[...Array(5)].map((_, index) => (
                                <CarouselImageSkeleton key={index} />
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="z-10 flex items-center justify-between mb-4">
                        <div className="flex justify-between">
                            <h4 className="text-[20px] font-semibold mr-2 tracking-[0.4em]">
                                Out Now
                            </h4>
                            <span className="animate-bounce">✨</span>
                        </div>
                        <div className="flex space-x-4">
                            <button
                                className="text-white text-[18px] bg-[#1B6FA8] p-2 rounded-full focus:outline-none h-10 w-10 flex items-center justify-center"
                                onClick={() => handleArrow("l")}
                            >
                                <span>&lt;</span>
                            </button>
                            <button
                                className="text-white text-[18px]  bg-[#1B6FA8] p-2 rounded-full focus:outline-none h-10 w-10 flex items-center justify-center"
                                onClick={() => handleArrow("r")}
                            >
                                &gt;
                            </button>
                        </div>
                    </div>
                    <div className="relative mx-auto overflow-hidden rounded-lg">
                        <div
                            className="flex h-[400px] rounded-lg transition-transform duration-300"
                            style={{ transform: `translateX(${-index * 100}%)` }}
                        >
                            {data.data.map((manga, i) => (
                                <CarouselImage key={i} manga={manga} />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Carousel;