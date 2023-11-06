import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BASE_URL = 'https://web-production-1734.up.railway.app/https://api.mangadex.org';

async function fetchMangas(order, limit = 100, includedTags, excludedTags) {
    const tagsResponse = await axios({
        method: 'get',
        url: `${BASE_URL}/manga/tag`,
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
        url: `${BASE_URL}/manga`,
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

export function MangasFetcher(type, order, limit, includedTags, excludedTags) {
    return useQuery([type, type], () => fetchMangas(order, limit, includedTags, excludedTags));
}
