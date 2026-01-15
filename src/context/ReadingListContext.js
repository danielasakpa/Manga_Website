import React, { createContext, useState, useContext } from "react";
import {
  addManga as addMangaUtil,
  updateManga as updateMangaUtil,
  getManga as getMangaUtil,
  getReadingList as getReadingListUtil,
  deleteManga as deleteMangaUtil,
} from "../API/readingList/readingList";
import { useAuth } from "../Auth/AuthProvider";
import showToast from "../utils/toastUtils";
import { getReadingList as getReadingListFromStorage, getUserId, safeJsonStringify } from "../utils/localStorage";

const ReadingListContext = createContext();

export const ReadingListProvider = ({ children }) => {
  const [readingList, setReadingList] = useState(getReadingListFromStorage());
  const [readingListError, setReadingListError] = useState("");
  const [isLoadingList, setIsLoadingList] = useState(false);

  const { token } = useAuth();
  const userId = getUserId();

  const addManga = async (token, userId, mangaId, status, mangaData) => {
    try {
      const response = await addMangaUtil(token, userId, mangaId, status, mangaData);
      if (!response || !response.manga) {
        throw new Error("Invalid response from server");
      }
      const newManga = response.manga;
      const updatedReadingList = [newManga, ...readingList];
      setReadingList(updatedReadingList);
      safeJsonStringify("reading list", updatedReadingList);
      showToast("Manga was added to the list");
    } catch (error) {
      console.error("Error adding manga:", error);
      showToast(error.message || "Error adding manga to reading list.", "error");
    }
  };

  const updateManga = async (token, userId, mangaId, status) => {
    try {
      const response = await updateMangaUtil(token, userId, mangaId, status);
      if (!response) {
        throw new Error("No response from server");
      }
      
      // Check if response is already an object or needs parsing
      const parsedResponse = typeof response === 'string' ? JSON.parse(response) : response;
      
      if (!parsedResponse || !parsedResponse.manga) {
        throw new Error("Invalid response format");
      }
      
      const updatedManga = parsedResponse.manga;
      const updatedList = readingList.map((manga) =>
        manga.manga === updatedManga.manga ? updatedManga : manga
      );
      setReadingList(updatedList);
      safeJsonStringify("reading list", updatedList);
      showToast("Manga was updated in the list");
    } catch (error) {
      console.error("Error updating manga:", error);
      showToast(error.message || "Error updating manga in reading list.", "error");
    }
  };

  const getManga = async (token, userId, mangaId) => {
    try {
      const response = await getMangaUtil(token, userId, mangaId);
      if (!response) {
        return null;
      }
      
      // Check if response is already an object or needs parsing
      const mangaData = typeof response === 'string' ? JSON.parse(response) : response;
      return mangaData;
    } catch (error) {
      console.error("Error getting manga:", error);
      return null;
    }
  };

  const getReadingList = async () => {
    try {
      setIsLoadingList(true);
      const readingListData = await getReadingListUtil(token, userId);
      
      if (!readingListData) {
        throw new Error("No data received from server");
      }
      
      // Check if response is already an object or needs parsing
      const parsedData = typeof readingListData === 'string' 
        ? JSON.parse(readingListData) 
        : readingListData;
      
      const mangas = parsedData?.readingList?.mangas || [];
      safeJsonStringify("reading list", mangas);
      setReadingList(mangas);
      setIsLoadingList(false);
    } catch (error) {
      console.error("Error fetching reading list:", error);
      setReadingListError(error.message);
      setIsLoadingList(false);
    }
  };

  const deleteManga = async (token, userId, mangaId) => {
    try {
      await deleteMangaUtil(token, userId, mangaId);
      const updatedList = readingList.filter((manga) => manga.manga !== mangaId);
      setReadingList(updatedList);
      safeJsonStringify("reading list", updatedList);
      showToast("Manga was removed from the list", "error");
    } catch (error) {
      console.error("Error deleting manga:", error);
      showToast(error.message || "Error deleting manga from reading list.", "error");
    }
  };

  return (
    <ReadingListContext.Provider
      value={{
        readingList,
        addManga,
        updateManga,
        getManga,
        getReadingList,
        deleteManga,
        setReadingList,
        isLoadingList,
        readingListError,
        setReadingListError,
        setIsLoadingList,
      }}
    >
      {children}
    </ReadingListContext.Provider>
  );
};

export const useReadingList = () => {
  const context = useContext(ReadingListContext);
  if (!context) {
    throw new Error("useReadingList must be used within ReadingListProvider");
  }
  return context;
};