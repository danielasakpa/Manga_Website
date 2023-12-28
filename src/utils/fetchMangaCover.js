// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';


// async function fetchMangaCover(mangaId) {
//     const response = await axios({
//         method: 'get',
//         url: `https://manga-proxy-server.onrender.com/api?url=${encodeURIComponent(`https://api.mangadex.org/cover?manga[]=${mangaId}`)}`,
//         withCredentials: false,
//     });
//     const cover = response.data.data;
//     return cover ? cover[0].attributes.fileName : null;
// }

// export function MangaCover(id) {
//     return useQuery(['cover', id], () => fetchMangaCover(id));
// }


import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BASE_URL = 'https://api.mangadex.org';

async function fetchMangaCover(mangaId) {
    const response = await axios({
        method: 'get',
        url: `${BASE_URL}/cover?manga[]=${mangaId}`,
        withCredentials: false,
    });
    const cover = response.data.data;
    return cover ? cover[0].attributes.fileName : null;
}

export function MangaCover(id) {
    return useQuery(['cover', id], () => fetchMangaCover(id));
}