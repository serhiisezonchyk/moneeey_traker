import { Loader2 } from 'lucide-react';

const loading = () => {
  return <p className='flex justify-center items-center h-screen'><Loader2 className='animate-spin size-20 text-primary'/></p>;
};

export default loading;
