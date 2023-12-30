import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useMangaChapters = (mangaID, languages = ['en']) => {
    const fetchMangaChapters = async () => {

        try {
            const response = await axios({
                method: 'get',
                url: `https://manga-proxy-server.onrender.com/chapters?url=${encodeURIComponent(`https://api.mangadex.org/manga/${mangaID}/feed?includeFuturePublishAt=0&includeEmptyPages=0`)}`,
                withCredentials: false,
                params: {
                    translatedLanguage: languages,
                },
            });

            console.log(response.data)
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


// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';

// const useMangaChapters = (mangaID, languages = ['en']) => {
//     const fetchMangaChapters = async () => {
//         const baseUrl = 'https://api.mangadex.org';


//         try {
//             const response = await axios({
//                 method: 'get',
//                 url: `${baseUrl}/manga/${mangaID}/feed?includeFuturePublishAt=0&includeEmptyPages=0`,
//                 withCredentials: false,
//                 params: {
//                     translatedLanguage: languages,
//                 },
//             });

//             console.log(response.data)
//             return response.data;
//         } catch (error) {
//             throw new Error('Error fetching manga chapters');
//         }
//     };

//     const { data, isLoading, isError, error } = useQuery(['mangaChapters', mangaID, languages], fetchMangaChapters);

//     const total = data?.total ?? 0;

//     return { data, isLoading, isError, error, total };
// };

// export default useMangaChapters;