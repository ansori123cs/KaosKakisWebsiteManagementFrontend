import { ReactNode } from 'react';
import Badge from '../ui/badge/Badge';
import { ArrowDown, ArrowUp } from 'lucide-react';

interface CardDashboardProps {
  title: string;
  total?: number;
  percentage?: number;
  leverage?: boolean;
  icon?: ReactNode;
}

const CardDashboard: React.FC<CardDashboardProps> = ({ title, total = 0, percentage = 0, leverage, icon }) => {
  return (
    <div className='rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6'>
      <div className='flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800'>{icon}</div>

      <div className='flex items-end justify-between mt-5'>
        <div>
          <span className='text-sm text-gray-500 dark:text-gray-400'>{title}</span>
          <h4 className='mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90'>{total}</h4>
        </div>
        <Badge color={leverage ? 'success' : 'error'}>
          {leverage ? <ArrowUp /> : <ArrowDown />}
          {percentage}
        </Badge>
      </div>
    </div>
  );
};
export default CardDashboard;
