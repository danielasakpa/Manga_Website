import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BASE_URL = 'https://web-production-1734.up.railway.app/https://api.mangadex.org';

async function getChapterData(chapterID) {
    try {
        const response = await axios({
            method: 'get',
            url: `${BASE_URL}/at-home/server/${chapterID}`,
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
