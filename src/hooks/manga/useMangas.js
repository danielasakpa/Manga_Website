import { useQuery, useQueryClient } from '@tanstack/react-query';
import fetchMangas from "../../API/manga/fetchMangas";
import fetchManga from '../../API/manga/fetchManga';

export default function useMangas(type, order, limit, includedTags, excludedTags, page) {
    const client = useQueryClient();

    return useQuery([type, includedTags, page], () => fetchMangas(order, limit, includedTags, excludedTags, page), {
        keepPreviousData: true, // Ensure previous data is not discarded during pagination
        onSuccess: async (data) => {
            // Use Promise.all to parallelize fetching manga details
            await Promise.all(data.data.map(async manga => {
                const mangaId = manga.id;
                await client.prefetchQuery(['manga', mangaId], () => fetchManga(mangaId));
            }));
        }
    });
}
