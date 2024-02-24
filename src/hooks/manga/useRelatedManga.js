import { useQuery, useQueryClient } from '@tanstack/react-query';
import fetchRelatedManga from '../../API/manga/fetchRelatedManga';
import fetchManga from '../../API/manga/fetchManga';

export default function useRelatedManga(mangaData) {

    const client = useQueryClient();

    return useQuery(["related manga", mangaData], () => fetchRelatedManga(mangaData), {
        onSuccess: async (data) => {
            // Use Promise.all to parallelize fetching manga details
            await Promise.all(data.map(async manga => {
                const mangaId = manga.id;
                await client.prefetchQuery(['manga', mangaId], () => fetchManga(mangaId));
            }));
        }
    });
}
