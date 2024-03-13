import axios from 'axios';

const PROXY_SERVER_URL = 'https://manga-proxy-server.onrender.com';

export default async function fetchMangaCover(mangaId) {
    const response = await axios({
        method: 'get',
        url: `${PROXY_SERVER_URL}/api/cover?manga[]=${mangaId}`,
        withCredentials: true,
    });
    const cover = response.data.data;
    return cover ? cover[0].attributes.fileName : null;
}
