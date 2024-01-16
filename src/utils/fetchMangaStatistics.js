import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

async function fetchMangaStatistics(mangaId) {
    const response = await axios({
        method: 'get',
        url: `https://manga-proxy-server.onrender.com/api?url=${encodeURIComponent(`https://api.mangadex.org/statistics/manga/${mangaId}`)}`,
        withCredentials: false,
    });
    const { rating, follows } = response.data.statistics[mangaId];
    return { rating, follows };
}

export function MangaStatistics(mangaId) {
    return useQuery(['statistics', mangaId], () => fetchMangaStatistics(mangaId));
}
