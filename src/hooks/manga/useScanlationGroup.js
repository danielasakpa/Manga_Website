import { useQuery } from '@tanstack/react-query';
import fetchScanlationGroup from '../../API/manga/fetchScanlationGroup';

export function useScanlationGroup(groupId) {

    return useQuery(['Scanlation Group', groupId], () => fetchScanlationGroup(groupId));
}