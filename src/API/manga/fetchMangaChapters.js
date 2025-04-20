import axios from "axios";

export default async function fetchMangaChapters(
  mangaID,
  languages,
  limit = 100,
  page = 0,
  fetchAll = false
) {
  try {
    const order = {
      volume: "desc",
      chapter: "asc",
    };

    const finalOrderQuery = {};
    for (const [key, value] of Object.entries(order)) {
      finalOrderQuery[`order[${key}]`] = value;
    }

    const baseParams = {
      contentRating: ["safe", "suggestive", "erotica", "pornographic"],
      [`translatedLanguage[]`]: languages,
      ...finalOrderQuery,
    };

    if (!fetchAll) {
      const params = {
        ...baseParams,
        limit,
        offset: page * limit,
      };

      const response = await axios.get(
        `${process.env.REACT_APP_PROXY_SERVER_URL}/api/v1/manga/${mangaID}/feed`,
        { params }
      );

      return response.data;
    } else {
      // Fetch all
      let allChapters = [];
      let currentPage = 0;
      let totalPages = Number.MAX_SAFE_INTEGER;

      while (currentPage < totalPages) {
        const params = {
          ...baseParams,
          limit,
          offset: currentPage * limit,
        };

        const response = await axios.get(
          `${process.env.REACT_APP_PROXY_SERVER_URL}/api/v1/manga/${mangaID}/feed`,
          { params }
        );

        const { data, total } = response.data;
        allChapters.push(...data);

        totalPages = Math.ceil(total / limit);
        currentPage++;

        if (allChapters.length >= total) break;
      }

      return { data: allChapters };
    }
  } catch (error) {
    console.error(
      "Error fetching manga chapters:",
      error?.response?.data || error.message
    );
    throw error;
  }
}
