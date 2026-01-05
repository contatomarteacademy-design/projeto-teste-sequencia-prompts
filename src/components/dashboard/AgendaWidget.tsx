import { useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiCalendar } from 'react-icons/fi';
import { FiPlus, FiArrowRight, FiCheck } from 'react-icons/fi';
import { useFinance } from '../../contexts/FinanceContext';
import { Bill } from '../../types';

export default function AgendaWidget() {
  const { bills, updateBill } = useFinance();
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 1)); // Janeiro 2026
  const [selectedDay, setSelectedDay] = useState<number | null>(17); // Dia 17 como padrão (hoje)

  const monthNames = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Primeiro dia do mês
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay(); // 0 = Domingo

  // Navegação entre meses
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDay(null); // Limpar seleção ao mudar de mês
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDay(null); // Limpar seleção ao mudar de mês
  };

  // Verificar se uma data tem contas pendentes
  const hasPendingBills = (day: number): boolean => {
    const dayDate = new Date(year, month, day);
    return bills.some(
      (bill) =>
        bill.status === 'pending' &&
        bill.dueDate.getDate() === dayDate.getDate() &&
        bill.dueDate.getMonth() === dayDate.getMonth() &&
        bill.dueDate.getFullYear() === dayDate.getFullYear()
    );
  };

  // Verificar se é hoje (17 de janeiro de 2026 para o mock)
  const isToday = (day: number): boolean => {
    const today = new Date();
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  // Obter contas do dia selecionado
  const getBillsForDay = (day: number | null): Bill[] => {
    if (day === null) return [];

    const dayDate = new Date(year, month, day);
    return bills.filter((bill) => {
      const billDate = new Date(bill.dueDate);
      return (
        billDate.getDate() === dayDate.getDate() &&
        billDate.getMonth() === dayDate.getMonth() &&
        billDate.getFullYear() === dayDate.getFullYear()
      );
    });
  };

  const selectedDayBills = getBillsForDay(selectedDay);

  // Marcar conta como paga
  const markBillAsPaid = (billId: string) => {
    updateBill(billId, { status: 'paid' });
  };

  // Formatar data em português
  const formatDate = (day: number): string => {
    const date = new Date(year, month, day);
    return date.toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
    });
  };

  // Formatar valor monetário
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <div className="bg-neutral-0 border border-neutral-300 rounded-xl p-6 w-full min-w-0">
      {/* Header */}
      <div className="flex items-center gap-[14px] mb-5">
        <FiCalendar size={24} className="text-neutral-1100" />
        <h3 className="text-heading-xs text-neutral-1100 font-bold">Agenda</h3>
      </div>

      {/* Calendário */}
      <div className="bg-neutral-0 border border-neutral-300 rounded-[28px] overflow-hidden mb-4">
        {/* Header do Calendário */}
        <div className="flex items-center justify-between pl-4 pr-3 py-1 border-b border-neutral-300">
          <div className="flex items-center gap-2 pl-2 pr-1 py-[10px] rounded-[100px] hover:bg-neutral-200 transition-colors cursor-pointer">
            <span className="text-label-sm text-neutral-500">
              {monthNames[month]} {year}
            </span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              className="text-neutral-500"
            >
              <path
                d="M4.5 6.75L9 11.25L13.5 6.75"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="flex items-center gap-0">
            <button
              onClick={goToPreviousMonth}
              className="w-12 h-12 flex items-center justify-center hover:bg-neutral-200 rounded-full transition-colors"
              aria-label="Mês anterior"
            >
              <FiChevronLeft size={24} className="text-neutral-500" />
            </button>
            <button
              onClick={goToNextMonth}
              className="w-12 h-12 flex items-center justify-center hover:bg-neutral-200 rounded-full transition-colors"
              aria-label="Próximo mês"
            >
              <FiChevronRight size={24} className="text-neutral-500" />
            </button>
          </div>
        </div>

        {/* Grid do Calendário */}
        <div className="px-6 py-6">
          {/* Dias da semana */}
          <div className="grid grid-cols-7 h-12 mb-0">
            {weekDays.map((day, index) => (
              <div
                key={index}
                className="flex items-center justify-center h-full"
              >
                <span className="text-paragraph-md text-neutral-1100">{day}</span>
              </div>
            ))}
          </div>

          {/* Semanas do mês */}
          <div className="flex flex-col gap-6">
            {Array.from({ length: Math.ceil((startingDayOfWeek + daysInMonth) / 7) }).map(
              (_, weekIndex) => {
                const weekDays = [];
                for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
                  const dayNumber = weekIndex * 7 + dayIndex - startingDayOfWeek + 1;
                  if (dayNumber < 1 || dayNumber > daysInMonth) {
                    weekDays.push(
                      <div
                        key={`empty-${weekIndex}-${dayIndex}`}
                        className="flex items-center justify-center h-12"
                      />
                    );
                  } else {
                    const isCurrentDay = isToday(dayNumber);
                    const isSelected = selectedDay === dayNumber;
                    const hasPending = hasPendingBills(dayNumber);

                    weekDays.push(
                      <div
                        key={dayNumber}
                        className="flex flex-col items-center justify-center h-12 relative"
                      >
                        <button
                          onClick={() => setSelectedDay(dayNumber)}
                          className={`
                            flex items-center justify-center
                            transition-all duration-200
                            rounded-full
                            w-8 h-8
                            ${isSelected ? 'bg-brand-500' : isCurrentDay ? 'bg-neutral-500' : 'bg-transparent'}
                            ${!isSelected && !isCurrentDay ? 'hover:bg-neutral-200' : ''}
                          `}
                        >
                          <span
                            className={`
                              text-label-sm font-medium
                              ${isSelected ? 'text-neutral-1100' : isCurrentDay ? 'text-neutral-0' : 'text-neutral-1100'}
                            `}
                          >
                            {dayNumber}
                          </span>
                        </button>
                        {/* Indicador de conta pendente - abaixo do círculo */}
                        {hasPending && !isSelected && (
                          <div className="absolute bottom-0 w-1.5 h-1.5 bg-red-400 rounded-full" />
                        )}
                      </div>
                    );
                  }
                }
                return (
                  <div key={weekIndex} className="grid grid-cols-7 h-12">
                    {weekDays}
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>

      {/* Lista de Contas do Dia Selecionado */}
      {selectedDay !== null && (
        <div className="mt-4">
          {/* Header da seção */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-label-lg font-semibold text-neutral-1100">
                {formatDate(selectedDay)}
              </span>
              {selectedDayBills.length > 0 && (
                <span className="bg-neutral-200 text-neutral-1100 text-label-sm font-semibold px-2 py-1 rounded-full">
                  {selectedDayBills.length}
                </span>
              )}
            </div>
          </div>

          {/* Lista de contas ou mensagem vazia */}
          {selectedDayBills.length > 0 ? (
            <div className="space-y-2">
              {selectedDayBills.map((bill) => (
                <div
                  key={bill.id}
                  className="bg-neutral-200 border border-neutral-300 rounded-xl p-4 flex items-center gap-4"
                >
                  {/* Indicador de status */}
                  <div
                    className={`
                      w-1.5 h-1.5 rounded-full flex-shrink-0
                      ${bill.status === 'paid' ? 'bg-brand-500' : 'bg-red-400'}
                    `}
                  />

                  {/* Descrição */}
                  <div className="flex-1 min-w-0">
                    <p className="text-label-sm font-semibold text-neutral-1100 truncate">
                      {bill.description}
                    </p>
                    <p className="text-paragraph-sm text-neutral-500">
                      {formatCurrency(bill.amount)}
                    </p>
                  </div>

                  {/* Botão de check */}
                  {bill.status === 'pending' && (
                    <button
                      onClick={() => markBillAsPaid(bill.id)}
                      className="w-8 h-8 rounded-full border border-neutral-300 bg-transparent flex items-center justify-center hover:bg-brand-500 hover:border-brand-500 transition-colors flex-shrink-0 group"
                      aria-label="Marcar como pago"
                    >
                      <FiCheck
                        size={16}
                        className="text-neutral-500 group-hover:text-neutral-0"
                      />
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="border-2 border-dashed border-neutral-300 rounded-xl p-8 text-center">
              <p className="text-paragraph-md text-neutral-500">Nada hoje.</p>
            </div>
          )}
        </div>
      )}

      {/* Botões de ação */}
      <div className="flex items-center justify-end gap-2 mt-4">
        <button className="w-10 h-10 rounded-full bg-neutral-200 flex items-center justify-center hover:bg-neutral-300 transition-colors">
          <FiPlus size={20} className="text-neutral-1100" />
        </button>
        <button className="w-10 h-10 rounded-full bg-neutral-200 flex items-center justify-center hover:bg-neutral-300 transition-colors">
          <FiArrowRight size={20} className="text-neutral-1100" />
        </button>
      </div>
    </div>
  );
}
