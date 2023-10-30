import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BASE_URL = 'https://api.mangadex.org';

async function fetchMangas(order, limit = 100, includedTags, excludedTags) {
    const tagsResponse = await axios.get(`${BASE_URL}/manga/tag`);

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

    const response = await axios.get(`${BASE_URL}/manga`, {
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
