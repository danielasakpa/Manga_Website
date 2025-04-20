import axios from "axios";
import RemoveToken from "../RateLimit";

export default async function fetchDexUser(userId) {
  try {
    // Check if userId is null, if so, return "No User"
    if (userId === null) {
      return "No User";
    }

    await RemoveToken(1);

    const response = await axios({
      method: "get",
      url: `${process.env.REACT_APP_PROXY_SERVER_URL}/api/v1/user/${userId}`,
    });

    // Check if response data is undefined or empty
    if (!response.data || !response.data.data) {
      throw new Error("No valid data received from fetchDexUser");
    }

    return response.data.data;
  } catch (error) {
    console.error(`Error fetching Dex user ${userId}:`, error);
    throw error; // Rethrow the error to be caught by the caller
  }
}
