import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Dashboard from './pages/Dashboard';
import Objetivos from './pages/Objetivos';
import Cartoes from './pages/Cartoes';
import Transacoes from './pages/Transacoes';
import Perfil from './pages/Perfil';
import { FinanceProvider } from './contexts/FinanceContext';

function App() {
  return (
    <FinanceProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/objetivos" element={<Objetivos />} />
            <Route path="/cartoes" element={<Cartoes />} />
            <Route path="/transacoes" element={<Transacoes />} />
            <Route path="/perfil" element={<Perfil />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </FinanceProvider>
  );
}

export default App;
