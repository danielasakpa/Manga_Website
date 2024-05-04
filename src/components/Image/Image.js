import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import place_holderImg2 from "../../assets/images/place_holder2.png";
import place_holderImg3 from "../../assets/images/place_holder3.png";

const Image = ({
  id,
  coverFilename,
  alt,
  decoding,
  fetchPriority,
  loading = "eager",
  className,
  size,
  isChapterImg,
  index,
}) => {
  const PROXY_SERVER_URL = 'https://yuki-proxy-server.netlify.app';

  const { data, isLoading, isError } = useQuery(
    ["image", id, coverFilename],
    async () => {
      try {
        const res = await axios.get(
          `${PROXY_SERVER_URL}${
            isChapterImg ? "/images/chapter/" : "/images/cover/"
          }${id}/${encodeURIComponent(coverFilename)}${size ? `/${size}` : ""}`
        );
        return res?.data;
      } catch (error) {
        throw new Error("Error loading image");
      }
    },
    {
      // Add variables used inside the query to the list of dependencies
      enabled: !!id && !!coverFilename, // Prevents execution if id or coverFilename is falsy
    }
  );

  return (
    <>
      {isLoading ? (
        <div
          className={`${className} animate-pulse bg-gray-200 text-black rounded-sm flex justify-center items-center font-Kanit ${
            isChapterImg && "h-[800px] text-[60px]"
          }`}
        >
          {isChapterImg ? `${index}` : "Loading..."}
        </div>
      ) : isError ? (
        <div
          className={`${className} animate-pulse bg-gray-200 text-black rounded-sm flex justify-center items-center ${
            isChapterImg && "h-[800px]"
          }`}
        >
          Error loading image
        </div>
      ) : (
        <img
          src={data ? data : isChapterImg ? place_holderImg3 : place_holderImg2}
          alt={`${alt ? alt : `Manga cover for ${id}`}`}
          decoding={decoding}
          fetchPriority={fetchPriority}
          loading={loading}
          className={className}
        />
      )}
    </>
  );
};

export default Image;
