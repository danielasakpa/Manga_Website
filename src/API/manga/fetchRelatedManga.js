import axios from 'axios';

const PROXY_SERVER_URL = 'https://manga-proxy-server.onrender.com';

export default async function fetchRelatedManga(relationship) {
    const response = await axios(
        {
            method: 'get',
            url: `${PROXY_SERVER_URL}/api/manga/${relationship.id}`,
            withCredentials: false,
        });

    return response.data.data;
}