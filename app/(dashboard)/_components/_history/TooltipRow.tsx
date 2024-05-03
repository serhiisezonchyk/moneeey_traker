import { cn } from '@/lib/utils';
import { useCallback } from 'react';
import CountUp from 'react-countup';

interface TooltipRowProps {
  label: string;
  value: number;
  textColor: string;
  bgColor: string;
  formatter: Intl.NumberFormat;
}
const TooltipRow = ({ label, value, bgColor, textColor, formatter }: TooltipRowProps) => {
  const formattingFn = useCallback(
    (value: number) => {
      return formatter.format(value);
    },
    [formatter],
  );
  return (
    <div className="flex items-center gap-2">
      <div className={cn('size-4 rounded-full', bgColor)} />
      <div className="flex w-full justify-between">
        <p className="text-muted-foregrond text-sm">{label}</p>
        <div className={cn('text-sm font-bold', textColor)}>
          <CountUp
            duration={0.5}
            preserveValue
            end={value}
            decimals={0}
            formattingFn={formattingFn}
            className="text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default TooltipRow;
