import React, { createContext, useState, useContext } from 'react';
import {
    addManga as addMangaUtil,
    updateManga as updateMangaUtil,
    getManga as getMangaUtil,
    getReadingList as getReadingListUtil,
    deleteManga as deleteMangaUtil,
} from '../API/readingList/readingList';
import { useAuth } from '../Auth/AuthProvider';
import showToast from '../utils/toastUtils';

const ReadingListContext = createContext();

export const ReadingListProvider = ({ children }) => {
    const [readingList, setReadingList] = useState([]);
    const [readingListError, setReadingListError] = useState("");
    const [isLoadingList, setIsLoadingList] = useState(false);

    const { token } = useAuth();

    const userId = JSON.parse(localStorage.getItem("user"))?._id;
   

    const addManga = async (token, userId, mangaId, status, mangaData) => {
        try {
            const response = await addMangaUtil(token, userId, mangaId, status, mangaData);
            setReadingList([response.manga, ...readingList].reverse());
            showToast("Manga was added to the list");
        } catch (error) {
            showToast(error.message || `Error adding manga to reading list.`, "error");
        }
    };

    const updateManga = async (token, userId, mangaId, status) => {
        try {
            const response = await updateMangaUtil(token, userId, mangaId, status);
            const updatedManga = JSON.parse(response).manga;

            // Find the index of the manga in the list
            const mangaIndex = readingList.findIndex((manga) => manga.manga === updatedManga.manga);

            // Create a copy of the list
            const updatedList = [...readingList];

            // Replace the manga at the specific index with the updated manga
            updatedList[mangaIndex] = updatedManga;

            setReadingList(updatedList.reverse());
            showToast("Manga was updated in the list");
        } catch (error) {
            showToast(error.message || `Error updating manga in reading list.`, "error");
        }
    };

    const getManga = async (token, userId, mangaId) => {
        try {
            const response = await getMangaUtil(token, userId, mangaId);
            const mangaData = JSON.parse(response);
            return mangaData;
        } catch (error) {
            console.error(error.message || `Error getting manga from reading list.`, "error");
        }
    };

    const getReadingList = async () => {
        try {
            const readingListData = await getReadingListUtil(token, userId);
            setReadingList(JSON.parse(readingListData).readingList.mangas || []);
        } catch (error) {
            setReadingListError(error.message);
        }
    };

    const deleteManga = async (token, userId, mangaId) => {
        try {
            await deleteMangaUtil(token, userId, mangaId);
            const updatedList = readingList.filter((manga) => manga.manga !== mangaId);
            setReadingList(updatedList.reverse());
            showToast("Manga was removed from the list", 'error');
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
                setIsLoadingList 
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
        setReadingListError
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
        setReadingListError
    };
};