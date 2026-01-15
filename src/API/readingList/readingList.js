import axios from 'axios';

// Utility function to create a Reading List
export const addManga = async (token, userId, mangaId, status, mangaData) => {
    try {
        const response = await axios({
            method: 'post',
            url: `${process.env.REACT_APP_MANGA_SERVER_URL}/api/readingList/${userId}/add-manga/${mangaId}`,
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
            params: { status },
            data: mangaData,
            withCredentials: true,
        });

        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'An error occurred while adding the Manga to the Reading List.');
    }
};

// Utility function to update a Reading List
export const updateManga = async (token, userId, mangaId, status) => {
    try {
        const response = await axios({
            method: 'put',
            url: `${process.env.REACT_APP_MANGA_SERVER_URL}/api/readingList/${userId}/update-manga/${mangaId}`,
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
            params: { status },
            withCredentials: true,
        });

        return JSON.stringify(response.data);
    } catch (error) {
        throw new Error(error.response?.data?.message || 'An error occurred while updating the Manga in the Reading List.');
    }
};

// Utility function to get one manga by ID
export const getManga = async (token, userId, mangaId) => {
    try {
        const response = await axios({
            method: 'get',
            url: `${process.env.REACT_APP_MANGA_SERVER_URL}/api/readingList/${userId}/get-manga/${mangaId}`,
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        return JSON.stringify(response.data);
    } catch (error) {
        throw new Error(error.response?.data?.message || 'An error occurred while fetching the manga.');
    }
};

// Utility function to get Reading List by ID
export const getReadingList = async (token, userId) => {
    try {
        const response = await axios({
            method: 'get',
            url: `${process.env.REACT_APP_MANGA_SERVER_URL}/api/readingList/${userId}`,
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        return JSON.stringify(response.data);
    } catch (error) {
        throw new Error(error.response?.data?.message || 'An error occurred while fetching the reading list.');
    }
};

// Utility function to delete one manga from reading list by ID
export const deleteManga = async (token, userId, mangaId) => {
    try {
        const response = await axios({
            method: 'delete',
            url: `${process.env.REACT_APP_MANGA_SERVER_URL}/api/readingList/${userId}/delete-manga/${mangaId}`,
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        return JSON.stringify(response.data);
    } catch (error) {
        throw new Error(error.response?.data?.message || 'An error occurred while deleting the manga.');
    }
};