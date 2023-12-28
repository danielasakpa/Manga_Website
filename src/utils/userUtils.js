import axios from 'axios';

// Utility function to get all users
export const getAllUsers = async () => {
    try {
        const response = await axios.get('/users');
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'An error occurred while fetching users.');
    }
};

// Utility function to get one user by ID
export const getOneUser = async (id) => {
    try {
        const response = await axios.get(`/users/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'An error occurred while fetching the user.');
    }
};

// Utility function to create a user
export const createUser = async (userData) => {
    try {
        const response = await axios.post('http://localhost:5000/api/user', userData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'An error occurred while creating the user.');
    }
};

// Utility function to update a user by ID
export const updateUser = async (id, userData) => {
    try {
        const response = await axios.put(`/users/${id}`, userData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'An error occurred while updating the user.');
    }
};

// Utility function to delete a user by ID
export const deleteUser = async (id) => {
    try {
        const response = await axios.delete(`/users/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'An error occurred while deleting the user.');
    }
};
