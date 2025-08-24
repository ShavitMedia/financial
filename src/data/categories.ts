import { Category } from '../types';

export const defaultCategories: Category[] = [
  // Receitas
  { id: '1', name: 'Salary', type: 'income', color: '#059669', icon: 'Wallet' },
  { id: '2', name: 'Freelance', type: 'income', color: '#047857', icon: 'Briefcase' },
  { id: '3', name: 'Investments', type: 'income', color: '#065F46', icon: 'TrendingUp' },
  { id: '4', name: 'Other', type: 'income', color: '#10B981', icon: 'Plus' },

  // Despesas
  { id: '5', name: 'Food & Dining', type: 'expense', color: '#DC2626', icon: 'UtensilsCrossed' },
  { id: '6', name: 'Transportation', type: 'expense', color: '#B91C1C', icon: 'Car' },
  { id: '7', name: 'Housing', type: 'expense', color: '#991B1B', icon: 'Home' },
  { id: '8', name: 'Healthcare', type: 'expense', color: '#7F1D1D', icon: 'Heart' },
  { id: '9', name: 'Education', type: 'expense', color: '#EF4444', icon: 'GraduationCap' },
  { id: '10', name: 'Entertainment', type: 'expense', color: '#F59E0B', icon: 'Gamepad2' },
  { id: '11', name: 'Shopping', type: 'expense', color: '#D97706', icon: 'ShoppingBag' },
  { id: '12', name: 'Other', type: 'expense', color: '#92400E', icon: 'MoreHorizontal' },
];