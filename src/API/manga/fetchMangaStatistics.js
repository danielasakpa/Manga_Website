import axios from 'axios';



export default async function fetchMangaStatistics(mangaId) {
    try {
        const response = await axios({
            method: 'get',
            url: `${process.env.REACT_APP_PROXY_SERVER_URL}/api/v1/statistics/manga/${mangaId}`,
        });

        // Check if response data is undefined or does not contain required statistics
        if (!response.data || !response.data.statistics || !response.data.statistics[mangaId]) {
            throw new Error('No data received or incomplete statistics from fetchMangaStatistics');
        }

        const { rating, follows } = response.data.statistics[mangaId];
        return { rating, follows };
    } catch (error) {
        console.error(`Error fetching manga statistics for manga ${mangaId}:`, error);
        throw error; // Rethrow the error to be caught by the caller
    }
}
