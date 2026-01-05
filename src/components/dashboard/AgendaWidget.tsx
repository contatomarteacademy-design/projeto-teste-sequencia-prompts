import { useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiBarChart2 } from 'react-icons/fi';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { useFinance } from '../../contexts/FinanceContext';

export default function AgendaWidget() {
  const { calendarEvents } = useFinance();
  const events = calendarEvents;
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 1)); // Janeiro 2026

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

  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Primeiro dia do mês
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay();

  // Navegação entre meses
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // Verificar se uma data tem evento
  const getEventsForDate = (day: number) => {
    return events.filter((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getDate() === day &&
        eventDate.getMonth() === month &&
        eventDate.getFullYear() === year
      );
    });
  };

  // Verificar se é hoje
  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  // Renderizar células do calendário
  const renderCalendarDays = () => {
    const days = [];

    // Células vazias antes do primeiro dia do mês
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(
        <div key={`empty-${i}`} className="flex items-center justify-center h-12" />
      );
    }

    // Dias do mês
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = getEventsForDate(day);
      const hasEvent = dayEvents.length > 0;
      const isCurrentDay = isToday(day);

      days.push(
        <div
          key={day}
          className="flex items-center justify-center h-12 relative"
        >
          {isCurrentDay ? (
            <div className="w-10 h-10 bg-brand-500 rounded-full flex items-center justify-center">
              <span className="text-label-sm font-medium text-neutral-1100">
                {day}
              </span>
            </div>
          ) : hasEvent ? (
            <div className="w-10 h-10 border border-red-400 rounded-full flex items-center justify-center">
              <span className="text-paragraph-md text-red-400">{day}</span>
            </div>
          ) : (
            <span className="text-paragraph-md text-neutral-1100">{day}</span>
          )}
        </div>
      );
    }

    return days;
  };

  // Eventos do mês atual ordenados por data
  const currentMonthEvents = events
    .filter((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getMonth() === month && eventDate.getFullYear() === year
      );
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3); // Apenas os 3 primeiros

  return (
    <div className="bg-neutral-0 border border-neutral-300 rounded-xl p-6 w-full min-w-0">
      {/* Header */}
      <div className="flex items-center gap-[14px] mb-5">
        <FiBarChart2 size={24} className="text-neutral-1100" />
        <h3 className="text-heading-xs text-neutral-1100 font-bold">Agenda</h3>
      </div>

      {/* Calendário */}
      <div className="border border-neutral-300 rounded-[28px] overflow-hidden mb-4">
        {/* Header do Calendário */}
        <div className="flex items-center justify-between px-4 py-1 border-b border-neutral-300">
          <div className="flex items-center gap-2 px-2 py-[10px] rounded-[100px] hover:bg-neutral-200 transition-colors cursor-pointer">
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
        <div className="p-3">
          {/* Dias da semana */}
          <div className="grid grid-cols-7 gap-0 mb-0">
            {weekDays.map((day, index) => (
              <div
                key={index}
                className="flex items-center justify-center h-12 text-paragraph-md text-neutral-1100"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Dias do mês */}
          <div className="grid grid-cols-7 gap-0">{renderCalendarDays()}</div>
        </div>
      </div>

      {/* Lista de Eventos */}
      {currentMonthEvents.length > 0 && (
        <div className="space-y-0">
          {currentMonthEvents.map((event) => {
            const eventDate = new Date(event.date);
            const day = eventDate.getDate();
            const monthName = eventDate.toLocaleDateString('pt-BR', {
              month: 'short',
            });

            return (
              <div
                key={event.id}
                className="flex items-center justify-between py-1 px-3 relative"
              >
                <div className="absolute left-[26px] top-[18px] w-2 h-2 bg-red-400 rounded-full" />
                <span className="text-label-sm text-neutral-1100 font-medium pl-6">
                  {event.title}
                </span>
                <span className="text-label-sm text-neutral-1100 font-medium">
                  {day} {monthName}
                </span>
              </div>
            );
          })}
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

