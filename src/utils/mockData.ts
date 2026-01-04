import { v4 as uuidv4 } from 'uuid';
import {
  Transaction,
  Goal,
  CreditCard,
  BankAccount,
  FamilyMember,
} from '../types';

// Gera uma data nos últimos 3 meses
const getRandomDateInLast3Months = (): Date => {
  const now = new Date();
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(now.getMonth() - 3);
  const timeDiff = now.getTime() - threeMonthsAgo.getTime();
  const randomTime = threeMonthsAgo.getTime() + Math.random() * timeDiff;
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
      name: 'Nubank Mastercard',
      closingDay: 15,
      dueDay: 20,
      limit: 5000,
      currentBill: 3200,
      theme: 'lime',
      logoUrl: undefined,
      lastDigits: '1234',
    },
    {
      id: uuidv4(),
      name: 'Itaú Visa',
      closingDay: 5,
      dueDay: 10,
      limit: 8000,
      currentBill: 4500,
      theme: 'black',
      logoUrl: undefined,
      lastDigits: '5678',
    },
    {
      id: uuidv4(),
      name: 'Bradesco Mastercard',
      closingDay: 20,
      dueDay: 25,
      limit: 3000,
      currentBill: 1200,
      theme: 'white',
      logoUrl: undefined,
      lastDigits: '9012',
    },
  ];

  const cardIds = creditCards.map((c) => c.id);

  // Categorias brasileiras
  const incomeCategories = ['Salário', 'Freelance', 'Investimentos', 'Outros'];
  const expenseCategories = [
    'Alimentação',
    'Transporte',
    'Moradia',
    'Saúde',
    'Educação',
    'Lazer',
    'Vestuário',
    'Outros',
  ];

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
      date: getRandomDateInLast3Months(),
      accountId: accountIds[0],
      memberId: memberIds[index % memberIds.length],
      installments: 1,
      status: 'completed',
    });
  });

  // Despesas
  const expenseAmounts = [
    450, 320, 280, 150, 120, 890, 650, 420, 380, 250, 180, 1200, 980, 750,
    550, 420, 350, 280, 220, 180, 150, 120, 95, 75,
  ];
  expenseAmounts.forEach((amount, index) => {
    transactions.push({
      id: uuidv4(),
      type: 'expense',
      amount,
      description: `Despesa ${expenseCategories[index % expenseCategories.length]}`,
      category: expenseCategories[index % expenseCategories.length],
      date: getRandomDateInLast3Months(),
      accountId: index % 3 === 0 ? cardIds[index % cardIds.length] : accountIds[0],
      memberId: memberIds[index % memberIds.length],
      installments: index % 5 === 0 ? 3 : 1,
      status: index % 3 === 0 ? 'pending' : 'completed',
    });
  });

  // Objetivos
  const goals: Goal[] = [
    {
      id: uuidv4(),
      name: 'Viagem para Europa',
      description: 'Economizar para viagem de 15 dias',
      targetAmount: 30000,
      currentAmount: 12500,
      category: 'Viagem',
      image: undefined,
      deadline: new Date('2024-12-31'),
    },
    {
      id: uuidv4(),
      name: 'Trocar o Carro',
      description: 'Economizar para entrada de carro novo',
      targetAmount: 50000,
      currentAmount: 18000,
      category: 'Automóvel',
      image: undefined,
      deadline: new Date('2025-06-30'),
    },
    {
      id: uuidv4(),
      name: 'Reserva de Emergência',
      description: 'Manter reserva de 6 meses de gastos',
      targetAmount: 60000,
      currentAmount: 35000,
      category: 'Reserva',
      image: undefined,
      deadline: undefined,
    },
    {
      id: uuidv4(),
      name: 'Reforma da Casa',
      description: 'Economizar para reforma da cozinha',
      targetAmount: 25000,
      currentAmount: 8500,
      category: 'Casa',
      image: undefined,
      deadline: new Date('2024-10-31'),
    },
  ];

  return {
    transactions,
    goals,
    creditCards,
    bankAccounts,
    familyMembers,
  };
};

