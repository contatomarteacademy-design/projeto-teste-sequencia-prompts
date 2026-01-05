import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import HeaderMobile from './HeaderMobile';

export default function AppLayout() {
  return (
    <div className="flex w-full min-h-screen bg-neutral-200 overflow-x-hidden">
      {/* Header Mobile - aparece apenas abaixo de 1024px */}
      <HeaderMobile />

      {/* Sidebar Desktop - aparece apenas acima de 1024px */}
      <aside className="hidden lg:block flex-shrink-0">
        <Sidebar />
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 min-w-0 overflow-x-hidden pt-0 lg:pt-0">
        <Outlet />
      </main>
    </div>
  );
}

