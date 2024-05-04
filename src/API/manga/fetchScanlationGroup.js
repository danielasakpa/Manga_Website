import axios from 'axios';

const PROXY_SERVER_URL = 'https://yuki-proxy-server.netlify.app';

export default async function fetchScanlationGroup(groupId) {
    try {
        // Check if groupId is null, if so, return "No Group"
        if (groupId === null) {
            return "No Group";
        }

        const response = await axios({
            method: 'get',
            url: `${PROXY_SERVER_URL}/api/v1/group/${groupId}`,
        });

        // Check if response data is undefined or empty
        if (!response.data || !response.data.data) {
            throw new Error('No valid data received from fetchScanlationGroup');
        }

        return response.data.data;
    } catch (error) {
        console.error(`Error fetching scanlation group ${groupId}:`, error);
        throw error; // Rethrow the error to be caught by the caller
    }
}
