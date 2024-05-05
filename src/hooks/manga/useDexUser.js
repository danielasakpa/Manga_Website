import { useQuery } from '@tanstack/react-query';
import fetchDexUser from '../../API/manga/fetchDexUser';

export function useDexUser(userId) {

    return useQuery(['Dex User', userId], () => fetchDexUser(userId));
}