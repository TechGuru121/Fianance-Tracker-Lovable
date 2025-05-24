
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, Edit, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { useFinanceStore } from '@/stores/financeStore';
import { EditTransactionDialog } from './EditTransactionDialog';
import type { Transaction } from '@/stores/financeStore';

interface TransactionListProps {
  limit?: number;
}

export const TransactionList = ({ limit }: TransactionListProps) => {
  const { filteredTransactions, deleteTransaction } = useFinanceStore();
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  const displayTransactions = limit 
    ? filteredTransactions.slice(0, limit)
    : filteredTransactions;

  if (displayTransactions.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">💰</div>
        <h3 className="text-lg font-semibold mb-2">No transactions yet</h3>
        <p className="text-slate-600 dark:text-slate-400">
          Start by adding your first transaction to track your finances
        </p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <>
      <div className="space-y-2">
        {displayTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all duration-200 hover:scale-[1.01]"
          >
            <div className="flex items-center space-x-4">
              <div className={`p-2 rounded-full ${
                transaction.type === 'income' 
                  ? 'bg-green-100 dark:bg-green-900/30' 
                  : 'bg-red-100 dark:bg-red-900/30'
              }`}>
                {transaction.type === 'income' ? (
                  <ArrowUpCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                ) : (
                  <ArrowDownCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h4 className="font-semibold text-slate-900 dark:text-slate-100">
                    {transaction.description}
                  </h4>
                  <Badge 
                    variant="secondary" 
                    className="text-xs"
                  >
                    {transaction.category}
                  </Badge>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {formatDate(transaction.date)}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className={`text-lg font-bold ${
                transaction.type === 'income' 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toLocaleString()}
              </div>
              
              <div className="flex space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setEditingTransaction(transaction)}
                  className="h-8 w-8 p-0 hover:bg-blue-100 dark:hover:bg-blue-900/30"
                >
                  <Edit className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteTransaction(transaction.id)}
                  className="h-8 w-8 p-0 hover:bg-red-100 dark:hover:bg-red-900/30"
                >
                  <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editingTransaction && (
        <EditTransactionDialog
          transaction={editingTransaction}
          open={true}
          onOpenChange={() => setEditingTransaction(null)}
        />
      )}
    </>
  );
};
