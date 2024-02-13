import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const PROXY_SERVER_URL = 'https://manga-proxy-server.onrender.com';

async function fetchMangaCover(mangaId) {
    const response = await axios({
        method: 'get',
        url: `${PROXY_SERVER_URL}/api/cover?manga[]=${mangaId}`,
        withCredentials: false,
    });
    const cover = response.data.data;
    return cover ? cover[0].attributes.fileName : null;
}

export function MangaCover(id) {
    return useQuery(['cover', id], () => fetchMangaCover(id));
}