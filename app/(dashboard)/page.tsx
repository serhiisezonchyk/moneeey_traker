import { Button } from '@/components/ui/button';
import prisma from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import CreateTransactionDialog from './_components/_dialogs/CreateTransactionDialog';
import Overview from './_components/Overview';
import History from './_components/History';

const page = async () => {
  const user = await currentUser();
  if (!user) redirect('/sign-in');
  const userSettings = await prisma.userSettings.findUnique({
    where: {
      userId: user.id,
    },
  });
  if (!userSettings) {
    redirect('/wizard');
  }
  return (
    <div className="h-full bg-background">
      <div className="container border-b bg-card">
        <div className="flex flex-wrap items-center justify-between gap-6 py-8">
          <p className="text-3xl font-bold">Hello,{user.firstName} 👋</p>
          <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
            <CreateTransactionDialog
              trigger={
                <Button
                  variant="outline"
                  className="w-full sm:w-[145px] border-emerald-500 bg-emerald-700 text-white hover:bg-emerald-500 hover:text-white dark:bg-emerald-950 dark:hover:bg-emerald-700 "
                >
                  New income 💸
                </Button>
              }
              type="income"
            />
            <CreateTransactionDialog
              trigger={
                <Button
                  variant="outline"
                  className="w-full sm:w-[145px] border-rose-500 bg-rose-700 text-white hover:bg-rose-500 hover:text-white dark:bg-rose-950 dark:hover:bg-rose-700"
                >
                  New expence 😑
                </Button>
              }
              type="expense"
            />
          </div>
        </div>
      </div>

      <Overview userSettings={userSettings} />
      <History userSettings={userSettings} />
    </div>
  );
};

export default page;
