import axios from 'axios';

const PROXY_SERVER_URL = 'https://yuki-proxy-server.netlify.app';

export default async function fetchMangaCover(mangaId) {
    try {
        const response = await axios({
            method: 'get',
            url: `${PROXY_SERVER_URL}/api/v1/cover?manga[]=${mangaId}`,
        });

        // Check if response data is undefined or empty
        if (!response.data || !response.data.data || response.data.data.length === 0) {
            throw new Error('No valid cover data received from fetchMangaCover');
        }

        const cover = response.data.data;
        return cover[0].attributes.fileName;
    } catch (error) {
        console.error(`Error fetching manga cover for manga ${mangaId}:`, error);
        throw error; // Rethrow the error to be caught by the caller
    }
}
