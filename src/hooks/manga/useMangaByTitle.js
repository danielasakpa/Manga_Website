import { useQuery, useQueryClient } from '@tanstack/react-query';
import fetchMangaByTitle from '../../API/manga/fetchMangaByTitle';

export default function useMangaByTitle(title, limit, page) {
    const client = useQueryClient();

    return useQuery(['manga', title, page], () => fetchMangaByTitle(title, limit, page),
        {
            keepPreviousData: true, 
        });
}