import axios from "axios";

export default async function fetchMangaArt(mangaId) {
  try {
    const order = {
      volume: "asc",
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
      method: "get",
      url: `${process.env.REACT_APP_PROXY_SERVER_URL}/api/v1/cover?manga[]=${mangaId}`,
      params: {
        ...finalOrderQuery,
        limit: 100,
        offset: 0,
      },
    });

    // console.log("response", response);

    return response.data
  } catch (error) {
    console.error(`Error fetching manga cover for manga ${mangaId}:`, error);
    throw error; // Rethrow the error to be caught by the caller
  }
}
