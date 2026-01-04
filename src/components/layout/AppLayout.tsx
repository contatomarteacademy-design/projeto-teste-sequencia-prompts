import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function AppLayout() {
  return (
    <div className="flex w-full min-h-screen bg-neutral-200">
      {/* Sidebar Desktop - aparece apenas acima de 1024px */}
      <aside className="hidden lg:block">
        <Sidebar />
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 w-full overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
}

