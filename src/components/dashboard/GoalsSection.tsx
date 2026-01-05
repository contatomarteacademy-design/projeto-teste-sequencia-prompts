import { useNavigate } from 'react-router-dom';
import { useFinance } from '../../contexts/FinanceContext';
import { FiTarget, FiArrowRight } from 'react-icons/fi';
import GoalCard from './GoalCard';

export default function GoalsSection() {
  const { goals } = useFinance();
  const navigate = useNavigate();

  // Mostrar apenas os primeiros 4 objetivos
  const displayedGoals = goals.slice(0, 4);

  if (displayedGoals.length === 0) {
    return null;
  }

  return (
    <div className="w-full min-w-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-[14px]">
          <div className="w-10 h-10 bg-neutral-1100 rounded-full flex items-center justify-center">
            <FiTarget size={20} className="text-neutral-0" />
          </div>
          <h2 className="text-heading-xs text-neutral-1100 font-bold">
            Objetivos
          </h2>
        </div>
        <button
          onClick={() => navigate('/objetivos')}
          className="flex items-center gap-2 text-label-md text-neutral-1100 font-semibold hover:opacity-80 transition-opacity"
        >
          Ver mais
          <FiArrowRight size={20} />
        </button>
      </div>

      {/* Grid de Objetivos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayedGoals.map((goal) => (
          <GoalCard key={goal.id} goal={goal} />
        ))}
      </div>
    </div>
  );
}

