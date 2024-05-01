'use client';

import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';

interface RootProviderProps {
  children: ReactNode;
}
const RootProviders = ({ children }: RootProviderProps) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
};

export default RootProviders;
