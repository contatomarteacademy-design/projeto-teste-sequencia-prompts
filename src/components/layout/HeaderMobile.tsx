import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  HomeIcon,
  GolfIcon,
  CreditCardIcon,
  TransactionsIcon,
  ProfileIcon,
  SignOutIcon,
} from '../ui/Icons';
import { FiX } from 'react-icons/fi';

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

export default function HeaderMobile() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const handleNavClick = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Header Mobile - Fixo no topo */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-neutral-0 border-b border-neutral-300 h-[56px] flex items-center justify-between px-4 lg:hidden">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-500 rounded-full" />
          <h1 className="text-heading-xs text-neutral-1100 font-bold">
            Mycash+
          </h1>
        </div>

        {/* Avatar clicável */}
        <button
          onClick={() => setIsMenuOpen(true)}
          className="w-10 h-10 rounded-full bg-neutral-300 flex items-center justify-center overflow-hidden focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
          aria-label="Abrir menu de navegação"
        >
          <div className="w-full h-full bg-neutral-300" />
        </button>
      </header>

      {/* Overlay escuro */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-neutral-1100 bg-opacity-50 z-50 lg:hidden"
          onClick={handleCloseMenu}
          aria-hidden="true"
        />
      )}

      {/* Menu Dropdown */}
      <div
        className={`
          fixed
          top-0
          right-0
          left-0
          z-50
          bg-neutral-0
          shadow-lg
          lg:hidden
          transition-transform
          duration-300
          ease-out
          ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'}
        `}
      >
        {/* Header do Menu */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-neutral-300">
          <h2 className="text-heading-sm text-neutral-1100 font-bold">
            Menu
          </h2>
          <button
            onClick={handleCloseMenu}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-neutral-200 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
            aria-label="Fechar menu"
          >
            <FiX size={24} className="text-neutral-1100" />
          </button>
        </div>

        {/* Conteúdo do Menu */}
        <div className="px-4 py-4 max-h-[calc(100vh-56px)] overflow-y-auto">
          {/* Lista de Navegação */}
          <nav className="flex flex-col gap-3 mb-4">
            {navItems.map((item) => {
              const active = isActive(item.path);
              const Icon = item.icon;

              return (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={`
                    flex
                    items-center
                    gap-3
                    px-4
                    py-3
                    rounded-[100px]
                    transition-all
                    duration-200
                    w-full
                    text-left
                    ${active ? 'bg-neutral-1100' : 'bg-transparent'}
                    ${active ? 'text-neutral-0' : 'text-neutral-1100'}
                    hover:opacity-80
                    focus:outline-none
                    focus:ring-2
                    focus:ring-brand-500
                    focus:ring-offset-2
                  `}
                >
                  <Icon
                    size={24}
                    className={active ? 'text-neutral-0' : 'text-neutral-1100'}
                  />
                  <span className="text-label-lg font-semibold">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Botão Sair */}
          <button
            onClick={handleCloseMenu}
            className="flex items-center gap-3 px-4 py-3 rounded-[100px] bg-transparent text-red-500 w-full text-left hover:opacity-80 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            <SignOutIcon size={24} className="text-red-500" />
            <span className="text-label-lg font-semibold">Sair</span>
          </button>
        </div>
      </div>

      {/* Spacer para conteúdo principal (compensar altura do header fixo) */}
      <div className="h-[56px] lg:hidden" />
    </>
  );
}

