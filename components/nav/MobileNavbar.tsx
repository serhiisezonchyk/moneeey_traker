'use client';
import { UserButton } from '@clerk/nextjs';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import Logo from '../logo/Logo';
import { ThemeSwitcherButton } from '../theme-switcher/ThemeSwitcherButton';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import NavbarItem from './NavbarItem';
import items from './nav-items.json';

const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="block border-separate bg-background md:hidden">
      <nav className="container flex items-center justify-between px-8">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full sm:w-[540px]" side="left">
            <Logo withLogo={true} withHide={false} />
            <div className="flex flex-col gap-1 pt-4">
              {items.map((item) => (
                <NavbarItem
                  key={item.label}
                  link={item.link}
                  label={item.label}
                  onClick={() => setIsOpen((prev) => !prev)}
                />
              ))}
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex h-[60px] min-h-[60px] items-center gap-x-4">
          <Logo withLogo withHide={true} />
        </div>
        <div className="flex items-center gap-2">
          <ThemeSwitcherButton />
          <UserButton
            afterSignOutUrl="/sign-in"
            appearance={{
              elements: {
                avatarBox: {
                  width: '38px',
                  height: '38px',
                  '&:hover': 'none',
                },
              },
            }}
          />
        </div>
      </nav>
    </div>
  );
};

export default MobileNavbar;
