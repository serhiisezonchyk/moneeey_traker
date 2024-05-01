import Logo from '@/components/logo/Logo';
import React, { ReactNode } from 'react';
interface LayoutProps {
  children: ReactNode;
}
const layout = ({ children }: LayoutProps) => {
  return (
    <div className='relative flex h-screen w-full flex-col items-center justify-center'>
      <Logo/>
      <div className='mt-12'>{children}</div>
    </div>
  );
};

export default layout;
