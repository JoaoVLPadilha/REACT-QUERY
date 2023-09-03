import { Dispatch, SetStateAction, useCallback, useState } from 'react';

import type { Staff } from '../../../../../shared/types';
import { axiosInstance } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';
import { filterByTreatment } from '../utils';
import { useQuery } from '@tanstack/react-query';

// for when we need a query function for useQuery
async function getStaff(): Promise<Staff[]> {
  const { data } = await axiosInstance.get('/staff');
  return data;
}

interface UseStaff {
  filter: string;
  staff: Staff[];
  setFilter: Dispatch<SetStateAction<string>>;
}

export function useStaff(): UseStaff {
  // for filtering staff by treatment
  const fallback = []
  const [filter, setFilter] = useState('all');

  const filterFn = useCallback((data) => filterByTreatment(data, filter),[filter])

  const { data: staff = fallback } = useQuery({
    queryKey: [queryKeys.staff],
    queryFn: getStaff,
    select: filter === 'all' ? undefined : filterFn
  });

  // TODO: get data from server via useQuery
  

  return { staff, filter, setFilter };
}
