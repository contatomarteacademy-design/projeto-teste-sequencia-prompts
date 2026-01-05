import { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface DateRangeCalendarProps {
  startDate: Date | null;
  endDate: Date | null;
  onDateRangeSelect: (start: Date | null, end: Date | null) => void;
  onClose: () => void;
  isMobile?: boolean;
}

export default function DateRangeCalendar({
  startDate,
  endDate,
  onDateRangeSelect,
  onClose,
  isMobile = false,
}: DateRangeCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(() => {
    // Inicializar com o mês da data inicial ou mês atual
    if (startDate) {
      return new Date(startDate.getFullYear(), startDate.getMonth(), 1);
    }
    return new Date();
  });
  const [currentMonth2, setCurrentMonth2] = useState(() => {
    // Segundo calendário sempre um mês à frente do primeiro
    const first = startDate 
      ? new Date(startDate.getFullYear(), startDate.getMonth(), 1)
      : new Date();
    const next = new Date(first);
    next.setMonth(next.getMonth() + 1);
    return next;
  });
  const [selectingStart, setSelectingStart] = useState(true);
  const [tempStartDate, setTempStartDate] = useState<Date | null>(startDate);
  const [tempEndDate, setTempEndDate] = useState<Date | null>(endDate);
  
  // Atualizar meses quando startDate/endDate mudarem externamente
  useEffect(() => {
    if (startDate) {
      const newMonth = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
      setCurrentMonth(newMonth);
      const nextMonth = new Date(newMonth);
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      setCurrentMonth2(nextMonth);
    }
    setTempStartDate(startDate);
    setTempEndDate(endDate);
  }, [startDate, endDate]);

  const monthNames = [
    'janeiro',
    'fevereiro',
    'março',
    'abril',
    'maio',
    'junho',
    'julho',
    'agosto',
    'setembro',
    'outubro',
    'novembro',
    'dezembro',
  ];

  const weekDays = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    // Dias do mês
    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const isDateInRange = (date: Date) => {
    if (!tempStartDate && !tempEndDate) return false;
    if (tempStartDate && tempEndDate) {
      // Incluir data inicial e final no range
      return date >= tempStartDate && date <= tempEndDate;
    }
    if (tempStartDate) {
      return date.getTime() === tempStartDate.getTime();
    }
    return false;
  };

  const isDateSelected = (date: Date) => {
    if (tempStartDate && date.getTime() === tempStartDate.getTime()) return 'start';
    if (tempEndDate && date.getTime() === tempEndDate.getTime()) return 'end';
    return false;
  };

  const handleDateClick = (date: Date) => {
    if (selectingStart || !tempStartDate) {
      setTempStartDate(date);
      setTempEndDate(null);
      setSelectingStart(false);
    } else {
      if (date < tempStartDate!) {
        setTempStartDate(date);
        setTempEndDate(null);
      } else {
        setTempEndDate(date);
        setSelectingStart(true);
      }
    }
  };

  const handleQuickSelect = (type: 'current-month' | 'last-month' | 'last-3-months' | 'this-year') => {
    const now = new Date();
    let start: Date;
    let end: Date;

    if (type === 'current-month') {
      start = new Date(now.getFullYear(), now.getMonth(), 1);
      end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    } else if (type === 'last-month') {
      start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      end = new Date(now.getFullYear(), now.getMonth(), 0);
    } else if (type === 'last-3-months') {
      start = new Date(now.getFullYear(), now.getMonth() - 3, 1);
      end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    } else {
      // this-year
      start = new Date(now.getFullYear(), 0, 1);
      end = new Date(now.getFullYear(), 11, 31);
    }

    setTempStartDate(start);
    setTempEndDate(end);
    setSelectingStart(true);
  };

  const handleConfirm = () => {
    onDateRangeSelect(tempStartDate, tempEndDate);
    onClose();
  };

  const handleCancel = () => {
    setTempStartDate(startDate);
    setTempEndDate(endDate);
    onClose();
  };

  const navigateMonth = (direction: 'prev' | 'next', calendarIndex: 1 | 2 = 1) => {
    if (isMobileState) {
      const newDate = new Date(currentMonth);
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      setCurrentMonth(newDate);
    } else {
      if (calendarIndex === 1) {
        const newDate = new Date(currentMonth);
        if (direction === 'prev') {
          newDate.setMonth(newDate.getMonth() - 1);
        } else {
          newDate.setMonth(newDate.getMonth() + 1);
        }
        setCurrentMonth(newDate);
        // Manter segundo calendário sempre um mês à frente
        const newDate2 = new Date(newDate);
        newDate2.setMonth(newDate2.getMonth() + 1);
        setCurrentMonth2(newDate2);
      } else {
        const newDate = new Date(currentMonth2);
        if (direction === 'prev') {
          newDate.setMonth(newDate.getMonth() - 1);
        } else {
          newDate.setMonth(newDate.getMonth() + 1);
        }
        setCurrentMonth2(newDate);
        // Manter primeiro calendário sempre um mês atrás
        const newDate1 = new Date(newDate);
        newDate1.setMonth(newDate1.getMonth() - 1);
        setCurrentMonth(newDate1);
      }
    }
  };

  // Detectar se é mobile usando media query
  const [isMobileState, setIsMobileState] = useState(isMobile);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const mediaQuery = window.matchMedia('(max-width: 1023px)');
    setIsMobileState(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setIsMobileState(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const renderCalendar = (monthDate: Date, calendarIndex: 1 | 2 = 1) => {
    const days = getDaysInMonth(monthDate);
    const month = monthDate.getMonth();
    const year = monthDate.getFullYear();

    // Adicionar dias do mês anterior no início se necessário
    const firstDayOfMonth = new Date(year, month, 1);
    const startingDayOfWeek = firstDayOfMonth.getDay();
    const prevMonthDays: (Date | null)[] = [];
    
    if (startingDayOfWeek > 0) {
      const prevMonth = month === 0 ? 11 : month - 1;
      const prevYear = month === 0 ? year - 1 : year;
      const daysInPrevMonth = new Date(prevYear, prevMonth + 1, 0).getDate();
      
      for (let i = startingDayOfWeek - 1; i >= 0; i--) {
        prevMonthDays.push(new Date(prevYear, prevMonth, daysInPrevMonth - i));
      }
    }

    // Adicionar dias do próximo mês no final se necessário
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const endingDayOfWeek = lastDayOfMonth.getDay();
    const nextMonthDays: (Date | null)[] = [];
    
    if (endingDayOfWeek < 6) {
      const nextMonth = month === 11 ? 0 : month + 1;
      const nextYear = month === 11 ? year + 1 : year;
      
      for (let i = 1; i <= 6 - endingDayOfWeek; i++) {
        nextMonthDays.push(new Date(nextYear, nextMonth, i));
      }
    }

    const allDays = [...prevMonthDays, ...days, ...nextMonthDays];

    return (
      <div className="flex flex-col">
        {/* Header do Calendário */}
        <div className="flex items-center justify-between mb-4">
          {calendarIndex === 1 && (
            <button
              onClick={() => navigateMonth('prev', calendarIndex)}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-neutral-200 transition-colors"
              aria-label="Mês anterior"
            >
              <FiChevronLeft size={20} className="text-neutral-500" />
            </button>
          )}
          {calendarIndex === 2 && <div className="w-8" />}
          <h3 className="text-label-md text-neutral-1100 font-semibold">
            {monthNames[month]} {year}
          </h3>
          {calendarIndex === 2 && (
            <button
              onClick={() => navigateMonth('next', calendarIndex)}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-neutral-200 transition-colors"
              aria-label="Próximo mês"
            >
              <FiChevronRight size={20} className="text-neutral-500" />
            </button>
          )}
          {calendarIndex === 1 && <div className="w-8" />}
        </div>

        {/* Dias da Semana */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map((day) => (
            <div
              key={day}
              className="text-center text-paragraph-xs text-neutral-500 font-semibold py-2"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Dias do Mês */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((date, index) => {
            if (!date) {
              return <div key={`empty-${index}`} className="aspect-square" />;
            }

            const isInRange = isDateInRange(date);
            const selectionType = isDateSelected(date);
            const isToday =
              date.toDateString() === new Date().toDateString();

            return (
              <button
                key={date.toISOString()}
                onClick={() => handleDateClick(date)}
                className={`
                  aspect-square
                  rounded-lg
                  text-paragraph-sm
                  font-semibold
                  transition-all
                  hover:bg-neutral-200
                  ${
                    selectionType === 'start'
                      ? 'bg-neutral-1100 text-neutral-0 rounded-l-full'
                      : selectionType === 'end'
                      ? 'bg-neutral-1100 text-neutral-0 rounded-r-full'
                      : isInRange
                      ? 'bg-neutral-200 text-neutral-1100'
                      : 'text-neutral-1100'
                  }
                  ${isToday ? 'ring-2 ring-brand-500' : ''}
                `}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-neutral-0 border border-neutral-300 rounded-xl shadow-lg p-6 min-w-[320px]">
      {/* Botões Rápidos */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => handleQuickSelect('current-month')}
          className="px-4 py-2 rounded-xl bg-neutral-200 text-label-sm text-neutral-1100 font-semibold hover:bg-neutral-300 transition-colors"
        >
          Este mês
        </button>
        <button
          onClick={() => handleQuickSelect('last-month')}
          className="px-4 py-2 rounded-xl bg-neutral-200 text-label-sm text-neutral-1100 font-semibold hover:bg-neutral-300 transition-colors"
        >
          Mês passado
        </button>
        <button
          onClick={() => handleQuickSelect('last-3-months')}
          className="px-4 py-2 rounded-xl bg-neutral-200 text-label-sm text-neutral-1100 font-semibold hover:bg-neutral-300 transition-colors"
        >
          Últimos 3 meses
        </button>
        <button
          onClick={() => handleQuickSelect('this-year')}
          className="px-4 py-2 rounded-xl bg-neutral-200 text-label-sm text-neutral-1100 font-semibold hover:bg-neutral-300 transition-colors"
        >
          Este ano
        </button>
      </div>

      {/* Calendários */}
      <div className={isMobileState ? 'flex flex-col gap-6' : 'flex gap-8'}>
        {renderCalendar(currentMonth, 1)}
        {!isMobileState && renderCalendar(currentMonth2, 2)}
      </div>

      {/* Botões de Ação */}
      <div className="flex gap-3 mt-6">
        <button
          onClick={handleCancel}
          className="flex-1 px-4 py-3 rounded-xl bg-neutral-200 text-label-md text-neutral-1100 font-semibold hover:bg-neutral-300 transition-colors"
        >
          Cancelar
        </button>
        <button
          onClick={handleConfirm}
          className="flex-1 px-4 py-3 rounded-xl bg-neutral-1100 text-label-md text-neutral-0 font-semibold hover:opacity-90 transition-opacity"
        >
          OK
        </button>
      </div>
    </div>
  );
}

