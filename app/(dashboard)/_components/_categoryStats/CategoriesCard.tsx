import { GetCategoriesStatsResponseType } from '@/app/api/stats/categories/route';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TransactionType } from '@/lib/types';

interface CategoriesCardProps {
  data: GetCategoriesStatsResponseType;
  type: TransactionType;
  formatter: Intl.NumberFormat;
}
const CategoriesCard = ({ data, type, formatter }: CategoriesCardProps) => {
  const filteredData = data.filter((el) => el.type === type);
  const total = filteredData.reduce((acc, curr) => acc + (curr._sum?.amount || 0), 0);
  return (
    <Card className="col-span-6 h-80 w-full">
      <CardHeader>
        <CardTitle className="grid grid-flow-row justify-between gap-2 text-muted-foreground md:grid-flow-col">
          {type === 'income' ? 'Incomes' : 'Expences'} by category
        </CardTitle>
      </CardHeader>
      <div className="flex items-center justify-between gap-3">
        {filteredData.length === 0 && (
          <div className="flex h-60 w-full flex-col items-center justify-center p-2 text-center text-foreground">
            No data for selected period.
            <p className="text-sm text-muted-foreground">Select a different period or add new ${type}</p>
          </div>
        )}
        {filteredData.length > 0 && (
          <ScrollArea className="h-60 w-full px-4">
            <div className="flex w-full flex-col gap-4 p-4">
              {filteredData.map((item) => {
                const amount = item._sum.amount || 0;
                const percentage = (amount * 100) / (total || amount);
                return (
                  <div key={item.category} className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center text-gray-400">
                        {item.categoryIcon} {item.category}
                        <span className="ml-2 text-xs text-muted-foreground">({percentage.toFixed(0)}%)</span>
                      </span>
                      <span className="text-sm text-gray-400">{formatter.format(amount)}</span>
                    </div>
                    <Progress
                      value={percentage}
                      className='h-2'
                      indicator={
                        type === 'income' ? 'bg-emerald-700' : 'bg-rose-700'
                      }
                    />
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        )}
      </div>
    </Card>
  );
};

export default CategoriesCard;
