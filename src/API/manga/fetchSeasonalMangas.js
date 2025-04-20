import axios from 'axios';



export default async function fetchSeasonalMangas() {
    try {
        const response = await axios({
            method: 'get',
            url: `${process.env.REACT_APP_PROXY_SERVER_URL}/api/v1/list/1cc30d64-45c6-45a6-8c45-3771e1933b0f`,
            params: {
                includes: ['user'],
            },
        });

        // Check if response data is undefined or empty
        if (!response.data) {
            throw new Error('No valid data received from fetchSeasonalMangas');
        }

        return response.data;
    } catch (error) {
        console.error('Error fetching seasonal mangas:', error);
        throw error; // Rethrow the error to be caught by the caller
    }
}
