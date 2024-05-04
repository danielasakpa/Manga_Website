import axios from 'axios';

const PROXY_SERVER_URL = 'https://yuki-proxy-server.netlify.app';

export default async function randomImage() {
    try {
        const response = await axios({
            method: "get",
            url: `${PROXY_SERVER_URL}/api/wall_paper`,
        });

        // Check if response data is undefined or empty
        if (!response.data) {
            throw new Error('No valid data received from randomImage');
        }

        return response.data;
    } catch (error) {
        console.error('Error fetching random image:', error);
        throw error; // Rethrow the error to be caught by the caller
    }
}
