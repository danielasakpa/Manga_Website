// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';

// async function fetchMangaDetails(mangaId) {
//     const response = await axios({
//         method: 'get',
//         url: `https://manga-proxy-server.onrender.com/api?url=${encodeURIComponent(`https://api.mangadex.org/manga/${mangaId}/?includes[]=author&includes[]=artist&includes[]=cover_art`)}`,
//         withCredentials: false,
//     });

//     console.log(response)

//     return response.data.data;
// }

// export function useManga(mangaId) {
//     return useQuery(['mangaDetails', mangaId], () => fetchMangaDetails(mangaId));
// }


import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BASE_URL = 'https://api.mangadex.org';

async function fetchMangaDetails(mangaId) {
    const response = await axios({
        method: 'get',
        url: `${BASE_URL}/manga/${mangaId}/?includes[]=author&includes[]=artist&includes[]=cover_art`,
        withCredentials: false,
    });

    return response.data.data;
}

export function useManga(mangaId) {
    return useQuery(['mangaDetails', mangaId], () => fetchMangaDetails(mangaId));
}