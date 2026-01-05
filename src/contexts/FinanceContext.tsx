import { createContext, useContext, useState, ReactNode } from 'react';
import {
  Transaction,
  Goal,
  CreditCard,
  BankAccount,
  FamilyMember,
} from '../types';
import { generateMockData } from '../utils/mockData';

interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

interface ExpenseByCategory {
  category: string;
  amount: number;
  percentage: number;
}

interface FinanceContextType {
  // Arrays principais
  transactions: Transaction[];
  goals: Goal[];
  creditCards: CreditCard[];
  bankAccounts: BankAccount[];
  familyMembers: FamilyMember[];

  // Filtros globais
  selectedMember: string | null;
  dateRange: DateRange;
  transactionType: 'all' | 'income' | 'expense';
  searchText: string;

  // Funções CRUD - Transactions
  addTransaction: (transaction: Transaction) => void;
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;

  // Funções CRUD - Goals
  addGoal: (goal: Goal) => void;
  updateGoal: (id: string, goal: Partial<Goal>) => void;
  deleteGoal: (id: string) => void;

  // Funções CRUD - CreditCards
  addCreditCard: (card: CreditCard) => void;
  updateCreditCard: (id: string, card: Partial<CreditCard>) => void;
  deleteCreditCard: (id: string) => void;

  // Funções CRUD - BankAccounts
  addBankAccount: (account: BankAccount) => void;
  updateBankAccount: (id: string, account: Partial<BankAccount>) => void;
  deleteBankAccount: (id: string) => void;

  // Funções CRUD - FamilyMembers
  addFamilyMember: (member: FamilyMember) => void;
  updateFamilyMember: (id: string, member: Partial<FamilyMember>) => void;
  deleteFamilyMember: (id: string) => void;

  // Funções de filtro
  setSelectedMember: (memberId: string | null) => void;
  setDateRange: (range: DateRange) => void;
  setTransactionType: (type: 'all' | 'income' | 'expense') => void;
  setSearchText: (text: string) => void;

