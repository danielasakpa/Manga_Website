import axios from 'axios';
import RemoveToken from '../RateLimit';



function groupChaptersByMangaID(chapters) {
  const groupedChapters = [];

  chapters.forEach(chapter => {
    const mangaID = chapter.relationships.find(rel => rel.type === 'manga').id;
    const existingGroup = groupedChapters.find(group => group.mangaID === mangaID);
    if (existingGroup) {
      existingGroup.chapters.push(chapter);
    } else {
      groupedChapters.push({
        mangaID,
        chapters: [chapter]
      });
    }
  });

  return groupedChapters;
}



export default async function fetchLatestUploads(order, limit, includes = [], page = 0) {
  try {
    const finalOrderQuery = {};

    if (
      Object.keys(order).length !== 0 &&
      order.hasOwnProperty("") === false
    ) {
      for (const [key, value] of Object.entries(order)) {
        finalOrderQuery[`order[${key}]`] = value;
      }
    }

    const params = {
      includes,
      ...finalOrderQuery,
      contentRating: ["safe", "suggestive"],
      limit,
      offset: page * limit,
    };

    await RemoveToken(1);

    const response = await axios.get(`${process.env.REACT_APP_PROXY_SERVER_URL}/api/v1/chapter`, {
      params: params,
    });

    const { data, ...otherInfo } = response.data;

    const chaptersGroupedByMangaID = groupChaptersByMangaID(
      data
    );

    return {
      data: chaptersGroupedByMangaID,
      otherInfo,
    };
  } catch (error) {
    throw new Error('Error fetching manga chapters');
  }
}
