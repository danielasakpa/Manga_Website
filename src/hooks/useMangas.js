import { useQuery } from '@tanstack/react-query';
import fetchMangas from "../API/fetchMangas";

export default function useMangas(type, order, limit, includedTags, excludedTags, page) {
    return useQuery([type, page], () => fetchMangas(order, limit, includedTags, excludedTags, page), {
        keepPreviousData: true, // Ensure previous data is not discarded during pagination
    });
}
