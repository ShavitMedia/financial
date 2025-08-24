import React, { useState } from 'react';
import { Transaction } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import TransactionModal from './components/TransactionModal';
import TransactionList from './components/TransactionList';
import Charts from './components/Charts';

function App() {
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>('transactions', []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const generateId = () => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  };

  const handleSaveTransaction = (transactionData: Omit<Transaction, 'id' | 'createdAt'>) => {
    if (editingTransaction) {
      // Editar transação existente
      setTransactions(transactions.map(t => 
        t.id === editingTransaction.id 
          ? { ...transactionData, id: editingTransaction.id, createdAt: editingTransaction.createdAt }
          : t
      ));
      setEditingTransaction(null);
    } else {
      // Nova transação
      const newTransaction: Transaction = {
        ...transactionData,
        id: generateId(),
        createdAt: new Date().toISOString(),
      };
      setTransactions([newTransaction, ...transactions]);
    }
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleDeleteTransaction = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta transação?')) {
      setTransactions(transactions.filter(t => t.id !== id));
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTransaction(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 pb-safe">
      <Header 
        onAddTransaction={() => setIsModalOpen(true)} 
        onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />
      
      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-12">
        <Dashboard transactions={transactions} />
        <Charts transactions={transactions} />
        <TransactionList 
          transactions={transactions}
          onEdit={handleEditTransaction}
          onDelete={handleDeleteTransaction}
        />
      </main>

      <TransactionModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSaveTransaction}
        editTransaction={editingTransaction || undefined}
      />
    </div>
  );
}

export default App;