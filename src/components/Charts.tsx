import React from 'react';
import { Transaction } from '../types';
import { formatCurrency } from '../utils/formatters';
import { defaultCategories } from '../data/categories';

interface ChartsProps {
  transactions: Transaction[];
}

const Charts: React.FC<ChartsProps> = ({ transactions }) => {
  const currentMonth = new Date().toISOString().slice(0, 7);
  const monthlyTransactions = transactions.filter(t => t.date.startsWith(currentMonth));

  // Agrupar por categoria
  const expensesByCategory = monthlyTransactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  const incomeByCategory = monthlyTransactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  const totalExpenses = Object.values(expensesByCategory).reduce((sum, amount) => sum + amount, 0);
  const totalIncome = Object.values(incomeByCategory).reduce((sum, amount) => sum + amount, 0);

  const getCategoryColor = (categoryName: string, type: 'income' | 'expense') => {
    const category = defaultCategories.find(cat => cat.name === categoryName && cat.type === type);
    return category?.color || (type === 'income' ? '#10B981' : '#EF4444');
  };

  const ChartSection: React.FC<{
    title: string;
    data: Record<string, number>;
    total: number;
    type: 'income' | 'expense';
  }> = ({ title, data, total, type }) => (
    <div className="bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-lg border border-gray-200/50 p-4 sm:p-8">
      <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4 sm:mb-8">{title}</h3>
      
      {total === 0 ? (
        <div className="text-center py-6 sm:py-8 text-gray-500 text-sm sm:text-base">
          No transactions this month
        </div>
      ) : (
        <div className="space-y-4 sm:space-y-6">
          {Object.entries(data)
            .sort(([,a], [,b]) => b - a)
            .map(([category, amount]) => {
              const percentage = (amount / total) * 100;
              return (
                <div key={category} className="space-y-2 sm:space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div
                        className="w-3 h-3 sm:w-4 sm:h-4 rounded-full shadow-sm flex-shrink-0"
                        style={{ backgroundColor: getCategoryColor(category, type) }}
                      />
                      <span className="font-semibold text-gray-800 text-sm sm:text-base truncate">{category}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900 text-sm sm:text-lg">{formatCurrency(amount)}</div>
                      <div className="text-xs sm:text-sm text-gray-600 font-medium">{percentage.toFixed(1)}%</div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3 overflow-hidden">
                    <div
                      className="h-2 sm:h-3 rounded-full transition-all duration-500 shadow-sm"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: getCategoryColor(category, type)
                      }}
                    />
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
      <ChartSection
        title="Expenses by Category"
        data={expensesByCategory}
        total={totalExpenses}
        type="expense"
      />
      <ChartSection
        title="Income by Category"
        data={incomeByCategory}
        total={totalIncome}
        type="income"
      />
    </div>
  );
};

export default Charts;