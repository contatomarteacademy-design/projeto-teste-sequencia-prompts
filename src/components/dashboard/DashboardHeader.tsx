import { useState, useEffect } from 'react';
import { useFinance } from '../../contexts/FinanceContext';
import { FiSearch, FiChevronDown, FiFilter, FiCalendar, FiPlus } from 'react-icons/fi';

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
    const now = new Date();
    if (period === 'current-month') {
      const start = new Date(now.getFullYear(), now.getMonth(), 1);
      const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      return `${start.getDate().toString().padStart(2, '0')} ${start.toLocaleDateString('pt-BR', { month: 'short' })} - ${end.getDate().toString().padStart(2, '0')} ${end.toLocaleDateString('pt-BR', { month: 'short' })} ${end.getFullYear()}`;
    } else if (period === 'last-month') {
      const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const end = new Date(now.getFullYear(), now.getMonth(), 0);
      return `${start.getDate().toString().padStart(2, '0')} ${start.toLocaleDateString('pt-BR', { month: 'short' })} - ${end.getDate().toString().padStart(2, '0')} ${end.toLocaleDateString('pt-BR', { month: 'short' })} ${end.getFullYear()}`;
    } else if (period === 'last-3-months') {
      const start = new Date(now.getFullYear(), now.getMonth() - 3, 1);
      const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      return `${start.getDate().toString().padStart(2, '0')} ${start.toLocaleDateString('pt-BR', { month: 'short' })} - ${end.getDate().toString().padStart(2, '0')} ${end.toLocaleDateString('pt-BR', { month: 'short' })} ${end.getFullYear()}`;
    }
    return 'Personalizado';
  };

  // Inicializar período atual ao montar
  useEffect(() => {
    const { start, end } = getCurrentMonthRange();
    setDateRange({ startDate: start, endDate: end });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Mostrar até 3 membros + botão adicionar
  const visibleMembers = familyMembers.slice(0, 3);

  return (
    <div className="w-full mb-6">
      {/* Header conforme design do Figma */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Lado esquerdo: Busca, Filtro, Data, Membros */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Barra de Pesquisa */}
          <div className="relative flex-1 sm:flex-initial sm:min-w-[280px] lg:min-w-[346px]">
            <FiSearch
              size={24}
              className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-1100 pointer-events-none"
            />
            <input
              type="text"
              placeholder="Pesquisar"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full bg-neutral-0 border border-neutral-300 rounded-[100px] px-6 py-4 pl-14 text-paragraph-lg text-neutral-1100 placeholder:text-neutral-1100 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:border-transparent"
            />
          </div>

          {/* Botão de Filtro */}
          <button
            className="bg-neutral-0 border border-neutral-300 rounded-[100px] p-4 flex items-center justify-center hover:bg-neutral-200 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
            aria-label="Filtros"
          >
            <FiFilter size={24} className="text-neutral-1100" />
          </button>

          {/* Seletor de Data */}
          <div className="relative">
            <button
              onClick={() => setIsPeriodDropdownOpen(!isPeriodDropdownOpen)}
              className="flex items-center gap-4 bg-neutral-0 border border-neutral-300 rounded-[100px] px-6 py-4 hover:bg-neutral-200 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
            >
              <FiCalendar size={24} className="text-neutral-1100" />
              <span className="text-paragraph-lg text-neutral-1100">
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
                <div className="absolute top-full left-0 mt-2 bg-neutral-0 border border-neutral-300 rounded-xl shadow-lg z-50 min-w-[200px]">
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

          {/* Avatares dos Membros da Família */}
          <div className="flex items-center pl-0 pr-4">
            {visibleMembers.map((member, index) => (
              <button
                key={member.id}
                onClick={() => handleMemberChange(member.id)}
                className={`
                  relative
                  border-2
                  border-neutral-0
                  rounded-[100px]
                  overflow-hidden
                  ${index > 0 ? '-ml-4' : ''}
                  ${selectedMember === member.id ? 'ring-2 ring-brand-500' : ''}
                  focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2
                `}
                style={{ zIndex: visibleMembers.length - index }}
                aria-label={`Selecionar ${member.name}`}
              >
                <div className="w-[60px] h-[60px] bg-neutral-300 flex items-center justify-center">
                  {member.avatarUrl ? (
                    <img
                      src={member.avatarUrl}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-label-lg text-neutral-1100 font-semibold">
                      {member.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
              </button>
            ))}
            {/* Botão Adicionar Membro */}
            <button
              onClick={() => setIsMemberDropdownOpen(!isMemberDropdownOpen)}
              className={`
                relative
                border-2
                border-neutral-0
                rounded-[100px]
                bg-neutral-300
                -ml-4
                focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2
              `}
              style={{ zIndex: 0 }}
              aria-label="Adicionar membro ou ver todos"
            >
              <div className="w-[60px] h-[60px] flex items-center justify-center">
                <FiPlus size={24} className="text-neutral-1100" />
              </div>
            </button>

            {/* Dropdown de Membro */}
            {isMemberDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsMemberDropdownOpen(false)}
                  aria-hidden="true"
                />
                <div className="absolute top-full right-0 mt-2 bg-neutral-0 border border-neutral-300 rounded-xl shadow-lg z-50 min-w-[160px]">
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
        </div>

        {/* Lado direito: Botão Nova Transação */}
        <button
          onClick={() => {
            // TODO: Abrir modal de nova transação (será implementado no PROMPT 13)
            console.log('Abrir modal de nova transação');
          }}
          className="bg-neutral-1100 flex items-center gap-3 px-6 py-4 rounded-[100px] hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
        >
          <FiPlus size={24} className="text-neutral-0" />
          <span className="text-label-lg text-neutral-0 font-semibold">
            Nova transação
          </span>
        </button>
      </div>
    </div>
  );
}
