import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BASE_URL = 'https://api.mangadex.org';

async function fetchMangaDetails(mangaId) {
    const response = await axios.get(`${BASE_URL}/manga/${mangaId}/?includes[]=author&includes[]=artist&includes[]=cover_art`);

    return response.data.data;
}

export function useManga(mangaId) {
    return useQuery(['mangaDetails', mangaId], () => fetchMangaDetails(mangaId));
}
