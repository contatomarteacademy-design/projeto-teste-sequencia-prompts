import { useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { FiBarChart2 } from 'react-icons/fi';

// Dados mock fixos para 7 meses (será substituído por dados reais no futuro)
const mockData = [
  { month: 'Jan', receitas: 2500, despesas: 2000 },
  { month: 'Fev', receitas: 3500, despesas: 2800 },
  { month: 'Mar', receitas: 4800, despesas: 3200 },
  { month: 'Abr', receitas: 6200, despesas: 4500 },
  { month: 'Mai', receitas: 5500, despesas: 5200 },
  { month: 'Jun', receitas: 4200, despesas: 3800 },
  { month: 'Jul', receitas: 3800, despesas: 3500 },
];

// Tooltip customizado
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const receitas = payload.find((p: any) => p.dataKey === 'receitas')?.value || 0;
    const despesas = payload.find((p: any) => p.dataKey === 'despesas')?.value || 0;

    return (
      <div className="bg-neutral-0 rounded-xl shadow-lg border border-neutral-300 p-4">
        <p className="text-label-md text-neutral-1100 font-bold mb-2">{label}</p>
        <div className="flex flex-col gap-1">
          <p className="text-paragraph-sm font-semibold" style={{ color: '#dffe35' }}>
            Receitas: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(receitas)}
          </p>
          <p className="text-paragraph-sm text-neutral-1100 font-semibold">
            Despesas: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(despesas)}
          </p>
        </div>
      </div>
    );
  }
  return null;
};

// Formatação compacta do eixo Y (R$ 2k, R$ 4k, etc)
const formatYAxis = (value: number) => {
  if (value >= 1000) {
    return `R$ ${(value / 1000).toFixed(0)}k`;
  }
  return `R$ ${value}`;
};

export default function FinancialFlowChart() {
  // Calcular valor máximo para escala do gráfico
  const maxValue = useMemo(() => {
    const allValues = mockData.flatMap((d) => [d.receitas, d.despesas]);
    return Math.max(...allValues, 6000);
  }, []);

  return (
    <div className="bg-neutral-0 rounded-xl px-8 py-[39px] w-full min-w-0 overflow-hidden">
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
            <div className="w-2 h-2 rounded-full bg-brand-500" />
            <span className="text-label-sm text-neutral-1100 font-semibold">
              Receitas
            </span>
          </div>
          {/* Legenda Despesas */}
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-neutral-1100" />
            <span className="text-label-sm text-neutral-1100 font-semibold">
              Despesas
            </span>
          </div>
        </div>
      </div>

      {/* Gráfico */}
      <div className="w-full" style={{ height: '300px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={mockData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              {/* Gradiente para área de receitas (verde-limão 30% opaco no topo, transparente na base) */}
              <linearGradient id="colorReceitas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#dffe35" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#dffe35" stopOpacity={0} />
              </linearGradient>
              {/* Gradiente para área de despesas (preto 10% opaco no topo, transparente na base) */}
              <linearGradient id="colorDespesas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#080b12" stopOpacity={0.1} />
                <stop offset="100%" stopColor="#080b12" stopOpacity={0} />
              </linearGradient>
            </defs>
            
            {/* Grid horizontal tracejado */}
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e5e7eb"
              vertical={false}
            />
            
            {/* Eixo X - meses */}
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 400 }}
              tickMargin={10}
            />
            
            {/* Eixo Y - valores monetários */}
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 400 }}
              tickFormatter={formatYAxis}
              domain={[0, maxValue]}
              tickMargin={10}
            />
            
            {/* Tooltip interativo */}
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: '#d1d5db', strokeWidth: 1 }}
            />
            
            {/* Área de Receitas */}
            <Area
              type="monotone"
              dataKey="receitas"
              stroke="#dffe35"
              strokeWidth={3}
              fill="url(#colorReceitas)"
              fillOpacity={1}
            />
            
            {/* Área de Despesas */}
            <Area
              type="monotone"
              dataKey="despesas"
              stroke="#080b12"
              strokeWidth={3}
              fill="url(#colorDespesas)"
              fillOpacity={1}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
