import { useEffect, useState } from 'react';
import { useFinance } from '../../contexts/FinanceContext';
import { FiTrendingUp } from 'react-icons/fi';

export default function BalanceCard() {
  const { calculateTotalBalance } = useFinance();
  const totalBalance = calculateTotalBalance();
  const [displayValue, setDisplayValue] = useState(0);

  // Calcular crescimento percentual comparado ao mês anterior
  // Por enquanto, simulando com cálculo baseado no saldo atual
  const growthPercentage = 12; // Mock: será calculado quando houver histórico

  useEffect(() => {
    // Resetar animação quando valor muda
    setDisplayValue(0);
    const target = totalBalance;

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
  }, [totalBalance]);

  // Formatar como moeda brasileira
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <div className="relative bg-neutral-1100 rounded-xl p-6 overflow-hidden">
      {/* Círculo verde-limão desfocado no fundo */}
      <div
        className="absolute -right-16 -top-16 w-64 h-64 bg-brand-500 rounded-full opacity-20 blur-3xl"
        aria-hidden="true"
      />

      {/* Conteúdo */}
      <div className="relative z-10">
        {/* Label */}
        <p className="text-paragraph-sm text-neutral-500 mb-2">Saldo Total</p>

        {/* Valor */}
        <h2 className="text-heading-md text-neutral-0 font-bold mb-4">
          {formatCurrency(displayValue)}
        </h2>

        {/* Badge de crescimento */}
        <div className="inline-flex items-center gap-2 bg-neutral-0 bg-opacity-20 backdrop-blur-sm rounded-full px-4 py-2">
          <FiTrendingUp size={16} className="text-brand-500" />
          <span className="text-paragraph-sm text-neutral-0 font-semibold">
            +{growthPercentage}% esse mês
          </span>
        </div>
      </div>
    </div>
  );
}

