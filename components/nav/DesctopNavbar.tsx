'use client';
import { UserButton } from '@clerk/nextjs';
import Logo from '../logo/Logo';
import { ThemeSwitcherButton } from '../theme-switcher/ThemeSwitcherButton';
import NavbarItem from './NavbarItem';
import items from './nav-items.json';

const DesctopNavbar = () => {
  return (
    <div className="hidden border-separate border-b bg-background md:block">
      <nav className="container flex items-center justify-between px-8">
        <div className="flex h-[60px] min-h-[60px] items-center gap-x-4">
          <Logo />
          <div className="flex h-full">
            {items.map((item) => (
              <NavbarItem key={item.label} link={item.link} label={item.label} />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ThemeSwitcherButton />
          <UserButton
            afterSignOutUrl="/sign-in"
            appearance={{
              elements: {
                avatarBox:{
                  width: '38px',
                  height: '38px',
                  "&:hover":'none'
                },
              },
            }}
          />
        </div>
      </nav>
    </div>
  );
};

export default DesctopNavbar;
