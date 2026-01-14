import React, { createContext, useState, useContext, useEffect } from "react";
import {
  addManga as addMangaUtil,
  updateManga as updateMangaUtil,
  getManga as getMangaUtil,
  getReadingList as getReadingListUtil,
  deleteManga as deleteMangaUtil,
} from "../API/readingList/readingList";
import { useAuth } from "../Auth/AuthProvider";
import showToast from "../utils/toastUtils";

const ReadingListContext = createContext();

export const ReadingListProvider = ({ children }) => {
  const getInitialReadingList = () => {
    try {
      const data = localStorage.getItem("reading list");
      if (!data || data === "undefined") return [];
      return JSON.parse(data);
    } catch (error) {
      console.error("Invalid reading list in localStorage:", error);
      localStorage.removeItem("reading list");
      return [];
    }
  };

  const [readingList, setReadingList] = useState(getInitialReadingList);
  const [readingListError, setReadingListError] = useState("");
  const [isLoadingList, setIsLoadingList] = useState(false);

  const { token } = useAuth();
  const userId = JSON.parse(localStorage.getItem("user") || "{}")?._id;

  const addManga = async (token, userId, mangaId, status, mangaData) => {
    try {
      const response = await addMangaUtil(token, userId, mangaId, status, mangaData);
      const newManga = response.manga;
      const updatedReadingList = [newManga, ...readingList];
      setReadingList(updatedReadingList);
      localStorage.setItem("reading list", JSON.stringify(updatedReadingList));
      showToast("Manga was added to the list");
    } catch (error) {
      showToast(error.message || `Error adding manga to reading list.`, "error");
    }
  };

  const updateManga = async (token, userId, mangaId, status) => {
    try {
      const response = await updateMangaUtil(token, userId, mangaId, status);
      if (!response) {
        throw new Error("No response from server");
      }
      const updatedManga = JSON.parse(response).manga;
      const updatedList = readingList.map((manga) =>
        manga.manga === updatedManga.manga ? updatedManga : manga
      );
      setReadingList(updatedList);
      localStorage.setItem("reading list", JSON.stringify(updatedList));
      showToast("Manga was updated in the list");
    } catch (error) {
      showToast(error.message || `Error updating manga in reading list.`, "error");
    }
  };

  const getManga = async (token, userId, mangaId) => {
    try {
      const response = await getMangaUtil(token, userId, mangaId);
      if (!response) {
        throw new Error("No response from server");
      }
      const mangaData = JSON.parse(response);
      return mangaData;
    } catch (error) {
      console.error(error.message || `Error getting manga from reading list.`);
      return null;
    }
  };

  const getReadingList = async () => {
    try {
      const readingListData = await getReadingListUtil(token, userId);
      if (!readingListData) {
        throw new Error("No data received from server");
      }
      const parsedData = JSON.parse(readingListData).readingList.mangas || [];
      localStorage.setItem("reading list", JSON.stringify(parsedData));
      setReadingList(parsedData);
    } catch (error) {
      setReadingListError(error.message);
      console.error("Error fetching reading list:", error);
    }
  };

  const deleteManga = async (token, userId, mangaId) => {
    try {
      await deleteMangaUtil(token, userId, mangaId);
      const updatedList = readingList.filter((manga) => manga.manga !== mangaId);
      setReadingList(updatedList);
      localStorage.setItem("reading list", JSON.stringify(updatedList));
      showToast("Manga was removed from the list", "error");
    } catch (error) {
      showToast(error.message || `Error deleting manga from reading list.`, "error");
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
// Create a custom hook to consume the reading list context
export const useReadingList = () => {
  const {
    readingList,
    addManga,
    updateManga,
    getReadingList,
    getManga,
    deleteManga,
    setReadingList,
    isLoadingList,
    readingListError,
    setIsLoadingList,
    setReadingListError,
  } = useContext(ReadingListContext);

  return {
    readingList,
    addManga,
    updateManga,
    getReadingList,
    getManga,
    deleteManga,
    setReadingList,
    isLoadingList,
    readingListError,
    setIsLoadingList,
    setReadingListError,
  };
};
