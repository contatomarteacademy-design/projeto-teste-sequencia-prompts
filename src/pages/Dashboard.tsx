import SummaryCards from '../components/dashboard/SummaryCards';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import CategoryExpensesCarousel from '../components/dashboard/CategoryExpensesCarousel';
import FinancialFlowChart from '../components/dashboard/FinancialFlowChart';
import CreditCardsWidget from '../components/dashboard/CreditCardsWidget';

export default function Dashboard() {
  return (
    <div className="w-full min-h-screen bg-neutral-200 p-4 pt-20 lg:p-8 lg:pt-8">
      <DashboardHeader />
      
      {/* Layout em 2 colunas no desktop */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 lg:gap-[15px]">
        {/* Coluna Esquerda: Carrossel, Cards de Resumo e Gráfico */}
        <div className="flex flex-col gap-8">
          <SummaryCards />
          <CategoryExpensesCarousel />
          <FinancialFlowChart />
        </div>

        {/* Coluna Direita: Cartões */}
        <div className="flex flex-col">
          <CreditCardsWidget />
        </div>
      </div>
    </div>
  );
}
