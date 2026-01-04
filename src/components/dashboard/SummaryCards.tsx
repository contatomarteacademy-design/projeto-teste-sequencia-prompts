import BalanceCard from '../cards/BalanceCard';
import IncomeCard from '../cards/IncomeCard';
import ExpenseCard from '../cards/ExpenseCard';

export default function SummaryCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      {/* Card de Saldo Total - ocupa mais espaço no desktop */}
      <div className="lg:col-span-1">
        <BalanceCard />
      </div>

      {/* Card de Receitas */}
      <div className="lg:col-span-1">
        <IncomeCard />
      </div>

      {/* Card de Despesas */}
      <div className="lg:col-span-1">
        <ExpenseCard />
      </div>
    </div>
  );
}

