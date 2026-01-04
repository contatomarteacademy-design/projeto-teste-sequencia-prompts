import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Objetivos from './pages/Objetivos';
import Cartoes from './pages/Cartoes';
import Transacoes from './pages/Transacoes';
import Perfil from './pages/Perfil';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/objetivos" element={<Objetivos />} />
        <Route path="/cartoes" element={<Cartoes />} />
        <Route path="/transacoes" element={<Transacoes />} />
        <Route path="/perfil" element={<Perfil />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

