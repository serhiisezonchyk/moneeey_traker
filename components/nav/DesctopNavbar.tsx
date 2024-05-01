'use client';
import { cn } from '@/lib/utils';
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '../logo/Logo';
import { buttonVariants } from '../ui/button';
import items from './nav-items.json';
import { ThemeSwitcherButton } from '../theme-switcher/ThemeSwitcherButton';
import NavbarItem from './NavbarItem';


const DesctopNavbar = () => {
  return (
    <div className="hidden border-separate border-b bg-background md:block">
      <nav className="container flex items-center justify-between px-8">
        <div className="flex h-[80px] min-h-[60px] items-center gap-x-4">
          <Logo />
          <div className="flex h-full">
            {items.map((item) => (
              <NavbarItem key={item.label} link={item.link} label={item.label} />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ThemeSwitcherButton />
          <UserButton afterSignOutUrl="/sign-in" />
        </div>
      </nav>
    </div>
  );
};

export default DesctopNavbar;
