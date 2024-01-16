import React, { createContext, useState, useEffect, useContext } from 'react';
import {
    addManga as addMangaUtil,
    updateManga as updateMangaUtil,
    getManga as getMangaUtil,
    getReadingList as getReadingListUtil,
    deleteManga as deleteMangaUtil,
} from '../utils/readingListUtils';
import { useAuth } from '../Auth/AuthProvider';
import showToast from '../utils/toastUtils';

const ReadingListContext = createContext();

export const ReadingListProvider = ({ children }) => {
    const [readingList, setReadingList] = useState([]);
    const [error, setError] = useState("");

    const { token } = useAuth();

    const userId = localStorage.getItem("userId");

    // Fetch reading list data when the component mounts
    useEffect(() => {
        const fetchReadingList = async () => {
            try {
                const readingListData = await getReadingListUtil(token, userId);
                setReadingList(JSON.parse(readingListData).readingList.mangas || []);
            } catch (error) {
                // console.error('Error fetching reading list:', error.message);
            }
        };

        fetchReadingList();
    }, []);

    const addManga = async (token, userId, mangaId, status) => {
        try {
            const response = await addMangaUtil(token, userId, mangaId, status);
            setReadingList([...readingList, response.manga]);
            showToast("Manga was added to the list");
        } catch (error) {
            console.error('Error adding manga to reading list:', error.message);
        }
    };

    const updateManga = async (token, userId, mangaId, status) => {
        try {
            const response = await updateMangaUtil(token, userId, mangaId, status);
            const updatedManga = JSON.parse(response).manga;
            const updatedList = readingList.map((manga) =>
                manga._id === updatedManga._id ? updatedManga : manga
            );
            setReadingList(updatedList);
            showToast("Manga was updated in the list");
        } catch (error) {
            console.error('Error updating manga in reading list:', error.message);
        }
    };

    const getManga = async (token, userId, mangaId) => {
        try {
            const response = await getMangaUtil(token, userId, mangaId);
            const mangaData = JSON.parse(response);
            return mangaData;
        } catch (error) {
            // console.error('Error getting manga from reading list:', error.message);
        }
    };

    const getReadingList = async () => {
        try {
            const readingListData = await getReadingListUtil(token, userId);
            setReadingList(JSON.parse(readingListData).readingList.mangas || []);
        } catch (error) {
            setError(error.message);
            showToast(error.message, "error");
        }
    };

    const deleteManga = async (token, userId, mangaId) => {
        try {
            await deleteMangaUtil(token, userId, mangaId);
            const updatedList = readingList.filter((manga) => manga.manga !== mangaId);
            setReadingList(updatedList);
            showToast("Manga was removed from the list");
        } catch (error) {
            console.error('Error deleting manga from reading list:', error.message);
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
                error
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
        error
    } = useContext(ReadingListContext);

    return {
        readingList,
        addManga,
        updateManga,
        getReadingList,
        getManga,
        deleteManga,
        setReadingList,
        error
    };
};