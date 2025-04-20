import axios from 'axios';

export default async function fetchMangas(tags, order, limit = 10, includedTags = [], excludedTags = [], page = 0, status = "") {
    try {
        const includedTagIDs = tags
            .filter(tag => includedTags.includes(tag.attributes.name.en))
            .map(tag => tag.id);

        const excludedTagIDs = tags
            .filter(tag => excludedTags.includes(tag.attributes.name.en))
            .map(tag => tag.id);

        const finalOrderQuery = {};

        // Check if order object is not empty and does not have a prototype property
        if (Object.keys(order).length !== 0 && !Object.prototype.hasOwnProperty.call(order, "")) {
            // Loop through order object and construct finalOrderQuery
            for (const [key, value] of Object.entries(order)) {
                finalOrderQuery[`order[${key}]`] = value;
            }
        }

        const allStatus = ["ongoing", "completed", "hiatus", "cancelled"];

        const statusArray = status ? [status.toLowerCase()] : allStatus;
        
        const response = await axios({
            method: 'get',
            url: `${process.env.REACT_APP_PROXY_SERVER_URL}/api/v1/manga`,
            params: {
                includedTags: includedTagIDs,
                excludedTags: excludedTagIDs,
                contentRating: ['safe', "suggestive"],
                ...finalOrderQuery,
                status: statusArray,
                limit,
                offset: page * limit,
                hasAvailableChapters: true,
                includedTagsMode: "AND",
                excludedTagsMode: "OR"
            },
        });

        const responseData = response.data;

        // Check if response data is undefined or empty
        if (!responseData || !responseData.data || responseData.data.length === 0) {
            throw new Error('No data received from fetchMangas');
        }

        return responseData;
    } catch (error) {
        console.error('Error fetching mangas:', error);
        throw error; // Rethrow the error to be caught by the caller
    }
}
