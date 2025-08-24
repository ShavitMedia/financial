import React from 'react';
import { TrendingUp, TrendingDown, CreditCard, Target } from 'lucide-react';
import { Transaction } from '../types';
import { formatCurrency } from '../utils/formatters';

interface DashboardProps {
  transactions: Transaction[];
}

const Dashboard: React.FC<DashboardProps> = ({ transactions }) => {
  const currentMonth = new Date().toISOString().slice(0, 7);
  const monthlyTransactions = transactions.filter(t => t.date.startsWith(currentMonth));
  
  const totalIncome = monthlyTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalExpenses = monthlyTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const balance = totalIncome - totalExpenses;
  
  const stats = [
    {
      title: 'Current Balance',
      value: formatCurrency(balance),
      icon: CreditCard,
      color: balance >= 0 ? 'text-gray-900' : 'text-red-600',
      bgColor: balance >= 0 ? 'bg-gradient-to-br from-gray-50 to-gray-100' : 'bg-gradient-to-br from-red-50 to-red-100',
      iconColor: balance >= 0 ? 'text-gray-900' : 'text-red-600'
    },
    {
      title: 'Monthly Income',
      value: formatCurrency(totalIncome),
      icon: TrendingUp,
      color: 'text-emerald-700',
      bgColor: 'bg-gradient-to-br from-emerald-50 to-emerald-100',
      iconColor: 'text-emerald-700'
    },
    {
      title: 'Monthly Expenses',
      value: formatCurrency(totalExpenses),
      icon: TrendingDown,
      color: 'text-red-700',
      bgColor: 'bg-gradient-to-br from-red-50 to-red-100',
      iconColor: 'text-red-700'
    },
    {
      title: 'Savings Goal',
      value: formatCurrency(Math.max(0, totalIncome * 0.2)),
      icon: Target,
      color: 'text-indigo-700',
      bgColor: 'bg-gradient-to-br from-indigo-50 to-indigo-100',
      iconColor: 'text-indigo-700'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
      {stats.map((stat, index) => (
        <div key={index} className={`${stat.bgColor} rounded-2xl sm:rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 p-4 sm:p-6 border border-white/50 backdrop-blur-sm transform hover:scale-105 active:scale-95`}>
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-xs sm:text-sm font-semibold text-gray-600 mb-1 sm:mb-2 tracking-wide uppercase leading-tight">{stat.title}</p>
              <p className={`text-lg sm:text-2xl lg:text-3xl font-bold ${stat.color} tracking-tight`}>{stat.value}</p>
            </div>
            <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-white/60 backdrop-blur-sm shadow-sm">
              <stat.icon className={`h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 ${stat.iconColor}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;