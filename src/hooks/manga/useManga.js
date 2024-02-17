import { useQuery, useQueryClient } from '@tanstack/react-query';
import fetchManga from '../../API/manga/fetchManga';
import fetchMangaChapters from '../../API/manga/fetchMangaChapters';

export function useManga(mangaId) {
    const client = useQueryClient();

    return useQuery(['manga', mangaId], () => fetchManga(mangaId),
        {
            onSuccess: (manga) => {
                const languages = ['en'];
                const mangaId = manga.id;
                client.prefetchQuery(['mangaChapters', mangaId, languages], () => fetchMangaChapters(mangaId, languages));
            }
        });
}