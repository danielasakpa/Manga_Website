import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const PROXY_SERVER_URL = 'https://manga-proxy-server.onrender.com';

async function getChapterData(chapterID) {
    try {
        const response = await axios({
            method: 'get',
            url: `${PROXY_SERVER_URL}/api/at-home/server/${chapterID}`,
            withCredentials: false,
        });
        const { baseUrl, chapter: { hash, data, dataSaver } } = response.data;
        return { baseUrl, hash, data, dataSaver };
    } catch (error) {
        throw new Error('Failed to fetch chapter data');
    }
}

function useChapterData(chapterID) {
    return useQuery(['chapterDate', chapterID], () => getChapterData(chapterID));
}

export default useChapterData;