import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import HeaderMobile from './HeaderMobile';
import { useSidebar } from '../../contexts/SidebarContext';

export default function AppLayout() {
  const { isExpanded } = useSidebar();

  return (
    <div className="flex w-full min-h-screen bg-neutral-200 overflow-x-hidden">
      {/* Header Mobile - aparece apenas abaixo de 1024px */}
      <HeaderMobile />

      {/* Sidebar Desktop - aparece apenas acima de 1024px */}
      <aside className="hidden lg:block fixed left-0 top-0 h-screen z-10">
        <Sidebar />
      </aside>

      {/* Conteúdo Principal */}
      <main
        className={`flex-1 min-w-0 overflow-x-hidden pt-0 lg:pt-0 transition-all duration-300 ${
          isExpanded ? 'lg:ml-[320px]' : 'lg:ml-[80px]'
        }`}
      >
        <Outlet />
      </main>
    </div>
  );
}

