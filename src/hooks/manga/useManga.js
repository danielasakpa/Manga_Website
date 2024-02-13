import { useQuery } from '@tanstack/react-query';
import fetchManga from '../../API/manga/fetchManga';

export function useManga(mangaId) {
    return useQuery(['mangaDetails', mangaId], () => fetchManga(mangaId));
}