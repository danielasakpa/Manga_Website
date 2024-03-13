import axios from 'axios';

const PROXY_SERVER_URL = 'https://manga-proxy-server.onrender.com';

export default async function fetchManga(mangaId) {
    const response = await axios({
        method: 'get',
        url: `${PROXY_SERVER_URL}/api/manga/${mangaId}?includes[]=author&includes[]=artist&includes[]=cover_art`,
        crossDomain: true,
        withCredentials: true,
    });

    return response.data.data;
}