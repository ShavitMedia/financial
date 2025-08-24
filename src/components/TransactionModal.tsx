import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Transaction } from '../types';
import { defaultCategories } from '../data/categories';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (transaction: Omit<Transaction, 'id' | 'createdAt'>) => void;
  editTransaction?: Transaction;
}

const TransactionModal: React.FC<TransactionModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editTransaction
}) => {
  const [formData, setFormData] = useState({
    type: editTransaction?.type || 'expense' as 'income' | 'expense',
    amount: editTransaction?.amount?.toString() || '',
    description: editTransaction?.description || '',
    category: editTransaction?.category || '',
    date: editTransaction?.date || new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.amount || !formData.description || !formData.category) return;

    onSave({
      type: formData.type,
      amount: parseFloat(formData.amount),
      description: formData.description,
      category: formData.category,
      date: formData.date
    });

    setFormData({
      type: 'expense',
      amount: '',
      description: '',
      category: '',
      date: new Date().toISOString().split('T')[0]
    });
    onClose();
  };

  const categories = defaultCategories.filter(cat => cat.type === formData.type);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
      <div className="bg-white/95 backdrop-blur-xl rounded-t-3xl sm:rounded-3xl shadow-2xl w-full sm:max-w-md sm:w-full max-h-[90vh] overflow-y-auto border-t sm:border border-gray-200/50 safe-area-bottom">
        <div className="flex items-center justify-between p-6 sm:p-8 border-b border-gray-200/50">
          <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            {editTransaction ? 'Edit Transaction' : 'New Transaction'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-2 rounded-full hover:bg-gray-100 active:scale-95"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4 sm:space-y-6">
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={() => setFormData({...formData, type: 'income', category: ''})}
              className={`flex-1 py-3 sm:py-4 px-4 sm:px-6 rounded-xl sm:rounded-2xl font-semibold transition-all duration-300 active:scale-95 ${
                formData.type === 'income'
                  ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Income
            </button>
            <button
              type="button"
              onClick={() => setFormData({...formData, type: 'expense', category: ''})}
              className={`flex-1 py-3 sm:py-4 px-4 sm:px-6 rounded-xl sm:rounded-2xl font-semibold transition-all duration-300 active:scale-95 ${
                formData.type === 'expense'
                  ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Expense
            </button>
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3 tracking-wide uppercase">
              Amount
            </label>
            <input
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={(e) => setFormData({...formData, amount: e.target.value})}
              className="w-full px-4 sm:px-6 py-3 sm:py-4 border border-gray-300 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white/80 backdrop-blur-sm font-semibold text-base sm:text-lg"
              placeholder="0,00"
              required
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3 tracking-wide uppercase">
              Description
            </label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full px-4 sm:px-6 py-3 sm:py-4 border border-gray-300 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white/80 backdrop-blur-sm font-medium"
              placeholder="e.g., Grocery shopping"
              required
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3 tracking-wide uppercase">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="w-full px-4 sm:px-6 py-3 sm:py-4 border border-gray-300 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white/80 backdrop-blur-sm font-medium"
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3 tracking-wide uppercase">
              Date
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              className="w-full px-4 sm:px-6 py-3 sm:py-4 border border-gray-300 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white/80 backdrop-blur-sm font-medium"
              required
            />
          </div>

          <div className="flex space-x-3 sm:space-x-4 pt-4 sm:pt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 sm:py-4 px-4 sm:px-6 border border-gray-300 text-gray-700 rounded-xl sm:rounded-2xl hover:bg-gray-50 font-semibold transition-all duration-300 active:scale-95"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 sm:py-4 px-4 sm:px-6 bg-gradient-to-r from-gray-900 to-black text-white rounded-xl sm:rounded-2xl hover:from-black hover:to-gray-900 font-semibold transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95"
            >
              {editTransaction ? 'Update' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionModal;