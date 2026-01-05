interface CategoryExpenseCardProps {
  category: string;
  amount: number;
  percentage: number;
  isSelected?: boolean;
  color?: string;
  onClick?: () => void;
}

export default function CategoryExpenseCard({
  category,
  amount,
  percentage,
  isSelected = false,
  color = 'brand-500',
  onClick,
}: CategoryExpenseCardProps) {
  // Calcular o ângulo para o gráfico donut
  const circumference = 2 * Math.PI * 40; // raio de 40
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Formatar valor como moeda brasileira
  const formattedAmount = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(amount);

  return (
    <button
      onClick={onClick}
      className={`
        flex flex-col items-center
        bg-neutral-0
        border border-neutral-300
        rounded-xl
        px-8 py-6
        min-w-[180px]
        transition-all
        hover:shadow-sm
        hover:border-neutral-400
        focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2
        ${isSelected ? 'ring-2 ring-brand-500' : ''}
      `}
      style={{ gap: '12px' }}
    >
      {/* Gráfico Donut */}
      <div className="relative w-[71px] h-[71px]">
        <svg className="w-[71px] h-[71px] transform -rotate-90" viewBox="0 0 100 100">
          {/* Ring de fundo (cinza claro) */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-neutral-200"
          />
          {/* Segmento preenchido */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={
              color === 'brand-500'
                ? 'text-brand-500'
                : color === 'neutral-1100'
                ? 'text-neutral-1100'
                : 'text-neutral-500'
            }
            style={{
              transition: 'stroke-dashoffset 0.5s ease-in-out',
            }}
          />
        </svg>
        {/* Porcentagem no centro */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-paragraph-xs text-neutral-1100 font-normal">
            {percentage}%
          </span>
        </div>
      </div>

      {/* Nome da Categoria e Valor */}
      <div className="flex flex-col items-center gap-[5px]">
        {/* Nome da Categoria */}
        <span className="text-paragraph-md text-neutral-1100 text-center">
          {category}
        </span>

        {/* Valor */}
        <span className="text-heading-xs text-neutral-1100 font-bold text-center">
          {formattedAmount}
        </span>
      </div>
    </button>
  );
}

