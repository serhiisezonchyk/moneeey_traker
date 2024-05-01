import Navbar from '@/components/nav/Navbar';
import { ReactNode } from 'react';
interface Props {
  children: ReactNode;
}
const layout = ({ children }: Props) => {
  return (
    <div className="relative flex h-screen w-full flex-col">
      <Navbar />
      <div className="w-full">{children}</div>
    </div>
  );
};

export default layout;
