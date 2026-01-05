import { v4 as uuidv4 } from 'uuid';
import {
  Transaction,
  Goal,
  CreditCard,
  BankAccount,
  FamilyMember,
  CalendarEvent,
} from '../types';

// Gera uma data no mês atual (para garantir que apareçam no filtro padrão)
const getRandomDateInCurrentMonth = (): Date => {
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const timeDiff = lastDayOfMonth.getTime() - firstDayOfMonth.getTime();
  const randomTime = firstDayOfMonth.getTime() + Math.random() * timeDiff;
  return new Date(randomTime);
};

export const generateMockData = () => {
  // Membros da família
  const familyMembers: FamilyMember[] = [
    {
      id: uuidv4(),
      name: 'João Silva',
      role: 'Pai',
      avatarUrl: undefined,
      monthlyIncome: 8500,
    },
    {
      id: uuidv4(),
      name: 'Maria Silva',
      role: 'Mãe',
      avatarUrl: undefined,
      monthlyIncome: 6200,
    },
    {
      id: uuidv4(),
      name: 'Pedro Silva',
      role: 'Filho',
      avatarUrl: undefined,
      monthlyIncome: 0,
    },
  ];

  const memberIds = familyMembers.map((m) => m.id);

  // Contas bancárias
  const bankAccounts: BankAccount[] = [
    {
      id: uuidv4(),
      name: 'Conta Corrente Nubank',
      balance: 12500,
      type: 'checking',
      bankName: 'Nubank',
    },
    {
      id: uuidv4(),
      name: 'Conta Poupança Itaú',
      balance: 8500,
      type: 'savings',
      bankName: 'Itaú',
    },
  ];

  const accountIds = bankAccounts.map((a) => a.id);

  // Cartões de crédito
  const creditCards: CreditCard[] = [
    {
      id: uuidv4(),
      name: 'Nubank',
      closingDay: 15,
      dueDay: 21,
      limit: 10000,
      currentBill: 5245,
      theme: 'lime',
      logoUrl: undefined,
      lastDigits: '5897',
    },
    {
      id: uuidv4(),
      name: 'Inter',
      closingDay: 5,
      dueDay: 12,
      limit: 8000,
      currentBill: 1500,
      theme: 'black',
      logoUrl: undefined,
      lastDigits: '4765',
    },
    {
      id: uuidv4(),
      name: 'XP',
      closingDay: 20,
      dueDay: 17,
      limit: 5000,
      currentBill: 738.97,
      theme: 'white',
      logoUrl: undefined,
      lastDigits: '2356',
    },
  ];

  const cardIds = creditCards.map((c) => c.id);

  // Categorias brasileiras
  const incomeCategories = ['Salário', 'Freelance', 'Investimentos', 'Outros'];

  // Transações
  const transactions: Transaction[] = [];

  // Receitas
  const incomeAmounts = [8500, 6200, 3500, 1200, 800, 500];
  incomeAmounts.forEach((amount, index) => {
    transactions.push({
      id: uuidv4(),
      type: 'income',
      amount,
      description: `Salário do mês ${index + 1}`,
      category: incomeCategories[index % incomeCategories.length],
      date: getRandomDateInCurrentMonth(),
      accountId: accountIds[0],
      memberId: memberIds[index % memberIds.length],
      installments: 1,
      status: 'completed',
    });
  });

  // Despesas - Garantindo pelo menos 10 categorias com valores significativos
  const expenseData = [
    { category: 'Alimentação', amounts: [1200, 850, 650, 450, 320, 280, 150] },
    { category: 'Transporte', amounts: [450, 320, 280, 150, 120, 95] },
    { category: 'Moradia', amounts: [4000, 3500, 2800, 1200] },
    { category: 'Saúde', amounts: [850, 650, 420, 380, 250, 180] },
    { category: 'Educação', amounts: [1200, 980, 750, 550, 420] },
    { category: 'Lazer', amounts: [650, 420, 380, 250, 180, 150, 120] },
    { category: 'Vestuário', amounts: [550, 420, 350, 280, 220, 180] },
    { category: 'Compras', amounts: [890, 750, 550, 420, 350, 280, 220] },
    { category: 'Serviços', amounts: [450, 320, 280, 150, 120, 95, 75] },
    { category: 'Outros', amounts: [350, 280, 220, 180, 150, 120, 95] },
  ];

  expenseData.forEach(({ category, amounts }) => {
    amounts.forEach((amount) => {
      transactions.push({
        id: uuidv4(),
        type: 'expense',
        amount,
        description: `${category} - ${amount > 500 ? 'Gasto grande' : 'Gasto médio'}`,
        category,
        date: getRandomDateInCurrentMonth(),
        accountId: Math.random() > 0.3 ? accountIds[0] : cardIds[Math.floor(Math.random() * cardIds.length)],
        memberId: memberIds[Math.floor(Math.random() * memberIds.length)],
        installments: Math.random() > 0.8 ? 3 : 1,
        status: Math.random() > 0.7 ? 'pending' : 'completed',
      });
    });
  });

  // Objetivos
  const goals: Goal[] = [
    {
      id: uuidv4(),
      name: 'Viagem Europa',
      description: 'Economizar para viagem de 15 dias',
      targetAmount: 50000,
      currentAmount: 25000,
      category: 'Lazer',
      image: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=400',
      deadline: new Date('2024-12-31'),
    },
    {
      id: uuidv4(),
      name: 'Carro novo',
      description: 'Economizar para entrada de carro novo',
      targetAmount: 100000,
      currentAmount: 50000,
      category: 'Transporte',
      image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400',
      deadline: new Date('2025-06-30'),
    },
    {
      id: uuidv4(),
      name: 'Casa própria',
      description: 'Economizar para entrada de casa',
      targetAmount: 500000,
      currentAmount: 250000,
      category: 'Moradia',
      image: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=400',
      deadline: new Date('2026-12-31'),
    },
    {
      id: uuidv4(),
      name: 'Reserva de emergência',
      description: 'Manter reserva de 6 meses de gastos',
      targetAmount: 50000,
      currentAmount: 25000,
      category: 'Reserva',
      image: 'https://images.unsplash.com/photo-1620336655055-bd87ca8f1370?w=400',
      deadline: undefined,
    },
  ];

  // Eventos da agenda (Janeiro 2026)
  const calendarEvents: CalendarEvent[] = [
    {
      id: uuidv4(),
      title: 'Conta de Luz',
      date: new Date(2026, 0, 24), // 24 de janeiro de 2026
      type: 'bill',
    },
    {
      id: uuidv4(),
      title: 'Conta de Água',
      date: new Date(2026, 0, 24), // 24 de janeiro de 2026
      type: 'bill',
    },
    {
      id: uuidv4(),
      title: 'Internet',
      date: new Date(2026, 0, 28), // 28 de janeiro de 2026
      type: 'bill',
    },
  ];

  return {
    transactions,
    goals,
    creditCards,
    bankAccounts,
    familyMembers,
    calendarEvents,
  };
};

