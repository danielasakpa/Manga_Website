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
      return data ? JSON.parse(data) : [];
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

  const userId = JSON.parse(localStorage.getItem("user"))?._id;

  /**
   * Add a manga to the Reading list.
   * @throws {Error} Throws an error if the manga was not successfully added to the list.
   */
  const addManga = async (token, userId, mangaId, status, mangaData) => {
    try {
      const response = await addMangaUtil(
        token,
        userId,
        mangaId,
        status,
        mangaData
      );
      const newManga = response.manga;
      const updatedReadingList = [newManga, ...readingList];
      setReadingList(updatedReadingList);
      localStorage.setItem("reading list", JSON.stringify(updatedReadingList));
      showToast("Manga was added to the list");
    } catch (error) {
      showToast(
        error.message || `Error adding manga to reading list.`,
        "error"
      );
    }
  };

  /**
   * Update a manga in the Reading list.
   * @throws {Error} Throws an error if the manga was not successfully updated.
   */
  const updateManga = async (token, userId, mangaId, status) => {
    try {
      const response = await updateMangaUtil(token, userId, mangaId, status);
      const updatedManga = JSON.parse(response).manga;
      const updatedList = readingList.map((manga) =>
        manga.manga === updatedManga.manga ? updatedManga : manga
      );
      setReadingList(updatedList);
      localStorage.setItem("reading list", JSON.stringify(updatedList));
      showToast("Manga was updated in the list");
    } catch (error) {
      showToast(
        error.message || `Error updating manga in reading list.`,
        "error"
      );
    }
  };

  /**
   * Get a manga from the Reading list.
   * @throws {Error} Throws an error if the manga was not found in the list.
   */
  const getManga = async (token, userId, mangaId) => {
    try {
      const response = await getMangaUtil(token, userId, mangaId);
      const mangaData = JSON.parse(response);
      return mangaData;
    } catch (error) {
      console.error(
        error.message || `Error getting manga from reading list.`,
        "error"
      );
    }
  };

  /**
   * Get User the Reading list.
   * @throws {Error} Throws an error if the User does not have a list.
   */
  const getReadingList = async () => {
    try {
      const readingListData = await getReadingListUtil(token, userId);
      const parsedData = JSON.parse(readingListData).readingList.mangas || [];
      localStorage.setItem("reading list", JSON.stringify(parsedData));
      setReadingList(parsedData);
    } catch (error) {
      setReadingListError(error.message);
    }
  };

  /**
   * Delete a manga from the Reading list.
   * @throws {Error} Throws an error if the manga was not successfully deleted from the list.
   */
  const deleteManga = async (token, userId, mangaId) => {
    try {
      await deleteMangaUtil(token, userId, mangaId);
      const updatedList = readingList.filter(
        (manga) => manga.manga !== mangaId
      );
      setReadingList(updatedList);
      localStorage.setItem("reading list", JSON.stringify(updatedList));
      showToast("Manga was removed from the list", "error");
    } catch (error) {
      showToast(
        error.message || `Error deleting manga from reading list.`,
        "error"
      );
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
