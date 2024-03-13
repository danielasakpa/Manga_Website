import axios from 'axios';

const PROXY_SERVER_URL = 'https://manga-proxy-server.onrender.com';

export default async function fetchMangas(tags, order, limit = 10, includedTags = [], excludedTags = [], page = 0, route = "mangas") {

    const includedTagIDs = tags
        .filter(tag => includedTags.includes(tag.attributes.name.en))
        .map(tag => tag.id);

    const excludedTagIDs = tags
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
        url: `${PROXY_SERVER_URL}/${route}/manga`,
        withCredentials: true,
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
