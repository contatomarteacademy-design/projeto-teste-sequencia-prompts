import { useMemo } from 'react';
import { useFinance } from '../../contexts/FinanceContext';
import { FiBarChart2 } from 'react-icons/fi';

const MONTHS = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
const Y_AXIS_VALUES = [12500, 10000, 7500, 5000, 2500, 0];
const CHART_WIDTH = 624;
const CHART_HEIGHT = 360;
const CHART_PADDING = { top: 0, right: 0, bottom: 0, left: 0 };

export default function FinancialFlowChart() {
  const { calculateMonthlyFlow } = useFinance();
  const monthlyData = calculateMonthlyFlow();

  const { incomePoints, expensePoints, incomeAreaPath, expenseAreaPath } = useMemo(() => {
    // Encontrar o valor máximo para escalar o gráfico
    const allValues = monthlyData.flatMap((d) => [d.income, d.expenses]);
    const maxValue = Math.max(...allValues, 12500); // Mínimo de R$ 12.500 para manter escala consistente

    // Calcular pontos para as linhas
    const incomePoints: { x: number; y: number }[] = [];
    const expensePoints: { x: number; y: number }[] = [];

    const chartAreaWidth = CHART_WIDTH - CHART_PADDING.left - CHART_PADDING.right;
    const chartAreaHeight = CHART_HEIGHT - CHART_PADDING.top - CHART_PADDING.bottom;
    const xStep = chartAreaWidth / 11; // 11 espaços entre 12 pontos
    const yScale = chartAreaHeight / maxValue;

    monthlyData.forEach((data, index) => {
      const x = CHART_PADDING.left + index * xStep;
      const incomeY = CHART_PADDING.top + chartAreaHeight - data.income * yScale;
      const expenseY = CHART_PADDING.top + chartAreaHeight - data.expenses * yScale;

      incomePoints.push({ x, y: incomeY });
      expensePoints.push({ x, y: expenseY });
    });

    // Criar paths para áreas (area chart)
    const createAreaPath = (points: { x: number; y: number }[], baseY: number) => {
      if (points.length === 0) return '';
      
      let path = `M ${points[0].x} ${baseY} `;
      points.forEach((point) => {
        path += `L ${point.x} ${point.y} `;
      });
      path += `L ${points[points.length - 1].x} ${baseY} Z`;
      return path;
    };

    const baseY = CHART_PADDING.top + chartAreaHeight;
    const incomeAreaPath = createAreaPath(incomePoints, baseY);
    const expenseAreaPath = createAreaPath(expensePoints, baseY);

    return {
      maxValue,
      incomePoints,
      expensePoints,
      incomeAreaPath,
      expenseAreaPath,
    };
  }, [monthlyData]);

  // Criar path suave para a linha usando curvas de Bézier cúbicas
  const createSmoothPath = (points: { x: number; y: number }[]): string => {
    if (points.length === 0) return '';
    if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;

    let path = `M ${points[0].x} ${points[0].y}`;

    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const next = points[i + 1];

      if (i === points.length - 1) {
        // Último ponto: linha reta
        path += ` L ${curr.x} ${curr.y}`;
      } else {
        // Ponto intermediário: curva suave
        const cp1X = prev.x + (curr.x - prev.x) / 2;
        const cp1Y = prev.y;
        const cp2X = curr.x - (next.x - curr.x) / 2;
        const cp2Y = curr.y;
        path += ` C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${curr.x} ${curr.y}`;
      }
    }

    return path;
  };

  const incomeLinePath = useMemo(() => createSmoothPath(incomePoints), [incomePoints]);
  const expenseLinePath = useMemo(() => createSmoothPath(expensePoints), [expensePoints]);

  return (
    <div className="bg-neutral-0 rounded-xl px-8 py-[39px] w-full">
      {/* Header com título e legenda */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-[14px]">
          <FiBarChart2 size={24} className="text-neutral-1100" />
          <h3 className="text-heading-xs text-neutral-1100 font-bold">
            Fluxo financeiro
          </h3>
        </div>
        <div className="flex items-center gap-[27px]">
          {/* Legenda Receitas */}
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-neutral-1100" />
            <span className="text-label-sm text-neutral-1100 font-semibold">
              Receitas
            </span>
          </div>
          {/* Legenda Despesas */}
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-brand-500" />
            <span className="text-label-sm text-neutral-1100 font-semibold">
              Despesas
            </span>
          </div>
        </div>
      </div>

      {/* Gráfico */}
      <div className="flex flex-col gap-[30px]">
        {/* Área do gráfico com eixo Y */}
        <div className="flex gap-4 items-end">
          {/* Eixo Y */}
          <div className="flex flex-col justify-center gap-12 text-paragraph-sm text-neutral-1100 w-[80px]">
            {Y_AXIS_VALUES.map((value) => (
              <span key={value} className="text-center">
                {value === 0 ? 'R$ 0,00' : `R$ ${value.toLocaleString('pt-BR')}`}
              </span>
            ))}
          </div>

          {/* SVG do gráfico */}
          <div className="flex-1 relative" style={{ height: CHART_HEIGHT }}>
            <svg
              width={CHART_WIDTH}
              height={CHART_HEIGHT}
              viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
              className="overflow-visible"
            >
              {/* Definições de gradiente */}
              <defs>
                {/* Gradiente para área de receitas (preto para cinza claro) */}
                <linearGradient id="incomeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#080b12" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#e5e7eb" stopOpacity="0.3" />
                </linearGradient>
                {/* Gradiente para área de despesas (cinza claro) */}
                <linearGradient id="expenseGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#e5e7eb" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#e5e7eb" stopOpacity="0.1" />
                </linearGradient>
              </defs>

              {/* Área de receitas (com gradiente) */}
              {incomeAreaPath && (
                <path
                  d={incomeAreaPath}
                  fill="url(#incomeGradient)"
                  className="transition-all duration-300"
                />
              )}

              {/* Área de despesas (cinza claro) */}
              {expenseAreaPath && (
                <path
                  d={expenseAreaPath}
                  fill="url(#expenseGradient)"
                  className="transition-all duration-300"
                />
              )}

              {/* Linha de receitas (preto) */}
              {incomeLinePath && (
                <path
                  d={incomeLinePath}
                  fill="none"
                  stroke="#080b12"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-all duration-300"
                />
              )}

              {/* Linha de despesas (verde-limão) */}
              {expenseLinePath && (
                <path
                  d={expenseLinePath}
                  fill="none"
                  stroke="#dffe35"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-all duration-300"
                />
              )}
            </svg>
          </div>
        </div>

        {/* Eixo X (meses) */}
        <div className="flex gap-[26px] items-center justify-center text-paragraph-sm text-neutral-1100">
          {MONTHS.map((month) => (
            <span key={month} className="text-center">
              {month}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

