import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

async function fetchMangas(order, limit, includedTags, excludedTags) {
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
        },
    });

    return response.data.data;
}

export function useMangasFetcher(type, order, limit, includedTags, excludedTags) {
    return useQuery([type, type], () => fetchMangas(order, limit, includedTags, excludedTags));
}
