import { useQuery, useQueryClient } from '@tanstack/react-query';
import fetchMangas from "../../API/manga/fetchMangas";
import fetchManga from '../../API/manga/fetchManga';

export default function useMangas(type, order, limit, includedTags, excludedTags, page) {
    const client = useQueryClient();

    return useQuery([type, order, limit, includedTags, excludedTags, page], () => fetchMangas(order, limit, includedTags, excludedTags, page), {
        keepPreviousData: true, // Ensure previous data is not discarded during pagination
        onSuccess: (data) => {
            data.data.map(manga => {
                const mangaId = manga.id;
                const id = manga.id;
                client.prefetchQuery(['manga', mangaId], () => fetchManga(mangaId));
            })
        }
    });
}
