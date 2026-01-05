import { useState } from 'react';
import { Goal } from '../../types';

interface GoalCardProps {
  goal: Goal;
  onClick?: () => void;
}

export default function GoalCard({ goal, onClick }: GoalCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const percentage = Math.round(
    (goal.currentAmount / goal.targetAmount) * 100
  );
  const remaining = goal.targetAmount - goal.currentAmount;

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        bg-neutral-0
        border
        rounded-[32px]
        overflow-hidden
        transition-all
        duration-300
        w-full
        flex
        flex-col
        ${isHovered ? 'border-neutral-400 shadow-lg' : 'border-neutral-300 shadow-sm'}
        focus:outline-none
        focus:ring-2
        focus:ring-brand-500
        focus:ring-offset-2
      `}
    >
      {/* Área de Imagem */}
      <div className="relative h-[192px] overflow-hidden">
        {goal.image ? (
          <img
            src={goal.image}
            alt={goal.name}
            className={`
              w-full
              h-full
              object-cover
              transition-transform
              duration-700
              ${isHovered ? 'scale-105' : 'scale-100'}
            `}
          />
        ) : (
          <div className="w-full h-full bg-neutral-200" />
        )}

        {/* Badge de Categoria */}
        {goal.category && (
          <div className="absolute top-4 right-4 bg-neutral-1100 bg-opacity-60 backdrop-blur-sm px-3 py-1 rounded-[100px]">
            <span className="text-label-xs text-neutral-0 font-semibold">
              {goal.category}
            </span>
          </div>
        )}
      </div>

      {/* Área de Conteúdo */}
      <div className="flex flex-col gap-[11px] px-8 py-8">
        {/* Nome do Objetivo */}
        <h3 className="text-label-lg text-neutral-1100 font-semibold text-left">
          {goal.name}
        </h3>

        {/* Valores */}
        <div className="flex items-center gap-[13px]">
          <span className="text-heading-sm text-neutral-1100 font-bold">
            {formatCurrency(goal.currentAmount)}
          </span>
          <span className="text-label-xs text-neutral-500 font-semibold">
            de {formatCurrency(goal.targetAmount)}
          </span>
        </div>

        {/* Barra de Progresso */}
        <div className="relative">
          <div className="h-[10px] bg-neutral-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-500 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>
        </div>

        {/* Informações de Progresso */}
        <div className="flex items-center justify-between">
          <span className="text-label-xs text-neutral-1100 font-semibold">
            {percentage}%
          </span>
          <span className="text-label-xs text-neutral-1100 font-semibold">
            Faltam {formatCurrency(remaining)}
          </span>
        </div>
      </div>
    </button>
  );
}

