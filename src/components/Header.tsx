import React from 'react';
import { CreditCard, Plus, Menu } from 'lucide-react';

interface HeaderProps {
  onAddTransaction: () => void;
  onMenuToggle?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAddTransaction, onMenuToggle }) => {
  return (
    <header className="bg-white/90 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-50 safe-area-top">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 sm:py-4">
          {/* Mobile menu button */}
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors duration-200"
          >
            <Menu className="h-6 w-6 text-gray-700" />
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black p-2 sm:p-3 rounded-xl sm:rounded-2xl shadow-lg">
              <CreditCard className="h-5 w-5 sm:h-7 sm:w-7 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Uniclass Finance
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 font-medium">Premium Financial Control</p>
            </div>
          </div>
          
          <button
            onClick={onAddTransaction}
            className="bg-gradient-to-r from-gray-900 to-black hover:from-black hover:to-gray-900 text-white px-3 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl font-semibold flex items-center space-x-1 sm:space-x-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
          >
            <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-sm sm:text-base">New</span>
            <span className="hidden sm:inline">Transaction</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;