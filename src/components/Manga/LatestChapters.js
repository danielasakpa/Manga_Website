import React, { useState, useEffect, useCallback } from "react";
import { useScanlationGroup } from "../../hooks/manga/useScanlationGroup";
import { Link } from "react-router-dom";
import {
  UserGroupIcon,
  UserIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { useDexUser } from "../../hooks/manga/useDexUser";
import { formatDistanceToNow, parseISO } from "date-fns";
import LatestChaptersSkeleton from "./LatestChaptersSkeleton";
import FlagImage from "../FlagImage/FlagImage";

function getScanlationGroupID(chapter) {
  const scanlationGroupRelationship = chapter?.relationships?.find(
    (rel) => rel.type === "scanlation_group"
  );
  return scanlationGroupRelationship ? scanlationGroupRelationship.id : null;
}

function getDexUserID(chapter) {
  const userRelationship = chapter?.relationships?.find(
    (rel) => rel.type === "user"
  );
  return userRelationship ? userRelationship.id : null;
}

function getMangaID(chapter) {
  const mangarRelationship = chapter?.relationships?.find(
    (rel) => rel.type === "manga"
  );
  return mangarRelationship ? mangarRelationship.id : null;
}

const LatestChapters = ({ chapter }) => {
  const {
    data: groupData,
    isLoading: isGroupLoading,
    isError: isGroupError,
    error: groupError,
  } = useScanlationGroup(getScanlationGroupID(chapter));

  const {
    data: dexUser,
    isLoading: isDexLoading,
    isError: isDexError,
    error: dexError,
  } = useDexUser(getDexUserID(chapter));

  const [shortenedTitle, setShortenedTitle] = useState("");
  const [shortenedGroupName, setShortenedGroupName] = useState("");

  useEffect(() => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 425) {
      const title = chapter?.attributes?.title;
      if (title && title?.length > 5) {
        setShortenedTitle(title.substring(0, 5) + "...");
      } else {
        setShortenedTitle(title);
      }

      if (groupData !== "No Group") {
        const groupName = groupData?.attributes?.name;
        if (groupName && groupName?.length > 5) {
          setShortenedGroupName(groupName.substring(0, 5) + "...");
        } else {
          setShortenedGroupName(groupName);
        }
      } else {
        setShortenedGroupName(groupData);
      }
    } else if (screenWidth < 1024 && screenWidth > 768) {
      const title = chapter?.attributes?.title;
      if (title && title?.length > 5) {
        setShortenedTitle(title.substring(0, 5) + "...");
      } else {
        setShortenedTitle(title);
      }
    } else {
      setShortenedTitle(chapter?.attributes?.title);
      setShortenedGroupName(
        groupData !== "No Group" ? groupData?.attributes?.name : groupData
      );
    }
  }, [chapter?.attributes?.title, groupData]);
  

  const truncateTitle = useCallback((title) => {
    // Check if title is provided
    if (!title || typeof title !== "string") {
      return "No Title";
    }
  
    // Split the title into words
    const words = title.split(" ");
  
    // Initialize variables
    let truncatedTitle = "";
    let count = 0;
  
    // Loop through the words
    for (const word of words) {
      // Truncate the word if it exceeds 7 characters
      truncatedTitle += word.length > 6 ? word.slice(0, 6) : word;
      truncatedTitle += " "; 
      count++; 
  
      // Check if we have reached the maximum word count or if the current word exceeds 7 characters
      if (count >= 3 || word?.length > 6) {
        break; 
      }
    }
  
    // Remove the trailing space
    truncatedTitle = truncatedTitle.trim();
  
    // Add ellipsis if there are more than three words
    if (words.length >= 3) {
      truncatedTitle += "...";
    }
  
    return truncatedTitle;
}, []);

  
  if (isGroupLoading || isDexLoading) {
    return <LatestChaptersSkeleton />;
  }

  // Mapping of language codes to country code
  const languageToCountry = {
    en: "gb",
    uk: "gb",
  };

  const languageCode = chapter?.attributes?.translatedLanguage;

  // Get the corresponding country code from the language code
  const flagCode = languageToCountry[languageCode]
    ? languageToCountry[languageCode]
    : languageCode?.length > 3 // Check if language code is longer than three characters
    ? languageCode?.substring(languageCode?.length - 2) // Get the last two letters
    : languageCode;

  // Parse the ISO timestamp string into a Date object
  const date = parseISO(chapter?.attributes?.publishAt);

  // Get the time ago
  const timeAgo = formatDistanceToNow(date, { addSuffix: true });

  return (
    <Link
      className="w-[100%] flex flex-col justify-between py-1 md:py-4 rounded-[4px] bg-[#344955] bg-clip-padding bg-opacity-60 border border-gray-200"
      style={{ backdropFilter: "blur(20px)" }}
      to={`/manga/${getMangaID(chapter)}/chapter/${chapter?.id}/${
        chapter?.attributes?.chapter
      }/${chapter?.attributes?.translatedLanguage}`}
    >
      <div className="flex flex-col gap-1 px-4">
        <div className="flex items-center gap-3">
          <FlagImage
            flagCode={flagCode}
            className="w-5 h-5 md:w-6 md:h-6"
          />
          <p className="text-[11px] md:text-[13px] font-semibold text-white">
            {chapter?.attributes?.volume &&
              `vol.${chapter?.attributes?.volume}`}{" "}
            {chapter?.attributes?.chapter
              ? `chp.${chapter?.attributes?.chapter}`
              : `chap N/A`}
            {chapter?.attributes?.title &&
              ` - ${truncateTitle(shortenedTitle)}`}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <UserGroupIcon className="w-4 h-4 text-white md:w-5 md:h-5" />
          <p className="text-[11px] md:text-[13px] font-semibold text-white">
            {shortenedGroupName}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <UserIcon className="w-4 h-4 text-white md:w-5 md:h-5" />
          <p className="text-[11px] md:text-[13px] font-semibold text-[#1B6FA8]">
            {dexUser?.attributes?.username
              ? dexUser?.attributes?.username
              : dexUser}
          </p>
        </div>
      </div>
      <div className="flex flex-col px-4 mt-1">
        {" "}
        <div className="flex items-center gap-3">
          <ClockIcon className="w-4 h-4 text-white md:w-5 md:h-5" />
          <p className="text-[11px] md:text-[13px] font-semibold text-white">
            {timeAgo}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default LatestChapters;
