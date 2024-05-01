'use client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { buttonVariants } from '../ui/button';
interface NavbarItemProps {
  link: string;
  label: string;
  onClick?: () => void;
}
const NavbarItem = ({ link, label, onClick }: NavbarItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === link;
  return (
    <div className="relative flex items-center">
      <Link
        href={link}
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'w-full justify-start text-lg text-muted-foreground hover:text-foreground',
          isActive && 'text-foreground',
        )}
        onClick={() => onClick?.()}
      >
        {label}
      </Link>
      {isActive && (
        <div className="absolute -bottom-[2px] left-1/2 hidden h-[2px] w-[80%] -translate-x-1/2 rounded-xl  bg-foreground md:block"></div>
      )}
    </div>
  );
};

export default NavbarItem;
