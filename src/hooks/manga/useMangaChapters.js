import { useQuery } from '@tanstack/react-query';
import fetchMangaChapters from '../../API/manga/fetchMangaChapters';


const useMangaChapters = (mangaID, languages = ['en'], limit, page, fetchAll) => {

    const { data, isLoading, isRefetching, isError, error, refetch } = useQuery(['mangaChapters', mangaID, languages, fetchAll, page], () => fetchMangaChapters(mangaID, languages, limit, page, fetchAll), {
        keepPreviousData: true, // Ensure previous data is not discarded during pagination
    });

    const total = data?.total ?? 0;

    return { data, isLoading, isRefetching, isError, error, total, refetch };
};

export default useMangaChapters;
