import { cn } from '@/lib/utils';
import { PiggyBank } from 'lucide-react';

const Logo = ({ withLogo = true, withHide = true }: { withLogo: boolean; withHide: boolean }) => {
  return (
    <a href="/" className={cn('items-center flex gap-2', withHide && 'hidden md:flex')}>
      {withLogo && <PiggyBank className="stroke  md:size-11 stroke-amber-500 stroke-[1.5] size-8" />}
      <p className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text md:text-3xl font-bold leading-tight tracking-tighter text-transparent text-xl">
        BudgetTracker
      </p>
    </a>
  );
};

export default Logo;
