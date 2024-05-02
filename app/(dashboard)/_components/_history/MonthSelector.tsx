import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Period } from '@/lib/types';
interface MonthSelectorType {
  period: Period;
  setPeriod: (period: Period) => void;
}
const MonthSelector = ({ period, setPeriod }: MonthSelectorType) => {
  return (
    <Select
      value={period.month.toString()}
      onValueChange={(value) => {
        setPeriod({ month: parseInt(value), year: period.year });
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]?.map((month) => {
          const monthString = new Date(period.year, month, 1).toLocaleString('default', {
            month: 'long',
          });
          return (
            <SelectItem key={month} value={month.toString()}>
              {monthString}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export default MonthSelector;
