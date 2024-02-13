import { useQuery } from '@tanstack/react-query';
import fetchMangaStatistics from '../API/fetchMangaStatistics';

export default function useMangaStatistics(mangaId) {
    return useQuery(['statistics', mangaId], () => fetchMangaStatistics(mangaId));
}
