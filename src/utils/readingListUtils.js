import axios from 'axios';

// Utility function to create a Reading List
export const addManga = async (token, userId, mangaId, status) => {
    try {
        const response = await axios({
            method: 'post',
            url: `https://manga-proxy-server.onrender.com/api/readingList/${userId}/add-manga/${mangaId}`,
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
            params: { status }
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
            url: `https://manga-proxy-server.onrender.com/api/readingList/${userId}/update-manga/${mangaId}`,
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
            params: { status }
        });

        return JSON.stringify(response.data);
    } catch (error) {
        throw new Error(error.response?.data?.message || 'An error occurred while adding the Manga to the Reading List.');
    }
};

// Utility function to get one user by ID
export const getManga = async (token, userId, mangaId) => {
    try {
        const response = await axios(
            {
                method: 'get',
                url: `https://manga-server-luxr.onrender.com/api/readingList/${userId}/get-manga/${mangaId}`,
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json',
                },
            });
        return JSON.stringify(response.data);
    } catch (error) {
        throw new Error(error.response?.data?.message || 'An error occurred while fetching the user.');
    }
};

// Utility function to get Reading List by ID
export const getReadingList = async (token, userId) => {
    try {
        const response = await axios(
            {
                method: 'get',
                url: `https://manga-server-luxr.onrender.com/api/readingList/${userId}`,
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json',
                },
            });
        return JSON.stringify(response.data);
    } catch (error) {
        throw new Error(error.response?.data?.message || 'An error occurred while fetching the user.');
    }
};

// Utility function to delete one user by ID
export const deleteManga = async (token, userId, mangaId) => {
    try {
        const response = await axios(
            {
                method: 'delete',
                url: `https://manga-server-luxr.onrender.com/api/readingList/${userId}/delete-manga/${mangaId}`,
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json',
                },
            });
        return JSON.stringify(response.data);
    } catch (error) {
        throw new Error(error.response?.data?.message || 'An error occurred while fetching the user.');
    }
};