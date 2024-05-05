import { useQuery, useQueryClient } from '@tanstack/react-query';
import fetchMangas from "../../API/manga/fetchMangas";
import fetchManga from '../../API/manga/fetchManga';
import tags from '../../assets/tags/tags';


export default function useMangas(type, order, limit, includedTags, excludedTags, page, status = "") {
    const client = useQueryClient();


    return useQuery([type, order, includedTags, excludedTags, status, page], () => fetchMangas(tags, order, limit, includedTags, excludedTags, page, status), {
        keepPreviousData: true, // Ensure previous data is not discarded during pagination
        onSuccess: async (data) => {
            // Use Promise.all to parallelize fetching manga details
            await Promise.all(data?.data?.map(async manga => {
                const mangaId = manga?.id;
                await client.prefetchQuery(['manga', mangaId], () => fetchManga(mangaId));
            }));
        }
    });
}
