import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export async function fetchMangas(order, limit, includedTags, excludedTags, page) {
    const tagsResponse = await axios({
        method: 'get',
        url: `https://manga-proxy-server.onrender.com/api?url=${encodeURIComponent(`https://api.mangadex.org/manga/tag`)}`,
        withCredentials: false,
    });

    const includedTagIDs = tagsResponse.data.data
        .filter(tag => includedTags.includes(tag.attributes.name.en))
        .map(tag => tag.id);

    const excludedTagIDs = tagsResponse.data.data
        .filter(tag => excludedTags.includes(tag.attributes.name.en))
        .map(tag => tag.id);

    const finalOrderQuery = {};

    for (const [key, value] of Object.entries(order)) {
        finalOrderQuery[`order[${key}]`] = value;
    }

    const response = await axios({
        method: 'get',
        url: `https://manga-proxy-server.onrender.com/mangas?url=https://api.mangadex.org/manga`,
        withCredentials: false,
        params: {
            includedTags: includedTagIDs,
            excludedTags: excludedTagIDs,
            ...finalOrderQuery,
            limit,
            offset: page * limit,  // Calculate offset based on page number
        },
    });

    return response.data;
}


// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';

// const BASE_URL = 'https://api.mangadex.org';

// export async function fetchMangas(order, limit, includedTags, excludedTags, page) {
//     const tagsResponse = await axios({
//         method: 'get',
//         url: `https://manga-proxy-server.onrender.com/api?url=${encodeURIComponent(`https://api.mangadex.org/manga/tag`)}`,
//         withCredentials: false,
//     });

//     // Check if includedTags and excludedTags are provided
//     const includedTagIDs = includedTags !== []
//         ? tagsResponse.data.data
//             .filter(tag => includedTags.includes(tag.attributes.name.en))
//             .map(tag => tag.id)
//         : [];

//     const excludedTagIDs = excludedTags !== []
//         ? tagsResponse.data.data
//             .filter(tag => excludedTags.includes(tag.attributes.name.en))
//             .map(tag => tag.id)
//         : [];

//     const finalOrderQuery = {};

//     for (const [key, value] of Object.entries(order)) {
//         finalOrderQuery[`order[${key}]`] = value;
//     }

//     const response = await axios({
//         method: 'get',
//         url: `${BASE_URL}/manga`,
//         withCredentials: false,
//         params: {
//             includedTags: includedTagIDs,
//             excludedTags: excludedTagIDs,
//             ...finalOrderQuery,
//             limit: limit,
//             offset: page * limit || 0, // Calculate offset based on page number
//         },
//         maxContentLength: Infinity,
//     });

//     return response.data;
// }

export function useMangasFetcher(type, order, limit, includedTags, excludedTags, page) {
    return useQuery([type, page], () => fetchMangas(order, limit, includedTags, excludedTags, page), {
        keepPreviousData: true, // Ensure previous data is not discarded during pagination
    });
}
