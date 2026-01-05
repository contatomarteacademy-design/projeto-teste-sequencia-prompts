import { useState, useEffect } from 'react';
import { useFinance } from '../../contexts/FinanceContext';
import { FiSearch, FiChevronDown, FiFilter, FiCalendar, FiPlus, FiCheck } from 'react-icons/fi';

type PeriodOption = 'current-month' | 'last-month' | 'last-3-months' | 'custom';

export default function DashboardHeader() {
  const {
    familyMembers,
    selectedMember,
    searchText,
    transactionType,
    setSelectedMember,
    setDateRange,
    setSearchText,
    setTransactionType,
  } = useFinance();

  const [period, setPeriod] = useState<PeriodOption>('current-month');
  const [isPeriodDropdownOpen, setIsPeriodDropdownOpen] = useState(false);
  const [isMemberDropdownOpen, setIsMemberDropdownOpen] = useState(false);
  const [isFilterPopoverOpen, setIsFilterPopoverOpen] = useState(false);
  const [hoveredMemberId, setHoveredMemberId] = useState<string | null>(null);

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
      const monthShort = start.toLocaleDateString('pt-BR', { month: 'short' }).toLowerCase();
      return `${start.getDate().toString().padStart(2, '0')} ${monthShort} - ${end.getDate().toString().padStart(2, '0')} ${end.toLocaleDateString('pt-BR', { month: 'short' }).toLowerCase()}, ${end.getFullYear()}`;
    } else if (period === 'last-month') {
      const start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const end = new Date(now.getFullYear(), now.getMonth(), 0);
      const monthShort = start.toLocaleDateString('pt-BR', { month: 'short' }).toLowerCase();
      return `${start.getDate().toString().padStart(2, '0')} ${monthShort} - ${end.getDate().toString().padStart(2, '0')} ${end.toLocaleDateString('pt-BR', { month: 'short' }).toLowerCase()}, ${end.getFullYear()}`;
    } else if (period === 'last-3-months') {
      const start = new Date(now.getFullYear(), now.getMonth() - 3, 1);
      const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      const monthShort = start.toLocaleDateString('pt-BR', { month: 'short' }).toLowerCase();
      return `${start.getDate().toString().padStart(2, '0')} ${monthShort} - ${end.getDate().toString().padStart(2, '0')} ${end.toLocaleDateString('pt-BR', { month: 'short' }).toLowerCase()}, ${end.getFullYear()}`;
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
          <div className="relative w-full lg:w-[346px]">
            <FiSearch
              size={24}
              className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-1100 pointer-events-none"
            />
            <input
              type="text"
              placeholder="Pesquisar..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full bg-neutral-0 border border-neutral-300 rounded-[100px] px-6 py-4 pl-14 text-paragraph-lg text-neutral-1100 placeholder:text-neutral-1100 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:border-transparent"
            />
          </div>

          {/* Botão de Filtro */}
          <div className="relative">
            <button
              onClick={() => setIsFilterPopoverOpen(!isFilterPopoverOpen)}
              className="bg-neutral-0 border border-neutral-300 rounded-[100px] p-4 flex items-center justify-center hover:bg-neutral-200 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
              aria-label="Filtros"
            >
              <FiFilter size={24} className="text-neutral-1100" />
            </button>

            {/* Popover de Filtros (Desktop) */}
            {isFilterPopoverOpen && (
              <>
                <div
                  className="fixed inset-0 z-40 lg:block hidden"
                  onClick={() => setIsFilterPopoverOpen(false)}
                  aria-hidden="true"
                />
                <div className="absolute top-full right-0 mt-2 bg-neutral-0 bg-opacity-95 backdrop-blur-md border border-neutral-300 rounded-xl shadow-lg z-50 min-w-[240px] p-4 lg:block hidden">
                  <h3 className="text-label-md text-neutral-1100 font-semibold mb-3">
                    Tipo de Transação
                  </h3>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => {
                        setTransactionType('all');
                        setIsFilterPopoverOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-xl text-label-md font-semibold transition-colors ${
                        transactionType === 'all'
                          ? 'bg-neutral-1100 text-neutral-0'
                          : 'bg-transparent text-neutral-1100 hover:bg-neutral-200'
                      }`}
                    >
                      Todos
                    </button>
                    <button
                      onClick={() => {
                        setTransactionType('income');
                        setIsFilterPopoverOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-xl text-label-md font-semibold transition-colors ${
                        transactionType === 'income'
                          ? 'bg-neutral-1100 text-neutral-0'
                          : 'bg-transparent text-neutral-1100 hover:bg-neutral-200'
                      }`}
                    >
                      Receitas
                    </button>
                    <button
                      onClick={() => {
                        setTransactionType('expense');
                        setIsFilterPopoverOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-xl text-label-md font-semibold transition-colors ${
                        transactionType === 'expense'
                          ? 'bg-neutral-1100 text-neutral-0'
                          : 'bg-transparent text-neutral-1100 hover:bg-neutral-200'
                      }`}
                    >
                      Despesas
                    </button>
                  </div>
                </div>

                {/* Modal de Filtros (Mobile) */}
                <div
                  className={`
                    fixed inset-0 z-50 bg-neutral-0 lg:hidden
                    transform transition-transform duration-300 ease-out
                    ${isFilterPopoverOpen ? 'translate-y-0' : 'translate-y-full'}
                  `}
                >
                  <div className="flex flex-col h-full">
                    {/* Header do Modal */}
                    <div className="flex items-center justify-between px-4 py-4 border-b border-neutral-300">
                      <h2 className="text-heading-sm text-neutral-1100 font-bold">
                        Filtros
                      </h2>
                      <button
                        onClick={() => setIsFilterPopoverOpen(false)}
                        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-neutral-200 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
                        aria-label="Fechar filtros"
                      >
                        <span className="text-2xl text-neutral-1100">×</span>
                      </button>
                    </div>

                    {/* Conteúdo do Modal */}
                    <div className="flex-1 overflow-y-auto px-4 py-4">
                      <h3 className="text-label-md text-neutral-1100 font-semibold mb-4">
                        Tipo de Transação
                      </h3>
                      <div className="flex flex-col gap-3">
                        <button
                          onClick={() => setTransactionType('all')}
                          className={`w-full text-left px-4 py-4 rounded-xl text-label-md font-semibold transition-colors ${
                            transactionType === 'all'
                              ? 'bg-neutral-1100 text-neutral-0'
                              : 'bg-neutral-200 text-neutral-1100 hover:bg-neutral-300'
                          }`}
                        >
                          Todos
                        </button>
                        <button
                          onClick={() => setTransactionType('income')}
                          className={`w-full text-left px-4 py-4 rounded-xl text-label-md font-semibold transition-colors ${
                            transactionType === 'income'
                              ? 'bg-neutral-1100 text-neutral-0'
                              : 'bg-neutral-200 text-neutral-1100 hover:bg-neutral-300'
                          }`}
                        >
                          Receitas
                        </button>
                        <button
                          onClick={() => setTransactionType('expense')}
                          className={`w-full text-left px-4 py-4 rounded-xl text-label-md font-semibold transition-colors ${
                            transactionType === 'expense'
                              ? 'bg-neutral-1100 text-neutral-0'
                              : 'bg-neutral-200 text-neutral-1100 hover:bg-neutral-300'
                          }`}
                        >
                          Despesas
                        </button>
                      </div>
                    </div>

                    {/* Botão Aplicar (Mobile) */}
                    <div className="px-4 py-4 border-t border-neutral-300">
                      <button
                        onClick={() => setIsFilterPopoverOpen(false)}
                        className="w-full bg-neutral-1100 text-neutral-0 rounded-xl px-6 py-4 text-label-lg font-semibold hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
                      >
                        Aplicar Filtros
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

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
                    className={`w-full text-left px-4 py-3 text-label-md font-semibold hover:bg-neutral-200 transition-colors first:rounded-t-xl ${
                      period === 'current-month'
                        ? 'bg-neutral-200 text-neutral-1100'
                        : 'text-neutral-1100'
                    }`}
                  >
                    Este mês
                  </button>
                  <button
                    onClick={() => handlePeriodChange('last-month')}
                    className={`w-full text-left px-4 py-3 text-label-md font-semibold hover:bg-neutral-200 transition-colors ${
                      period === 'last-month'
                        ? 'bg-neutral-200 text-neutral-1100'
                        : 'text-neutral-1100'
                    }`}
                  >
                    Mês passado
                  </button>
                  <button
                    onClick={() => handlePeriodChange('last-3-months')}
                    className={`w-full text-left px-4 py-3 text-label-md font-semibold hover:bg-neutral-200 transition-colors ${
                      period === 'last-3-months'
                        ? 'bg-neutral-200 text-neutral-1100'
                        : 'text-neutral-1100'
                    }`}
                  >
                    Últimos 3 meses
                  </button>
                  <button
                    onClick={() => {
                      // TODO: Implementar calendário para seleção customizada (será implementado no futuro)
                      handlePeriodChange('custom');
                    }}
                    className={`w-full text-left px-4 py-3 text-label-md font-semibold hover:bg-neutral-200 transition-colors last:rounded-b-xl ${
                      period === 'custom'
                        ? 'bg-neutral-200 text-neutral-1100'
                        : 'text-neutral-1100'
                    }`}
                  >
                    Personalizado
                  </button>
                  {/* TODO: Adicionar botão "Este ano" quando calendário for implementado */}
                </div>
              </>
            )}
          </div>

          {/* Avatares dos Membros da Família */}
          <div className="flex items-center pl-0 pr-4">
            {visibleMembers.map((member, index) => {
              const isSelected = selectedMember === member.id;
              const isHovered = hoveredMemberId === member.id;
              
              return (
                <div
                  key={member.id}
                  className="relative"
                  style={{ zIndex: isHovered || isSelected ? 50 : visibleMembers.length - index }}
                  onMouseEnter={() => setHoveredMemberId(member.id)}
                  onMouseLeave={() => setHoveredMemberId(null)}
                >
                  <button
                    onClick={() => {
                      if (isSelected) {
                        handleMemberChange(null);
                      } else {
                        handleMemberChange(member.id);
                      }
                    }}
                    className={`
                      relative
                      border-2
                      rounded-[100px]
                      overflow-hidden
                      transition-all duration-200
                      ${index > 0 ? '-ml-4' : ''}
                      ${isSelected ? 'border-neutral-1100 scale-110' : 'border-neutral-0'}
                      ${isHovered && !isSelected ? 'scale-110' : ''}
                      focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2
                    `}
                    style={{
                      borderWidth: isSelected ? '4px' : '2px',
                    }}
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
                    
                    {/* Ícone de check quando selecionado */}
                    {isSelected && (
                      <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-600 rounded-full flex items-center justify-center border-2 border-neutral-0">
                        <FiCheck size={12} className="text-neutral-0" />
                      </div>
                    )}
                  </button>

                  {/* Tooltip no hover */}
                  {isHovered && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-neutral-1100 text-neutral-0 text-paragraph-sm rounded-lg whitespace-nowrap pointer-events-none z-50">
                      {member.name} - {member.role}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-neutral-1100" />
                    </div>
                  )}
                </div>
              );
            })}
            {/* Botão Adicionar Membro */}
            <button
              onClick={() => {
                // TODO: Abrir modal de adicionar membro (será implementado no PROMPT 14)
                setIsMemberDropdownOpen(!isMemberDropdownOpen);
              }}
              className={`
                relative
                border-2
                border-neutral-0
                rounded-[100px]
                bg-neutral-300
                -ml-4
                hover:bg-neutral-400
                transition-colors
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
