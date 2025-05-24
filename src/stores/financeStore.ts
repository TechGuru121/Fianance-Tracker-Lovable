
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: string;
  createdAt: string;
}

export const EXPENSE_CATEGORIES = [
  'Food & Dining',
  'Transportation',
  'Shopping',
  'Entertainment',
  'Bills & Utilities',
  'Healthcare',
  'Travel',
  'Education',
  'Groceries',
  'Other'
];

export const INCOME_CATEGORIES = [
  'Salary',
  'Freelance',
  'Business',
  'Investment',
  'Gift',
  'Other'
];

interface FinanceState {
  transactions: Transaction[];
  selectedCategory: string;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'createdAt'>) => void;
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  setSelectedCategory: (category: string) => void;
  getFilteredTransactions: () => Transaction[];
  getTotalIncome: () => number;
  getTotalExpenses: () => number;
  getBalance: () => number;
}

export const useFinanceStore = create<FinanceState>()(
  persist(
    (set, get) => ({
      transactions: [
        {
          id: '1',
          type: 'expense',
          amount: 45.50,
          category: 'Food & Dining',
          description: 'Lunch at restaurant',
          date: '2024-01-20',
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          type: 'income',
          amount: 3500,
          category: 'Salary',
          description: 'Monthly salary',
          date: '2024-01-15',
          createdAt: new Date().toISOString()
        },
        {
          id: '3',
          type: 'expense',
          amount: 120,
          category: 'Transportation',
          description: 'Gas for car',
          date: '2024-01-18',
          createdAt: new Date().toISOString()
        }
      ],
      selectedCategory: 'All',

      addTransaction: (transaction) => {
        const newTransaction: Transaction = {
          ...transaction,
          id: Date.now().toString(),
          createdAt: new Date().toISOString()
        };
        set((state) => ({
          transactions: [newTransaction, ...state.transactions]
        }));
      },

      updateTransaction: (id, updatedTransaction) => {
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === id ? { ...t, ...updatedTransaction } : t
          )
        }));
      },

      deleteTransaction: (id) => {
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id)
        }));
      },

      setSelectedCategory: (category) => {
        set({ selectedCategory: category });
      },

      getFilteredTransactions: () => {
        const { transactions, selectedCategory } = get();
        if (selectedCategory === 'All') return transactions;
        return transactions.filter((t) => t.category === selectedCategory);
      },

      getTotalIncome: () => {
        const { transactions } = get();
        return transactions
          .filter((t) => t.type === 'income')
          .reduce((sum, t) => sum + t.amount, 0);
      },

      getTotalExpenses: () => {
        const { transactions } = get();
        return transactions
          .filter((t) => t.type === 'expense')
          .reduce((sum, t) => sum + t.amount, 0);
      },

      getBalance: () => {
        const { getTotalIncome, getTotalExpenses } = get();
        return getTotalIncome() - getTotalExpenses();
      }
    }),
    {
      name: 'finance-store'
    }
  )
);
