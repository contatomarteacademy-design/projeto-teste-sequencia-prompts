import { useEffect, useState } from 'react';
import { useFinance } from '../../contexts/FinanceContext';
import { FiArrowUpRight } from 'react-icons/fi';

export default function ExpenseCard() {
  const { calculateExpensesForPeriod } = useFinance();
  const expenses = calculateExpensesForPeriod();
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    // Resetar animação quando valor muda
    setDisplayValue(0);
    const target = expenses;

    // Animação de contagem (800ms)
    const duration = 800;
    const startTime = Date.now();
    const startValue = 0;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = startValue + (target - startValue) * eased;

      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(target);
      }
    };

    animate();
  }, [expenses]);

  // Formatar como moeda brasileira
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <div className="bg-neutral-0 border border-neutral-300 rounded-xl p-6">
      <div className="flex items-start justify-between mb-4">
        {/* Label */}
        <h3 className="text-label-md text-neutral-500 font-semibold">
          Despesas
        </h3>

        {/* Ícone em círculo vermelho claro */}
        <div className="w-10 h-10 bg-red-400 bg-opacity-20 rounded-full flex items-center justify-center">
          <FiArrowUpRight size={20} className="text-red-500" />
        </div>
      </div>

      {/* Valor */}
      <p className="text-heading-sm text-neutral-1100 font-bold">
        {formatCurrency(displayValue)}
      </p>
    </div>
  );
}

