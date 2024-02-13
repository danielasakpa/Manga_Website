import axios from 'axios';

const PROXY_SERVER_URL = 'https://manga-proxy-server.onrender.com';

export default async function fetchMangaStatistics(mangaId) {
    const response = await axios({
        method: 'get',
        url: `${PROXY_SERVER_URL}/api/statistics/manga/${mangaId}`,
        withCredentials: false,
    });
    const { rating, follows } = response.data.statistics[mangaId];
    return { rating, follows };
}
