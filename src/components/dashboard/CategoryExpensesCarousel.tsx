import { useRef, useState, useEffect } from 'react';
import { useFinance } from '../../contexts/FinanceContext';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import CategoryExpenseCard from './CategoryExpenseCard';

// Cores para cada categoria (usando variáveis do design system)
const categoryColors: { [key: string]: string } = {
  'Compras': 'brand-500',
  'Alimentação': 'neutral-1100',
  'Transporte': 'neutral-500',
  'Lazer': 'neutral-500',
  'Saúde': 'brand-500',
  'Educação': 'neutral-1100',
  'Moradia': 'neutral-500',
  'Outros': 'neutral-500',
};

export default function CategoryExpensesCarousel() {
  const { calculateExpensesByCategory } = useFinance();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const expensesByCategory = calculateExpensesByCategory();

  // Ordenar por valor (maior para menor) - já vem ordenado do contexto
  const sortedCategories = expensesByCategory;

  // Verificar se pode rolar
  const checkScrollability = () => {
    if (!carouselRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  };

  useEffect(() => {
    checkScrollability();
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', checkScrollability);
      window.addEventListener('resize', checkScrollability);
      return () => {
        carousel.removeEventListener('scroll', checkScrollability);
        window.removeEventListener('resize', checkScrollability);
      };
    }
  }, [expensesByCategory]);

  const scroll = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;

    const scrollAmount = 200; // Quantidade de pixels para rolar
    const currentScroll = carouselRef.current.scrollLeft;
    const newScroll =
      direction === 'left'
        ? currentScroll - scrollAmount
        : currentScroll + scrollAmount;

    carouselRef.current.scrollTo({
      left: newScroll,
      behavior: 'smooth',
    });
  };

  if (sortedCategories.length === 0) {
    return (
      <div className="w-full bg-neutral-0 rounded-xl p-8 text-center">
        <p className="text-paragraph-lg text-neutral-500">
          Nenhuma despesa encontrada no período selecionado.
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full min-w-0 overflow-hidden">
      {/* Máscara de gradiente esquerda - aparece quando pode rolar para a esquerda */}
      {canScrollLeft && (
        <div
          className="absolute left-0 top-0 bottom-0 w-16 z-20 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, rgba(243, 244, 246, 1), rgba(243, 244, 246, 0))',
          }}
        />
      )}

      {/* Máscara de gradiente direita - aparece quando pode rolar para a direita */}
      {canScrollRight && (
        <div
          className="absolute right-0 top-0 bottom-0 w-16 z-20 pointer-events-none"
          style={{
            background: 'linear-gradient(to left, rgba(243, 244, 246, 1), rgba(243, 244, 246, 0))',
          }}
        />
      )}

      {/* Seta Esquerda */}
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-30 w-10 h-10 bg-neutral-0 rounded-full shadow-md flex items-center justify-center hover:bg-neutral-200 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
          aria-label="Rolar para esquerda"
        >
          <FiChevronLeft size={24} className="text-neutral-500" />
        </button>
      )}

      {/* Carrossel */}
      <div
        ref={carouselRef}
        className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide w-full"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          paddingRight: '16px', // Padding após o último card
        }}
      >
        {sortedCategories.map(({ category, amount, percentage }) => (
          <CategoryExpenseCard
            key={category}
            category={category}
            amount={amount}
            percentage={Math.round(percentage)}
            isSelected={selectedCategory === category}
            color={categoryColors[category] || 'neutral-500'}
            onClick={() => {
              setSelectedCategory(
                selectedCategory === category ? null : category
              );
            }}
          />
        ))}
      </div>

      {/* Seta Direita */}
      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-30 w-10 h-10 bg-neutral-0 rounded-full shadow-md flex items-center justify-center hover:bg-neutral-200 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
          aria-label="Rolar para direita"
        >
          <FiChevronRight size={24} className="text-neutral-500" />
        </button>
      )}

    </div>
  );
}

