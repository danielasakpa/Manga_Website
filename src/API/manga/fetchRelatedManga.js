import axios from 'axios';



export default async function fetchRelatedManga(mangaData) {
    try {
        const relatedManga = await Promise.all(
            (mangaData?.relationships || [])
                .filter(relationship => relationship.type === 'manga' && relationship.related !== "doujinshi")
                .map(async relationship => {
                    const response = await axios({
                        method: 'get',
                        url: `${process.env.REACT_APP_PROXY_SERVER_URL}/api/v1/manga/${relationship.id}`,
                    });
                    // Check if response data is undefined
                    if (!response.data || !response.data.data) {
                        throw new Error(`No valid data received for manga ${relationship.id}`);
                    }
                    return response.data.data;
                })
        );

        return relatedManga;
    } catch (error) {
        console.error('Error fetching related manga:', error);
        throw error; // Rethrow the error to be caught by the caller
    }
}
