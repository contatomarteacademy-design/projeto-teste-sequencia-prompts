import { useFinance } from '../../contexts/FinanceContext';
import { FiCreditCard, FiPlus, FiChevronRight } from 'react-icons/fi';
import { CreditCard } from '../../types';

// Helper para obter o logo do banco baseado no nome
const getBankLogo = (name: string): string | undefined => {
  const nameLower = name.toLowerCase();
  if (nameLower.includes('nubank') || nameLower.includes('nu')) {
    return 'https://www.figma.com/api/mcp/asset/54af71e5-054e-4829-82d7-3e02dccaedd0';
  }
  if (nameLower.includes('inter')) {
    return 'https://www.figma.com/api/mcp/asset/30394a71-1717-438c-8d0a-8be8180be9ef';
  }
  if (nameLower.includes('xp')) {
    return 'https://www.figma.com/api/mcp/asset/b92c2f4f-1d5e-45ff-bec9-ffe473d24427';
  }
  return undefined;
};

// Helper para formatar data de vencimento
const formatDueDate = (dueDay: number): string => {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  
  // Criar data de vencimento para o mês atual
  const dueDate = new Date(currentYear, currentMonth, dueDay);
  
  // Se a data já passou este mês, mostrar próximo mês
  if (dueDate < today) {
    const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
    const nextDueDate = new Date(nextYear, nextMonth, dueDay);
    
    // Se for próximo mês, mostrar "Vence X Mês"
    const monthName = nextDueDate.toLocaleDateString('pt-BR', { month: 'short' });
    return `Vence ${dueDay} ${monthName.charAt(0).toUpperCase() + monthName.slice(1)}`;
  }
  
  // Se for este mês, mostrar "Vence dia X"
  return `Vence dia ${dueDay}`;
};

// Componente de card individual
const CreditCardItem = ({ card }: { card: CreditCard }) => {
  const logoUrl = card.logoUrl || getBankLogo(card.name);
  const formattedAmount = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(card.currentBill);

  // Extrair apenas o nome do banco (remover "Mastercard", "Visa", etc)
  const bankName = card.name.split(' ')[0];

  return (
    <div className="bg-neutral-0 border border-neutral-300 rounded-xl p-6 w-full">
      <div className="flex flex-col gap-[5px]">
        {/* Header do card: Logo + Nome e Últimos dígitos */}
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-[5px]">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt={bankName}
                className="w-[22px] h-[22px] rounded-[2px] object-cover"
              />
            ) : (
              <div className="w-[22px] h-[22px] rounded-[2px] bg-neutral-300 flex items-center justify-center">
                <span className="text-label-xs text-neutral-1100 font-semibold">
                  {bankName.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <span className="text-paragraph-md text-neutral-1100">
              {bankName}
            </span>
          </div>
          {card.lastDigits && (
            <span className="text-label-xs text-neutral-1100 font-semibold">
              **** {card.lastDigits}
            </span>
          )}
        </div>

        {/* Valor da fatura */}
        <p className="text-heading-md text-neutral-1100 font-bold">
          {formattedAmount}
        </p>

        {/* Data de vencimento */}
        <p className="text-label-xs text-neutral-1100 font-semibold">
          {formatDueDate(card.dueDay)}
        </p>
      </div>
    </div>
  );
};

export default function CreditCardsWidget() {
  const { creditCards } = useFinance();

  return (
    <div className="flex flex-col gap-4 w-full min-w-0">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[14px]">
          <FiCreditCard size={24} className="text-neutral-1100" />
          <h3 className="text-heading-xs text-neutral-1100 font-bold">
            Cartões
          </h3>
        </div>
        <div className="flex items-center gap-3">
          {/* Botão Adicionar */}
          <button
            className="bg-neutral-0 border border-neutral-300 rounded-xl p-2 hover:bg-neutral-200 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
            aria-label="Adicionar cartão"
            onClick={() => {
              // TODO: Abrir modal de adicionar cartão (será implementado no PROMPT 15)
              console.log('Abrir modal de adicionar cartão');
            }}
          >
            <FiPlus size={24} className="text-neutral-1100" />
          </button>
          {/* Botão Ver Todos */}
          <button
            className="bg-neutral-0 border border-neutral-300 rounded-xl p-2 hover:bg-neutral-200 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
            aria-label="Ver todos os cartões"
            onClick={() => {
              // TODO: Navegar para página de cartões (será implementado no PROMPT 19)
              console.log('Navegar para página de cartões');
            }}
          >
            <FiChevronRight size={24} className="text-neutral-1100" />
          </button>
        </div>
      </div>

      {/* Lista de Cartões */}
      <div className="flex flex-col gap-4">
        {creditCards.length === 0 ? (
          <div className="bg-neutral-0 border border-neutral-300 rounded-xl p-8 text-center">
            <p className="text-paragraph-lg text-neutral-500">
              Nenhum cartão cadastrado
            </p>
          </div>
        ) : (
          creditCards.map((card) => (
            <CreditCardItem key={card.id} card={card} />
          ))
        )}
      </div>
    </div>
  );
}

