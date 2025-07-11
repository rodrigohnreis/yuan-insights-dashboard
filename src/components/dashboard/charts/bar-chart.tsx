import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ProcessedData } from '@/types/dashboard';
import { formatNumber } from '@/utils/excel-parser';

interface BarChartComponentProps {
  data: ProcessedData[];
  dataKey: keyof ProcessedData;
  color?: string;
  formatValue?: (value: number) => string;
}

export function BarChartComponent({ 
  data, 
  dataKey, 
  color = "hsl(var(--yuan-primary))",
  formatValue = formatNumber
}: BarChartComponentProps) {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-card-foreground">{`Mês: ${label}`}</p>
          <p className="text-sm text-primary">
            {`${payload[0].name}: ${formatValue(payload[0].value)}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
        <Bar 
          dataKey={dataKey} 
          fill={color}
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}