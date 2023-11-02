import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BASE_URL = 'https://api.mangadex.org';

async function fetchMangaStatistics(mangaId) {
    const response = await axios({
        method: 'get',
        url: `${BASE_URL}/statistics/manga/${mangaId}`,
        withCredentials: false,
    });
    const { rating, follows } = response.data.statistics[mangaId];
    return { rating, follows };
}

export function MangaStatistics(mangaId) {
    return useQuery(['statistics', mangaId], () => fetchMangaStatistics(mangaId));
}
