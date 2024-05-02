import prisma from '@/lib/prisma';
import { Period, Timeframe } from '@/lib/types';
import { getHistoryDataSchema } from '@/schema/history';
import { currentUser } from '@clerk/nextjs/server';
import { getDaysInMonth } from 'date-fns';
import { redirect } from 'next/navigation';
type HistoryData = {
  expense: number;
  income: number;
  year: number;
  month: number;
  day?: number;
};

const getMonthHistoryData = async (userId: string, year: number, month: number) => {
  const result = await prisma.monthHistory.groupBy({
    by: ['day'],
    where: {
      userId,
      year,
      month,
    },
    _sum: {
      expense: true,
      income: true,
    },
    orderBy: [
      {
        day: 'asc',
      },
    ],
  });
  if (!result || result.length === 0) return [];

  const history: HistoryData[] = [];
  const daysInMonth = getDaysInMonth(new Date(year, month));
  for (let i = 0; i < daysInMonth; i++) {
    let expense = 0;
    let income = 0;
    const day = result.find((row) => row.day === i);
    if (day) {
      expense = day._sum.expense || 0;
      income = day._sum.income || 0;
    }
    history.push({ year, month, day: i, expense, income });
  }
  return history;
};
const getYearHistoryData = async (userId: string, year: number) => {
  const result = await prisma.yearHistory.groupBy({
    by: ['month'],
    where: {
      userId,
      year,
    },
    _sum: {
      expense: true,
      income: true,
    },
    orderBy: [
      {
        month: 'asc',
      },
    ],
  });
  if (!result || result.length === 0) return [];

  const history: HistoryData[] = [];

  for (let i = 0; i < 12; i++) {
    let expense = 0;
    let income = 0;
    const month = result.find((row) => row.month === i);
    if (month) {
      expense = month._sum.expense || 0;
      income = month._sum.income || 0;
    }
    history.push({ year, month: i, expense, income });
  }
  return history;
};

const getHistoryData = async (userId: string, timeframe: Timeframe, period: Period) => {
  switch (timeframe) {
    case 'month': {
      return await getMonthHistoryData(userId, period.year, period.month);
    }
    case 'year': {
      return await getYearHistoryData(userId, period.year);
    }
  }
};
export type GetHistoryDataResponseType = Awaited<ReturnType<typeof getHistoryData>>;
export async function GET(request: Request) {
  const user = await currentUser();
  if (!user) redirect('/sign-in');
  const { searchParams } = new URL(request.url);
  const timeframe = searchParams.get('timeframe');
  const year = searchParams.get('year');
  const month = searchParams.get('month');

  const queryParams = getHistoryDataSchema.safeParse({ timeframe, month, year });
  if (!queryParams.success)
    return Response.json(queryParams.error.message, {
      status: 400,
    });
  const data = await getHistoryData(user.id, queryParams.data.timeframe, {
    month: queryParams.data.month,
    year: queryParams.data.year,
  });
}
