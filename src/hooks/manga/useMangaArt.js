import { useQuery } from '@tanstack/react-query';
import fetchMangaArt from '../../API/manga/fetchMangaArt';

export default function useMangaArt(id) {
    return useQuery(['covers', id], () => fetchMangaArt(id));
}