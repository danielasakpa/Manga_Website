import axios from "axios";

export default async function fetchMangaByTitle(title, limit, page) {
  try {
    const order = {
      followedCount: "desc",
      rating: "desc",
    };

    const finalOrderQuery = {};

    // Check if order object is not empty and does not have a prototype property
    if (
      Object.keys(order).length !== 0 &&
      !Object.prototype.hasOwnProperty.call(order, "")
    ) {
      // Loop through order object and construct finalOrderQuery
      for (const [key, value] of Object.entries(order)) {
        finalOrderQuery[`order[${key}]`] = value;
      }
    }

    const response = await axios({
      method: "GET",
      url: `${process.env.REACT_APP_PROXY_SERVER_URL}/api/v1/manga`,
      params: {
        title: title,
        ...finalOrderQuery,
        limit,
        offset: page * limit,
      },
    });

    // Check if response data is undefined
    if (!response.data) {
      throw new Error("No valid data received from fetchMangaByTitle");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching manga by title:", error);
    throw error; // Rethrow the error to be caught by the caller
  }
}
