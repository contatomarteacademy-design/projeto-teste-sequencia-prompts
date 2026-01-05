import SummaryCards from '../components/dashboard/SummaryCards';
import DashboardHeader from '../components/dashboard/DashboardHeader';

export default function Dashboard() {
  return (
    <div className="w-full min-h-screen bg-neutral-200 p-4 pt-20 lg:p-8 lg:pt-8">
      <DashboardHeader />
      <SummaryCards />
    </div>
  );
}
