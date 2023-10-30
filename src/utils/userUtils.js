const axios = require('axios');

// Utility function to get all users
const getAllUsers = async () => {
    try {
        const response = await axios.get('/users');
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Utility function to get one user by ID
const getOneUser = async (id) => {
    try {
        const response = await axios.get(`/users/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Utility function to create a user
const createUser = async (userData) => {
    try {
        const response = await axios.post('/users', userData);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Utility function to update a user by ID
const updateUser = async (id, userData) => {
    try {
        const response = await axios.put(`/users/${id}`, userData);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Utility function to delete a user by ID
const deleteUser = async (id) => {
    try {
        const response = await axios.delete(`/users/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    getAllUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser
};
