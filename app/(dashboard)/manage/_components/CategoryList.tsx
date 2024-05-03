import SkeletonWrapper from '@/components/skeleton-wrapper/SkeletonWrapper';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { TransactionType } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Category } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { PlusSquare, TrendingDown, TrendingUp } from 'lucide-react';
import CreateCategoryDialog from '../../_components/_dialogs/CreateCategoryDialog';
import CategoryCard from './CategoryCard';

const CategoryList = ({ type }: { type: TransactionType }) => {
  const categoriesQuery = useQuery({
    queryKey: ['categories', type],
    queryFn: () => fetch(`/api/categories?type=${type}`).then((res) => res.json()),
  });

  const dataAvailable = categoriesQuery.data && categoriesQuery.data.length > 0;
  return (
    <SkeletonWrapper isLoading={categoriesQuery.isLoading} fullWidth={true}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              {type === 'expense' ? (
                <TrendingDown className="size-12 items-center rounded-lg bg-rose-500/10 p-2 text-rose-500" />
              ) : (
                <TrendingUp className="size-12 items-center rounded-lg bg-emerald-500/10 p-2 text-emerald-500" />
              )}
              <div>
                {type === 'income' ? 'Incomes' : 'Expenses'} categories
                <div className="text-sm text-muted-foreground">Sorted by name text</div>
              </div>
            </div>

            <CreateCategoryDialog
              type={type}
              onSuccessCallback={() => categoriesQuery.refetch}
              trigger={
                <Button className="gap-2 text-sm">
                  <PlusSquare className="size-4" />
                  Create category
                </Button>
              }
            />
          </CardTitle>
        </CardHeader>
        <Separator />
        {!dataAvailable && (
          <div className="flex h-40 w-full items-center justify-center flex-col">
            <p>
              No <span className={cn('m-1', type === 'income' ? 'text-emerald-500' : 'text-rose-500')}>{type}</span>
              categories yet
            </p>
            <p className="text-sm text-muted-foreground">Create one to get started</p>
          </div>
        )}
        {dataAvailable && (
          <div className="grid grid-flow-row gap-2 p-2 sm:grid-flow-row sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {categoriesQuery.data.map((category: Category) => (
              <CategoryCard category={category} key={category.name} />
            ))}
          </div>
        )}
      </Card>
    </SkeletonWrapper>
  );
};

export default CategoryList;
