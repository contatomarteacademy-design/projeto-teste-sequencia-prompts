import BalanceCard from '../cards/BalanceCard';
import IncomeCard from '../cards/IncomeCard';
import ExpenseCard from '../cards/ExpenseCard';

export default function SummaryCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full min-w-0">
      {/* Card de Saldo Total - ocupa mais espaço no desktop */}
      <div className="lg:col-span-1 h-full min-w-0">
        <BalanceCard />
      </div>

      {/* Card de Receitas */}
      <div className="lg:col-span-1 h-full min-w-0">
        <IncomeCard />
      </div>

      {/* Card de Despesas */}
      <div className="lg:col-span-1 h-full min-w-0">
        <ExpenseCard />
      </div>
    </div>
  );
}

