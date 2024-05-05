import { useQuery } from '@tanstack/react-query';
import fetchLatestUploads from '../../API/manga/fetchLatestUploads';


const useLatestUploads = (type, order, limit, includes, page) => {

    const { data, isLoading, isError, error } = useQuery([type, order, limit, includes, page], () => fetchLatestUploads (order, limit, includes, page));

    const total = data?.total ?? 0;

    return { data, isLoading, isError, error, total };
};

export default useLatestUploads;
