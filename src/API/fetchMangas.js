import { useQuery } from '@tanstack/react-query';
import axios from 'axios';


const PROXY_SERVER_URL = 'https://manga-proxy-server.onrender.com';

export async function fetchMangas(order, limit, includedTags, excludedTags, page) {
    const tagsResponse = await axios({
        method: 'get',
        url: `${PROXY_SERVER_URL}/api/manga/tag`,
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
        url: `${PROXY_SERVER_URL}/api/manga`,
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

export function useMangasFetcher(type, order, limit, includedTags, excludedTags, page) {
    return useQuery([type, page], () => fetchMangas(order, limit, includedTags, excludedTags, page), {
        keepPreviousData: true, // Ensure previous data is not discarded during pagination
    });
}
