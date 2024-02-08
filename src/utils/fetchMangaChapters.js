import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const PROXY_SERVER_URL = 'https://manga-proxy-server.onrender.com'; // Replace with your actual proxy server URL

const useMangaChapters = (mangaID, languages = ['en']) => {
    const fetchMangaChapters = async () => {

        try {
            const response = await axios({
                method: 'get',
                url: `${PROXY_SERVER_URL}/api/manga/${mangaID}/feed?includeFuturePublishAt=0&includeEmptyPages=0`,
                withCredentials: false,
                params: {
                    translatedLanguage: languages,
                },
            });

            return response.data;
        } catch (error) {
            throw new Error('Error fetching manga chapters');
        }
    };

    const { data, isLoading, isError, error } = useQuery(['mangaChapters', mangaID, languages], fetchMangaChapters);

    const total = data?.total ?? 0;

    return { data, isLoading, isError, error, total };
};

export default useMangaChapters;
