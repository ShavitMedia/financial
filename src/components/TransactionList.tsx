import React, { useState } from 'react';
import { Edit2, Trash2, Calendar, Tag } from 'lucide-react';
import { Transaction } from '../types';
import { formatCurrency, formatDate } from '../utils/formatters';
import { defaultCategories } from '../data/categories';

interface TransactionListProps {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  onEdit,
  onDelete
}) => {
  const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date');

  const filteredTransactions = transactions
    .filter(t => filter === 'all' || t.type === filter)
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return b.amount - a.amount;
    });

  const getCategoryColor = (categoryName: string, type: 'income' | 'expense') => {
    const category = defaultCategories.find(cat => cat.name === categoryName && cat.type === type);
    return category?.color || (type === 'income' ? '#10B981' : '#EF4444');
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-lg border border-gray-200/50">
      <div className="p-4 sm:p-8 border-b border-gray-200/50">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Recent Transactions</h2>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as 'all' | 'income' | 'expense')}
              className="px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white/80 backdrop-blur-sm font-medium text-sm sm:text-base"
            >
              <option value="all">All</option>
              <option value="income">Income</option>
              <option value="expense">Expenses</option>
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'amount')}
              className="px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white/80 backdrop-blur-sm font-medium text-sm sm:text-base"
            >
              <option value="date">Date</option>
              <option value="amount">Amount</option>
            </select>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-8">
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-8 sm:py-12">
            <Calendar className="h-10 w-10 sm:h-12 sm:w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-medium">No transactions found</p>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {filteredTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 sm:p-6 border border-gray-200/50 rounded-xl sm:rounded-2xl hover:bg-gray-50/80 transition-all duration-300 backdrop-blur-sm transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
                  <div
                    className="w-3 h-3 sm:w-4 sm:h-4 rounded-full shadow-sm flex-shrink-0"
                    style={{
                      backgroundColor: getCategoryColor(transaction.category, transaction.type)
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 mb-1">
                      <h3 className="font-semibold text-gray-900 truncate text-sm sm:text-lg">
                        {transaction.description}
                      </h3>
                      <span className="flex items-center text-xs text-gray-600 bg-gray-100/80 px-2 sm:px-3 py-1 rounded-full font-medium mt-1 sm:mt-0 self-start">
                        <Tag className="h-2 w-2 sm:h-3 sm:w-3 mr-1" />
                        {transaction.category}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-500 font-medium">
                      {formatDate(transaction.date)}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-end sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                  <span
                    className={`font-bold text-sm sm:text-lg lg:text-xl tracking-tight ${
                      transaction.type === 'income' ? 'text-emerald-700' : 'text-red-700'
                    }`}
                  >
                    {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                  </span>
                  
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <button
                      onClick={() => onEdit(transaction)}
                      className="text-gray-600 hover:text-gray-900 p-2 sm:p-3 hover:bg-gray-100 rounded-xl sm:rounded-2xl transition-all duration-300 active:scale-95"
                    >
                      <Edit2 className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                    <button
                      onClick={() => onDelete(transaction.id)}
                      className="text-red-600 hover:text-red-700 p-2 sm:p-3 hover:bg-red-50 rounded-xl sm:rounded-2xl transition-all duration-300 active:scale-95"
                    >
                      <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionList;