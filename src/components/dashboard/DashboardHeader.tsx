import { useState, useEffect } from 'react';
import { useFinance } from '../../contexts/FinanceContext';
import { FiSearch, FiChevronDown } from 'react-icons/fi';

type PeriodOption = 'current-month' | 'last-month' | 'last-3-months' | 'custom';

export default function DashboardHeader() {
  const {
    familyMembers,
    selectedMember,
    searchText,
    setSelectedMember,
    setDateRange,
    setSearchText,
  } = useFinance();

  const [period, setPeriod] = useState<PeriodOption>('current-month');
  const [isPeriodDropdownOpen, setIsPeriodDropdownOpen] = useState(false);
  const [isMemberDropdownOpen, setIsMemberDropdownOpen] = useState(false);

  // Calcular datas do período atual
  const getCurrentMonthRange = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    return { start, end };
  };

  // Calcular datas do mês anterior
  const getLastMonthRange = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const end = new Date(now.getFullYear(), now.getMonth(), 0);
    return { start, end };
  };

  // Calcular datas dos últimos 3 meses
  const getLast3MonthsRange = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth() - 3, 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    return { start, end };
  };

  const handlePeriodChange = (newPeriod: PeriodOption) => {
    setPeriod(newPeriod);
    setIsPeriodDropdownOpen(false);

    if (newPeriod === 'current-month') {
      const { start, end } = getCurrentMonthRange();
      setDateRange({ startDate: start, endDate: end });
    } else if (newPeriod === 'last-month') {
      const { start, end } = getLastMonthRange();
      setDateRange({ startDate: start, endDate: end });
    } else if (newPeriod === 'last-3-months') {
      const { start, end } = getLast3MonthsRange();
      setDateRange({ startDate: start, endDate: end });
    } else if (newPeriod === 'custom') {
      // Custom será implementado com date picker no futuro
      setDateRange({ startDate: null, endDate: null });
    }
  };

  const handleMemberChange = (memberId: string | null) => {
    setSelectedMember(memberId);
    setIsMemberDropdownOpen(false);
  };

  const getPeriodLabel = () => {
    switch (period) {
      case 'current-month':
        return 'Este mês';
      case 'last-month':
        return 'Mês anterior';
      case 'last-3-months':
        return 'Últimos 3 meses';
      case 'custom':
        return 'Personalizado';
      default:
        return 'Este mês';
    }
  };

  const getSelectedMemberName = () => {
    if (!selectedMember) return 'Todos';
    const member = familyMembers.find((m) => m.id === selectedMember);
    return member?.name || 'Todos';
  };

  // Inicializar período atual ao montar
  useEffect(() => {
    const { start, end } = getCurrentMonthRange();
    setDateRange({ startDate: start, endDate: end });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full mb-6">
      {/* Título e Controles */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Título */}
        <h1 className="text-heading-md text-neutral-1100 font-bold">Dashboard</h1>

        {/* Controles */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Seletor de Período */}
          <div className="relative">
            <button
              onClick={() => setIsPeriodDropdownOpen(!isPeriodDropdownOpen)}
              className="flex items-center justify-between gap-2 bg-neutral-0 border border-neutral-300 rounded-xl px-4 py-3 min-w-[160px] hover:bg-neutral-200 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
            >
              <span className="text-label-md text-neutral-1100 font-semibold">
                {getPeriodLabel()}
              </span>
              <FiChevronDown
                size={20}
                className={`text-neutral-500 transition-transform ${
                  isPeriodDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Dropdown de Período */}
            {isPeriodDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsPeriodDropdownOpen(false)}
                  aria-hidden="true"
                />
                <div className="absolute top-full left-0 mt-2 bg-neutral-0 border border-neutral-300 rounded-xl shadow-lg z-50 min-w-[160px]">
                  <button
                    onClick={() => handlePeriodChange('current-month')}
                    className={`w-full text-left px-4 py-3 text-label-md font-semibold hover:bg-neutral-200 transition-colors first:rounded-t-xl last:rounded-b-xl ${
                      period === 'current-month'
                        ? 'bg-neutral-200 text-neutral-1100'
                        : 'text-neutral-1100'
                    }`}
                  >
                    Este mês
                  </button>
                  <button
                    onClick={() => handlePeriodChange('last-month')}
                    className={`w-full text-left px-4 py-3 text-label-md font-semibold hover:bg-neutral-200 transition-colors first:rounded-t-xl last:rounded-b-xl ${
                      period === 'last-month'
                        ? 'bg-neutral-200 text-neutral-1100'
                        : 'text-neutral-1100'
                    }`}
                  >
                    Mês anterior
                  </button>
                  <button
                    onClick={() => handlePeriodChange('last-3-months')}
                    className={`w-full text-left px-4 py-3 text-label-md font-semibold hover:bg-neutral-200 transition-colors first:rounded-t-xl last:rounded-b-xl ${
                      period === 'last-3-months'
                        ? 'bg-neutral-200 text-neutral-1100'
                        : 'text-neutral-1100'
                    }`}
                  >
                    Últimos 3 meses
                  </button>
                  <button
                    onClick={() => handlePeriodChange('custom')}
                    className={`w-full text-left px-4 py-3 text-label-md font-semibold hover:bg-neutral-200 transition-colors first:rounded-t-xl last:rounded-b-xl ${
                      period === 'custom'
                        ? 'bg-neutral-200 text-neutral-1100'
                        : 'text-neutral-1100'
                    }`}
                  >
                    Personalizado
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Seletor de Membro */}
          <div className="relative">
            <button
              onClick={() => setIsMemberDropdownOpen(!isMemberDropdownOpen)}
              className="flex items-center justify-between gap-2 bg-neutral-0 border border-neutral-300 rounded-xl px-4 py-3 min-w-[160px] hover:bg-neutral-200 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
            >
              <span className="text-label-md text-neutral-1100 font-semibold">
                {getSelectedMemberName()}
              </span>
              <FiChevronDown
                size={20}
                className={`text-neutral-500 transition-transform ${
                  isMemberDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Dropdown de Membro */}
            {isMemberDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsMemberDropdownOpen(false)}
                  aria-hidden="true"
                />
                <div className="absolute top-full left-0 mt-2 bg-neutral-0 border border-neutral-300 rounded-xl shadow-lg z-50 min-w-[160px]">
                  <button
                    onClick={() => handleMemberChange(null)}
                    className={`w-full text-left px-4 py-3 text-label-md font-semibold hover:bg-neutral-200 transition-colors first:rounded-t-xl ${
                      !selectedMember
                        ? 'bg-neutral-200 text-neutral-1100'
                        : 'text-neutral-1100'
                    }`}
                  >
                    Todos
                  </button>
                  {familyMembers.map((member) => (
                    <button
                      key={member.id}
                      onClick={() => handleMemberChange(member.id)}
                      className={`w-full text-left px-4 py-3 text-label-md font-semibold hover:bg-neutral-200 transition-colors last:rounded-b-xl ${
                        selectedMember === member.id
                          ? 'bg-neutral-200 text-neutral-1100'
                          : 'text-neutral-1100'
                      }`}
                    >
                      {member.name}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Campo de Busca */}
          <div className="relative flex-1 sm:flex-initial sm:min-w-[240px]">
            <FiSearch
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none"
            />
            <input
              type="text"
              placeholder="Buscar transações..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full bg-neutral-0 border border-neutral-300 rounded-xl px-4 py-3 pl-12 text-label-md text-neutral-1100 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