  // Funções de cálculo derivadas
  getFilteredTransactions: () => Transaction[];
  calculateTotalBalance: () => number;
  calculateIncomeForPeriod: () => number;
  calculateExpensesForPeriod: () => number;
  calculateExpensesByCategory: () => ExpenseByCategory[];
  calculateCategoryPercentage: (category: string) => number;
  calculateSavingsRate: () => number;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

interface FinanceProviderProps {
  children: ReactNode;
}

export function FinanceProvider({ children }: FinanceProviderProps) {
  // Gerar dados mock iniciais
  const mockData = generateMockData();

  // Estados principais
  const [transactions, setTransactions] = useState<Transaction[]>(mockData.transactions);
  const [goals, setGoals] = useState<Goal[]>(mockData.goals);
  const [creditCards, setCreditCards] = useState<CreditCard[]>(mockData.creditCards);
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>(mockData.bankAccounts);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>(mockData.familyMembers);

  // Filtros globais
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });
  const [transactionType, setTransactionType] = useState<
    'all' | 'income' | 'expense'
  >('all');
  const [searchText, setSearchText] = useState<string>('');

  // Funções CRUD - Transactions
  const addTransaction = (transaction: Transaction) => {
    setTransactions((prev) => [...prev, transaction]);
  };

  const updateTransaction = (id: string, updates: Partial<Transaction>) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
  };

  const deleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  // Funções CRUD - Goals
  const addGoal = (goal: Goal) => {
    setGoals((prev) => [...prev, goal]);
  };

  const updateGoal = (id: string, updates: Partial<Goal>) => {
    setGoals((prev) => prev.map((g) => (g.id === id ? { ...g, ...updates } : g)));
  };

  const deleteGoal = (id: string) => {
    setGoals((prev) => prev.filter((g) => g.id !== id));
  };

  // Funções CRUD - CreditCards
  const addCreditCard = (card: CreditCard) => {
    setCreditCards((prev) => [...prev, card]);
  };

  const updateCreditCard = (id: string, updates: Partial<CreditCard>) => {
    setCreditCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
  };

  const deleteCreditCard = (id: string) => {
    setCreditCards((prev) => prev.filter((c) => c.id !== id));
  };

  // Funções CRUD - BankAccounts
  const addBankAccount = (account: BankAccount) => {
    setBankAccounts((prev) => [...prev, account]);
  };

  const updateBankAccount = (id: string, updates: Partial<BankAccount>) => {
    setBankAccounts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...updates } : a))
    );
  };

  const deleteBankAccount = (id: string) => {
    setBankAccounts((prev) => prev.filter((a) => a.id !== id));
  };

  // Funções CRUD - FamilyMembers
  const addFamilyMember = (member: FamilyMember) => {
    setFamilyMembers((prev) => [...prev, member]);
  };

  const updateFamilyMember = (id: string, updates: Partial<FamilyMember>) => {
    setFamilyMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updates } : m))
    );
  };

  const deleteFamilyMember = (id: string) => {
    setFamilyMembers((prev) => prev.filter((m) => m.id !== id));
  };

  // Funções de cálculo derivadas
  const getFilteredTransactions = (): Transaction[] => {
    let filtered = [...transactions];

    // Filtro por membro
    if (selectedMember) {
      filtered = filtered.filter((t) => t.memberId === selectedMember);
    }

    // Filtro por tipo
    if (transactionType !== 'all') {
      filtered = filtered.filter((t) => t.type === transactionType);
    }

    // Filtro por período
    if (dateRange.startDate && dateRange.endDate) {
      filtered = filtered.filter((t) => {
        const tDate = new Date(t.date);
        return (
          tDate >= dateRange.startDate! && tDate <= dateRange.endDate!
        );
      });
    }

    // Filtro por busca textual
    if (searchText) {
      const search = searchText.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.description.toLowerCase().includes(search) ||
          t.category.toLowerCase().includes(search)
      );
    }

    return filtered;
  };

  const calculateTotalBalance = (): number => {
    const accountsBalance = bankAccounts.reduce(
      (sum, account) => sum + account.balance,
      0
    );
    const cardsBalance = creditCards.reduce(
      (sum, card) => sum + card.currentBill,
      0
    );
    return accountsBalance - cardsBalance;
  };

  const calculateIncomeForPeriod = (): number => {
    const filtered = getFilteredTransactions();
    return filtered
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const calculateExpensesForPeriod = (): number => {
    const filtered = getFilteredTransactions();
    return filtered
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const calculateExpensesByCategory = (): ExpenseByCategory[] => {
    const filtered = getFilteredTransactions();
    const expenses = filtered.filter((t) => t.type === 'expense');

    const categoryMap = new Map<string, number>();
    expenses.forEach((expense) => {
      const current = categoryMap.get(expense.category) || 0;
      categoryMap.set(expense.category, current + expense.amount);
    });

    const totalExpenses = expenses.reduce((sum, t) => sum + t.amount, 0);

    const result: ExpenseByCategory[] = Array.from(categoryMap.entries()).map(
      ([category, amount]) => ({
        category,
        amount,
        percentage: totalExpenses === 0 ? 0 : Number(((amount / totalExpenses) * 100).toFixed(1)),
      })
    );

    return result.sort((a, b) => b.amount - a.amount);
  };

  const calculateCategoryPercentage = (category: string): number => {
    const totalIncome = calculateIncomeForPeriod();
    if (totalIncome === 0) return 0;

    const expenses = calculateExpensesByCategory();
    const categoryExpense = expenses.find((e) => e.category === category);
    const categoryAmount = categoryExpense?.amount || 0;

    return Number(((categoryAmount / totalIncome) * 100).toFixed(1));
  };

  const calculateSavingsRate = (): number => {
    const income = calculateIncomeForPeriod();
    if (income === 0) return 0;

    const expenses = calculateExpensesForPeriod();
    const savings = income - expenses;

    return Number(((savings / income) * 100).toFixed(1));
  };

  const value: FinanceContextType = {
    // Arrays principais
    transactions,
    goals,
    creditCards,
    bankAccounts,
    familyMembers,

    // Filtros globais
    selectedMember,
    dateRange,
    transactionType,
    searchText,

    // Funções CRUD
    addTransaction,
    updateTransaction,
    deleteTransaction,
    addGoal,
    updateGoal,
    deleteGoal,
    addCreditCard,
    updateCreditCard,
    deleteCreditCard,
    addBankAccount,
    updateBankAccount,
    deleteBankAccount,
    addFamilyMember,
    updateFamilyMember,
    deleteFamilyMember,

    // Funções de filtro
    setSelectedMember,
    setDateRange,
    setTransactionType,
    setSearchText,

    // Funções de cálculo
    getFilteredTransactions,
    calculateTotalBalance,
    calculateIncomeForPeriod,
    calculateExpensesForPeriod,
    calculateExpensesByCategory,
    calculateCategoryPercentage,
    calculateSavingsRate,
  };

  return (
    <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>
  );
}

export function useFinance() {
  const context = useContext(FinanceContext);
  if (context === undefined) {
    throw new Error('useFinance deve ser usado dentro de FinanceProvider');
  }
  return context;
}

