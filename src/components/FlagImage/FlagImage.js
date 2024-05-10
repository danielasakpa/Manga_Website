import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const FlagImage = ({ flagCode, className }) => {
  

  const {
    data: flag,
    isLoading,
    isError,
  } = useQuery(
    ["image", flagCode],
    async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_PROXY_SERVER_URL}/images/flags/${flagCode}`
        );
        return res?.data;
      } catch (error) {
        throw new Error("Error loading image");
      }
    },
    {
      // Add variables used inside the query to the list of dependencies
      enabled: !!flagCode, // Prevents execution if flagCode is falsy
    }
  );

  return (
    <>
      {isLoading ? (
        <div className={`${className} animate-pulse bg-gray-200 rounded-sm`} />
      ) : isError ? (
        <div className={`${className} animate-pulse bg-gray-200 rounded-sm`} />
      ) : (
        <>
          <div
            className={className}
            dangerouslySetInnerHTML={{
              __html: flag,
            }}
          />
        </>
      )}
    </>
  );
};

export default FlagImage;
