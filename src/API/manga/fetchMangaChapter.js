import axios from 'axios';

const PROXY_SERVER_URL = 'https://yuki-proxy-server.netlify.app';

export default async function fetchMangaChapter(chapterID) {
    try {
        const response = await axios({
            method: 'get',
            url: `${PROXY_SERVER_URL}/api/v1/at-home/server/${chapterID}`,
        });

        // Check if response data is undefined or incomplete
        if (!response.data || !response.data.baseUrl || !response.data.chapter || !response.data.chapter.hash || !response.data.chapter.data || !response.data.chapter.dataSaver) {
            throw new Error('No valid chapter data received from fetchMangaChapter');
        }

        const { baseUrl, chapter: { hash, data, dataSaver } } = response.data;
        return { baseUrl, hash, data, dataSaver };
    } catch (error) {
        console.error('Error fetching manga chapter:', error);
        throw error; // Rethrow the error to be caught by the caller
    }
}
