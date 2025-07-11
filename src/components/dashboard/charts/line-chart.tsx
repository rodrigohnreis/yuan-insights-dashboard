import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ProcessedData } from '@/types/dashboard';
import { formatCurrency, formatNumber } from '@/utils/excel-parser';

interface LineChartComponentProps {
  data: ProcessedData[];
  dataKey: keyof ProcessedData;
  color?: string;
  formatValue?: (value: number) => string;
}

export function LineChartComponent({ 
  data, 
  dataKey, 
  color = "hsl(var(--yuan-primary))",
  formatValue = formatNumber
}: LineChartComponentProps) {
  const getDisplayName = (key: string): string => {
    const names: Record<string, string> = {
      'quantidade_de_clientes': 'Quantidade de Clientes',
      'total_de_ligacoes': 'Total de Ligações',
      'acionamentos_digital_produtivo': 'Acionamentos Digitais',
      'taxa_acordos': 'Taxa de Acordos',
      'eficiencia_cobranca': 'Eficiência de Cobrança'
    };
    return names[key] || key;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-card-foreground">{`Mês: ${label}`}</p>
          <p className="text-sm text-primary">
            {`${getDisplayName(String(dataKey))}: ${formatValue(payload[0].value)}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
        <XAxis 
          dataKey="mes" 
          className="text-xs"
          tick={{ fontSize: 12 }}
        />
        <YAxis 
          className="text-xs"
          tick={{ fontSize: 12 }}
          tickFormatter={formatValue}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line 
          type="monotone" 
          dataKey={dataKey} 
          stroke={color}
          strokeWidth={3}
          dot={{ fill: color, strokeWidth: 2, r: 4 }}
          activeDot={{ r: 6, stroke: color, strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}