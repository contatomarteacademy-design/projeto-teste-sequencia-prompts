import SummaryCards from '../components/dashboard/SummaryCards';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import CategoryExpensesCarousel from '../components/dashboard/CategoryExpensesCarousel';

export default function Dashboard() {
  return (
    <div className="w-full min-h-screen bg-neutral-200 p-4 pt-20 lg:p-8 lg:pt-8">
      <DashboardHeader />
      <SummaryCards />
      <div className="mt-8">
        <CategoryExpensesCarousel />
      </div>
    </div>
  );
}
