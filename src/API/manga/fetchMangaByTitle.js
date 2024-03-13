import axios from 'axios';

const PROXY_SERVER_URL = 'https://manga-proxy-server.onrender.com';

export default async function fetchMangaByTitle(title) {
  const response = await axios({
    method: 'GET',
    url: `${PROXY_SERVER_URL}/search/manga`,
    withCredentials: true,
    params: {
      title: title
    }
  });

  return response.data.data;
}
