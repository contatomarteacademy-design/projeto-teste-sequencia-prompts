import { useLocation, useNavigate } from 'react-router-dom';
import { useSidebar } from '../../contexts/SidebarContext';
import {
  HomeIcon,
  GolfIcon,
  CreditCardIcon,
  TransactionsIcon,
  ProfileIcon,
  SignOutIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '../ui/Icons';

interface NavItem {
  path: string;
  label: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
}

const navItems: NavItem[] = [
  { path: '/', label: 'Home', icon: HomeIcon },
  { path: '/objetivos', label: 'Objetivos', icon: GolfIcon },
  { path: '/cartoes', label: 'Cartões', icon: CreditCardIcon },
  { path: '/transacoes', label: 'Transações', icon: TransactionsIcon },
  { path: '/perfil', label: 'Perfil', icon: ProfileIcon },
];

interface TooltipProps {
  children: React.ReactNode;
  label: string;
  isVisible: boolean;
}

const Tooltip = ({ children, label, isVisible }: TooltipProps) => {
  if (!isVisible) return <>{children}</>;

  return (
    <div className="relative group/tooltip">
      {children}
      <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 z-50 opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-300 delay-200 pointer-events-none">
        <div className="bg-neutral-1100 text-neutral-0 px-3 py-2 rounded-lg text-label-sm whitespace-nowrap shadow-lg">
          {label}
          <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-neutral-1100" />
        </div>
      </div>
    </div>
  );
};

export default function Sidebar() {
  const { isExpanded, toggleSidebar } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div
      className={`
        relative
        bg-neutral-0
        h-screen
        flex
        flex-col
        transition-all
        duration-300
        ease-in-out
        ${isExpanded ? 'w-[320px]' : 'w-[80px]'}
      `}
    >
      {/* Conteúdo principal */}
      <div className={`
        flex-1
        flex
        flex-col
        justify-between
        py-8
        transition-all
        duration-300
        ${isExpanded ? 'px-6' : 'px-4'}
      `}>
        {/* Topo - Logo e Navegação */}
        <div className="flex flex-col gap-8">
          {/* Logo */}
          <div
            className={`
              transition-opacity
              duration-300
              ${isExpanded ? 'opacity-100' : 'opacity-0'}
              ${!isExpanded ? 'absolute' : 'relative'}
            `}
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-500 rounded-full" />
              <h1 className="text-heading-xs text-neutral-1100 font-bold">
                Mycash+
              </h1>
            </div>
          </div>

          {/* Logo apenas ícone quando colapsada */}
          {!isExpanded && (
            <div className="flex items-center justify-center h-9 mb-8">
              <div className="w-8 h-8 bg-brand-500 rounded-full" />
            </div>
          )}

          {/* Menu de Navegação */}
          <nav className="flex flex-col gap-3">
            {navItems.map((item) => {
              const active = isActive(item.path);
              const Icon = item.icon;

              return (
                <Tooltip key={item.path} label={item.label} isVisible={!isExpanded}>
                  <button
                    onClick={() => navigate(item.path)}
                    className={`
                      flex
                      items-center
                      rounded-[100px]
                      transition-all
                      duration-200
                      ${isExpanded ? 'gap-3 px-6 py-4 w-full justify-start' : 'p-3 justify-center min-w-[48px]'}
                      ${active ? 'bg-neutral-1100' : 'bg-transparent'}
                      ${active ? 'text-neutral-0' : 'text-neutral-1100'}
                      hover:opacity-80
                    `}
                  >
                    <Icon
                      size={24}
                      className={active ? 'text-neutral-0' : 'text-neutral-1100'}
                    />
                    {isExpanded && (
                      <span className="text-label-lg font-semibold">
                        {item.label}
                      </span>
                    )}
                  </button>
                </Tooltip>
              );
            })}
          </nav>
        </div>

        {/* Rodapé - Sair e Perfil */}
        <div className="flex flex-col gap-4">
          {/* Botão Sair */}
          <Tooltip label="Sair" isVisible={!isExpanded}>
            <button
              className={`
                flex
                items-center
                rounded-[100px]
                bg-transparent
                text-red-500
                transition-all
                duration-200
                hover:opacity-80
                ${isExpanded ? 'gap-3 px-6 py-4 w-full justify-start' : 'p-3 justify-center min-w-[48px]'}
              `}
            >
              <SignOutIcon size={24} className="text-red-500" />
              {isExpanded && (
                <span className="text-label-lg font-semibold">Sair</span>
              )}
            </button>
          </Tooltip>

          {/* Card de Perfil */}
          {isExpanded ? (
            <div className="bg-neutral-200 rounded-xl p-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-neutral-300 rounded-full flex-shrink-0" />
              <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                <p className="text-label-lg font-semibold text-neutral-1100 truncate">
                  Lucas Marte
                </p>
                <p className="text-paragraph-md text-neutral-1100 truncate">
                  lucasmarte@gmail.com
                </p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-12 h-12 bg-neutral-300 rounded-full" />
            </div>
          )}
        </div>
      </div>

      {/* Botão de Toggle */}
      <button
        onClick={toggleSidebar}
        className={`
          absolute
          right-[-12px]
          top-8
          w-8
          h-8
          bg-neutral-0
          rounded-xl
          shadow-lg
          flex
          items-center
          justify-center
          cursor-pointer
          transition-all
          duration-200
          hover:scale-110
          z-10
        `}
        aria-label={isExpanded ? 'Colapsar sidebar' : 'Expandir sidebar'}
      >
        {isExpanded ? (
          <ChevronLeftIcon size={16} className="text-neutral-1100" />
        ) : (
          <ChevronRightIcon size={16} className="text-neutral-1100" />
        )}
      </button>
    </div>
  );
}

