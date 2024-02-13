import axios from 'axios';

const PROXY_SERVER_URL = 'https://manga-proxy-server.onrender.com';

export default async function fetchMangaChapters(mangaID, languages) {

    try {
        const response = await axios({
            method: 'get',
            url: `${PROXY_SERVER_URL}/api/manga/${mangaID}/feed?includeFuturePublishAt=0&includeEmptyPages=0`,
            withCredentials: false,
            params: {
                translatedLanguage: languages,
            },
        });

        return response.data;
    } catch (error) {
        throw new Error('Error fetching manga chapters');
    }
};

