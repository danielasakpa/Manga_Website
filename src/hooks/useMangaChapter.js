import { useQuery } from '@tanstack/react-query';
import fetchMangaChapter from '../API/fetchMangaChapter';

function useMangaChapter(chapterID) {
    return useQuery(['chapterDate', chapterID], () => fetchMangaChapter(chapterID));
}

export default useMangaChapter;