import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const PROXY_SERVER_URL = 'https://manga-proxy-server.onrender.com';

async function fetchMangaDetails(mangaId) {
    const response = await axios({
        method: 'get',
        url: `${PROXY_SERVER_URL}/api/manga/${mangaId}?includes[]=author&includes[]=artist&includes[]=cover_art`,
        crossDomain: true,
        withCredentials: false,
    });

    return response.data.data;
}

export function useManga(mangaId) {
    return useQuery(['mangaDetails', mangaId], () => fetchMangaDetails(mangaId));
}