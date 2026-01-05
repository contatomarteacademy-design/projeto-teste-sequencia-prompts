/**
 * Tipos TypeScript fundamentais para o sistema mycash+
 */

/**
 * Tipo de transação financeira
 */
export type TransactionType = 'income' | 'expense';

/**
 * Status de uma transação
 */
export type TransactionStatus = 'pending' | 'completed';

/**
 * Entidade Transaction - Representa uma transação financeira
 */
export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  description: string;
  category: string;
  date: Date;
  accountId: string; // ID da conta bancária ou cartão de crédito
  memberId?: string; // ID opcional do membro da família responsável
  installments: number; // Número de parcelas (1 = à vista)
  status: TransactionStatus;
}

/**
 * Tema visual de um cartão de crédito
 */
export type CreditCardTheme = 'black' | 'lime' | 'white';

/**
 * Entidade CreditCard - Representa um cartão de crédito
 */
export interface CreditCard {
  id: string;
  name: string; // Nome do cartão/banco (ex: "Nubank", "Itaú Mastercard")
  closingDay: number; // Dia do mês em que a fatura fecha (1-31)
  dueDay: number; // Dia do mês em que a fatura vence (1-31)
  limit: number; // Limite total do cartão
  currentBill: number; // Fatura atual (quanto já foi gasto)
  theme: CreditCardTheme;
  logoUrl?: string; // URL do logo do banco (opcional)
  lastDigits?: string; // Últimos 4 dígitos do cartão (opcional)
}

/**
 * Tipo de conta bancária
 */
export type BankAccountType = 'checking' | 'savings' | 'investment';

/**
 * Entidade BankAccount - Representa uma conta bancária
 */
export interface BankAccount {
  id: string;
  name: string; // Nome da conta
  balance: number; // Saldo atual
  type: BankAccountType;
  bankName?: string; // Nome do banco (opcional)
}

/**
 * Entidade Goal - Representa um objetivo financeiro
 */
export interface Goal {
  id: string;
  name: string;
  description?: string;
  targetAmount: number; // Valor da meta
  currentAmount: number; // Valor atual acumulado
  category: string; // Categoria do objetivo
  image?: string; // URL da imagem do objetivo (opcional)
  deadline?: Date; // Data limite para alcançar o objetivo (opcional)
}

/**
 * Entidade FamilyMember - Representa um membro da família
 */
export interface FamilyMember {
  id: string;
  name: string;
  role: string; // Função na família (ex: "Pai", "Mãe", "Filho")
  avatarUrl?: string; // URL do avatar (opcional)
  monthlyIncome?: number; // Renda mensal estimada (opcional)
}

/**
 * Entidade CalendarEvent - Representa um evento na agenda
 */
export interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  type?: 'bill' | 'reminder' | 'goal'; // Tipo de evento (opcional)
}

