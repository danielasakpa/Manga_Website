import axios from 'axios';

const PROXY_SERVER_URL = 'https://manga-proxy-server.onrender.com';

export default async function fetchMangas(order, limit = 10, includedTags = [], excludedTags = [], page = 1) {
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

    if (Object.keys(order).length !== 0 && order.hasOwnProperty("") === false) {
        for (const [key, value] of Object.entries(order)) {
            finalOrderQuery[`order[${key}]`] = value;
        }
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
            offset: page * limit,
        },
    });

    return response.data;
}
