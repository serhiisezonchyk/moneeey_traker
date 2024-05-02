'use client';
import { UserSettings } from '@prisma/client';
import { startOfMonth } from 'date-fns';
import React from 'react';

interface OverviewProps {
  userSettings: UserSettings;
}
const Overview = ({ userSettings }: OverviewProps) => {
  const [dateRange, setDateRange] = React.useState<{ from: Date; to: Date }>({
    from: startOfMonth(new Date()),
    to: new Date(),
  });
  return <div>Overview</div>;
};

export default Overview;
