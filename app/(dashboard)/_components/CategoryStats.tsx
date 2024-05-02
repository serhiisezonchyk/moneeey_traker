'use client';
import SkeletonWrapper from '@/components/skeleton-wrapper/SkeletonWrapper';
import { DateToUTCDate, GetFormatterForCurrency } from '@/lib/helpers';
import { UserSettings } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import CategoriesCard from './CategoriesCard';

interface CategoryStatsProps {
  from: Date;
  to: Date;
  userSettings: UserSettings;
}

const CategoryStats = ({ from, to, userSettings }: CategoryStatsProps) => {
  const statsQuery = useQuery({
    queryKey: ['overview', 'stats', 'categories', from, to],
    queryFn: () =>
      fetch(`/api/stats/categories?from=${DateToUTCDate(from)}&to=${DateToUTCDate(to)}`).then((res) => res.json()),
  });
  const formatter = useMemo(() => {
    return GetFormatterForCurrency(userSettings.currency);
  }, [userSettings.currency]);
  return (
    <div className="flex w-full flex-wrap gap-2 md:flex-nowrap">
      <SkeletonWrapper isLoading={statsQuery.isFetching}>
        <CategoriesCard formatter={formatter} type="income" data={statsQuery.data || []} />
      </SkeletonWrapper>
      <SkeletonWrapper isLoading={statsQuery.isFetching}>
        <CategoriesCard formatter={formatter} type="expense" data={statsQuery.data || []} />
      </SkeletonWrapper>
    </div>
  );
};

export default CategoryStats;
