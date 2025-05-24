
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useFinanceStore, EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '@/stores/financeStore';

export const CategoryFilter = () => {
  const { selectedCategory, setSelectedCategory, transactions } = useFinanceStore();

  // Get unique categories from transactions
  const usedCategories = Array.from(
    new Set(transactions.map(t => t.category))
  ).sort();

  const allCategories = Array.from(
    new Set([...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES, ...usedCategories])
  ).sort();

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
        Filter by:
      </span>
      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="All Categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All Categories</SelectItem>
          {allCategories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
