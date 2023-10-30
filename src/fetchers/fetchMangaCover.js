import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BASE_URL = 'https://api.mangadex.org';

async function fetchMangaCover(mangaId) {
    const response = await axios.get(`${BASE_URL}/cover?manga[]=${mangaId}`);
    const cover = response.data.data;
    return cover ? cover[0].attributes.fileName : null;
}

export function MangaCover(id) {
    return useQuery(['cover', id], () => fetchMangaCover(id));
}
