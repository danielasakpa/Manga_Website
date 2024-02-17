import { useQuery, useQueryClient } from '@tanstack/react-query';
import fetchMangas from "../../API/manga/fetchMangas";
import fetchMangaCover from '../../API/manga/fetchMangaCover';
import fetchMangaStatistics from '../../API/manga/fetchMangaStatistics';
import fetchManga from '../../API/manga/fetchManga';

export default function useMangas(type, order, limit, includedTags, excludedTags, page) {
    const client = useQueryClient();

    return useQuery([type, page], () => fetchMangas(order, limit, includedTags, excludedTags, page), {
        keepPreviousData: true, // Ensure previous data is not discarded during pagination
        onSuccess: (data) => {
            data.data.map(manga => {
                const mangaId = manga.id;
                const id = manga.id;
                client.prefetchQuery(['manga', mangaId], () => fetchManga(mangaId));
                client.prefetchQuery(['cover', id], () => fetchMangaCover(id));
                client.prefetchQuery(['statistics', mangaId], () => fetchMangaStatistics(mangaId));
            })
        }
    });
}
