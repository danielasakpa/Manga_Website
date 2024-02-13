import { useQuery } from '@tanstack/react-query';
import fetchMangaCover from '../API/fetchMangaCover';

export default function useMangaCover(id) {
    return useQuery(['cover', id], () => fetchMangaCover(id));
}