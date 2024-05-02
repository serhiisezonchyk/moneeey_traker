'use client';
import { UserSettings } from '@prisma/client';

interface CategoryStatsProps {
  from: Date;
  to: Date;
  userSettings: UserSettings;
}

const CategoryStats = ({ from, to, userSettings }: CategoryStatsProps) => {
    
  return <div>CategoryStats</div>;
};

export default CategoryStats;
