import SummaryCards from '../components/dashboard/SummaryCards';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import CategoryExpensesCarousel from '../components/dashboard/CategoryExpensesCarousel';
import FinancialFlowChart from '../components/dashboard/FinancialFlowChart';
import CreditCardsWidget from '../components/dashboard/CreditCardsWidget';

export default function Dashboard() {
  return (
    <div className="w-full min-h-screen bg-neutral-200 p-4 pt-20 lg:p-8 lg:pt-8 overflow-x-hidden">
      <DashboardHeader />
      
      {/* Layout em 2 colunas no desktop */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-8 lg:gap-9 w-full">
        {/* Coluna Esquerda: Carrossel, Cards de Resumo e Gráfico */}
        <div className="flex flex-col gap-8 min-w-0 w-full">
          <CategoryExpensesCarousel />
          <SummaryCards />
          <FinancialFlowChart />
        </div>

        {/* Coluna Direita: Cartões */}
        <div className="flex flex-col min-w-0 w-full">
          <CreditCardsWidget />
        </div>
      </div>
    </div>
  );
}
