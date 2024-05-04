import axios from 'axios';

// Utility function to get all users
export const getAllUsers = async () => {
    try {
        const response = await axios.get('https://yuki-manga-server.netlify.app/api/user');
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'An error occurred while fetching users.');
    }
};

// Utility function to get one user by ID
export const getOneUser = async (userId, token) => {
    try {
        const response = await axios({
            method: 'GET',
            url: `https://yuki-manga-server.netlify.app/api/user/${userId}`,
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'An error occurred while fetching the user.');
    }
};

// Utility function to create a user
export const createUser = async (userData) => {
    try {
        await axios({
            method: "post",
            url: 'https://yuki-manga-server.netlify.app/api/user',
            data: userData
        });

    } catch (error) {
        throw new Error(error.response?.data?.message || 'An error occurred while creating the user.');
    }
};

// Utility function to update a user by ID
export const updateUser = async (userId, userData, token) => {

    try {
        const response = await axios({
            method: 'put',
            url: `https://yuki-manga-server.netlify.app/api/user/${userId}`,
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
            data: userData
        });

        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'An error occurred while updating the user.');
    }
};

// Utility function to delete a user by ID
export const deleteUser = async (userId, token) => {
    try {
        const response = await axios({
            method: 'delete',
            url: `https://yuki-manga-server.netlify.app/api/user/${userId}`,
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'An error occurred while deleting the user.');
    }
};
