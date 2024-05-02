import { Card } from '@/components/ui/card';
import React, { useCallback } from 'react';
import CountUp from 'react-countup';
interface StatCardProps {
  formatter: Intl.NumberFormat;
  icon: React.ReactNode;
  title: string;
  value: number;
}
const StatCard = ({ formatter, value, title, icon }: StatCardProps) => {
  const formatFn = useCallback(
    (value: number) => {
      return formatter.format(value);
    },
    [formatter],
  );
  return (
    <Card className="flex h-24 w-full items-center gap-2 p-4">
      {icon}
      <div className="flex flex-col items-start gap-0">
        <p className="text-muted-foreground">{title}</p>
        <CountUp preserveValue redraw={false} end={value} decimals={2} formattingFn={formatFn} className='text-2xl' />
      </div>
    </Card>
  );
};

export default StatCard;
