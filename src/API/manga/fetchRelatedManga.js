import axios from 'axios';

const PROXY_SERVER_URL = 'https://manga-proxy-server.onrender.com';

export default async function fetchRelatedManga(mangaData) {
    const relatedManga = await Promise.all(
        (mangaData?.relationships || [])
            .filter(relationship => relationship.type === 'manga' && relationship.related !== "doujinshi")
            .map(async relationship => {
                const response = await axios({
                    method: 'get',
                    url: `${PROXY_SERVER_URL}/api/manga/${relationship.id}`,
                    withCredentials: true,
                });
                return response.data.data;
            })
    );

    return relatedManga;
}
