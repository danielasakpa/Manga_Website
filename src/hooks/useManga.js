import { useQuery } from '@tanstack/react-query';
import fetchManga from '../API/fetchManga';

export function useManga(mangaId) {
    return useQuery(['mangaDetails', mangaId], () => fetchManga(mangaId));
}