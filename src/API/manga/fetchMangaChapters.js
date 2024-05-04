import axios from 'axios';

const PROXY_SERVER_URL = 'https://yuki-proxy-server.netlify.app';

export default async function fetchMangaChapters(mangaID, languages, limit = 100, page = 0, fetchAll = false) {
    try {
        const order = {
            volume: "desc",
            chapter: "asc"
        };

        const finalOrderQuery = {};

        // Check if order object is not empty and does not have an empty key
        if (Object.keys(order).length !== 0 && !Object.prototype.hasOwnProperty.call(order, "")) {
            // Loop through order object and construct finalOrderQuery
            for (const [key, value] of Object.entries(order)) {
                finalOrderQuery[`order[${key}]`] = value;
            }
        }

        const params = {
            includes: ["scanlation_group"],
            ...finalOrderQuery,
            contentRating: ['safe', 'suggestive', 'erotica', 'pornographic'],
            translatedLanguage: languages,
        };

        if (!fetchAll) {
            // Set limit and offset for pagination
            params.limit = limit;
            params.offset = page * limit;

            const response = await axios.get(`${PROXY_SERVER_URL}/api/v1/manga/${mangaID}/feed?includeFuturePublishAt=0&includeEmptyPages=0`, {
                params: params
            });

            return response.data;
        } else {
            // Fetch all chapters
            let allChapters = [];
            let currentPage = 0;
            let totalPages = Number.MAX_SAFE_INTEGER;

            while (currentPage < totalPages) {
                // Set limit and offset for pagination
                params.limit = limit;
                params.offset = currentPage * limit;

                const response = await axios.get(`${PROXY_SERVER_URL}/api/v1/manga/${mangaID}/feed?includeFuturePublishAt=0&includeEmptyPages=0`, {
                    params: params
                });

                const { data, total } = response.data;
                totalPages = Math.ceil(total / limit);

                allChapters.push(...data);

                if (allChapters.length >= total) {
                    break;
                }

                currentPage++;
            }

            return allChapters;
        }
    } catch (error) {
        console.error('Error fetching manga chapters:', error);
        throw error; // Rethrow the error to be caught by the caller
    }
}
