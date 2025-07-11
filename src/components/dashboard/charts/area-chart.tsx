import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ProcessedData } from '@/types/dashboard';
import { formatNumber } from '@/utils/excel-parser';

interface AreaChartComponentProps {
  data: ProcessedData[];
  dataKey: keyof ProcessedData;
  color?: string;
  formatValue?: (value: number) => string;
}

export function AreaChartComponent({ 
  data, 
  dataKey, 
  color = "hsl(var(--yuan-primary))",
  formatValue = formatNumber
}: AreaChartComponentProps) {
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
      <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <defs>
          <linearGradient id={`colorGradient`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.8}/>
            <stop offset="95%" stopColor={color} stopOpacity={0.1}/>
          </linearGradient>
        </defs>
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
        <Area 
          type="monotone" 
          dataKey={dataKey} 
          stroke={color}
          fillOpacity={1}
          fill={`url(#colorGradient)`}
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}