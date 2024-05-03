import { cn } from '@/lib/utils';
import { CircleDollarSign } from 'lucide-react';

const Logo = ({ withLogo = true, withHide = true }: { withLogo?: boolean; withHide?: boolean }) => {
  return (
    <a href="/" className={cn('items-center flex gap-2', withHide && 'hidden md:flex')}>
      {withLogo && <CircleDollarSign className="stroke  md:size-11 text-violet-600 stroke-[1.5] size-8" />}
      <p className="bg-gradient-to-r from-violet-800 to-primary bg-clip-text md:text-2xl font-bold leading-tight tracking-tighter text-transparent text-xl">
        Money?!
      </p>
    </a>
  );
};

export default Logo;
