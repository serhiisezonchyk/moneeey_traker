import { GetFormatterForCurrency } from '@/lib/helpers';
import prisma from '@/lib/prisma';
import { OverviewQuerySchema } from '@/schema/overview';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

const getTransactionsHistory = async (userId: string, from: Date, to: Date) => {
  const userSetting = await prisma.userSettings.findUnique({
    where: {
      userId,
    },
  });
  if (!userSetting) {
    throw new Error('User settings not found');
  }

  const formatter = GetFormatterForCurrency(userSetting.currency);

  const transactions = await prisma.transaction.findMany({
    where: {
      userId,
      date: {
        gte: from,
        lte: to,
      },
    },
    orderBy: {
      date: 'desc',
    },
  });
  return transactions.map((transaction) => ({
    ...transaction,
    foramttedAmmount: formatter.format(transaction.amount),
  }));
};

export type GetTransactionHistoryResponseType = Awaited<ReturnType<typeof getTransactionsHistory>>;

export async function GET(request: Request) {
  const user = await currentUser();
  if (!user) {
    redirect('/sign-in');
  }
  const { searchParams } = new URL(request.url);
  const from = searchParams.get('from');
  const to = searchParams.get('to');

  const queryParams = OverviewQuerySchema.safeParse({ from, to });

  if (!queryParams.success) {
    return Response.json('Spmething went wrong', {
      status: 400,
    });
  }

  const transactions = await getTransactionsHistory(user.id, queryParams.data.from, queryParams.data.to);

  return Response.json(transactions);
}
