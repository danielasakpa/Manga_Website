import { useQuery } from '@tanstack/react-query';
import fetchMangaChapters from '../API/fetchMangaChapters';


const useMangaChapters = (mangaID, languages = ['en']) => {

    const { data, isLoading, isError, error } = useQuery(['mangaChapters', mangaID, languages], () => fetchMangaChapters(mangaID, languages));

    const total = data?.total ?? 0;

    return { data, isLoading, isError, error, total };
};

export default useMangaChapters;
