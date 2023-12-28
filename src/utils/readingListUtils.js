import axios from 'axios';


// Utility function to create a Reading List
export const createUser = async () => {
    try {
        const response = await axios.post('http://localhost:5000/api/readingList');
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'An error occurred while creating the Reading List.');
    }
};