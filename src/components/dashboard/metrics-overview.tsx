import React from 'react';
import { 
  Users, 
  DollarSign, 
  Target, 
  Phone, 
  TrendingUp,
  Calculator,
  Handshake,
  Smartphone
} from 'lucide-react';
import { MetricCard } from './metric-card';
import { ProcessedData } from '@/types/dashboard';
import { formatCurrency, formatNumber, formatPercentage } from '@/utils/excel-parser';

interface MetricsOverviewProps {
  data: ProcessedData[];
}

export function MetricsOverview({ data }: MetricsOverviewProps) {
  const latestData = data[data.length - 1];
  const previousData = data[data.length - 2];
  
  const calculateTrend = (current: number, previous: number) => {
    if (!previous) return null;
    const change = ((current - previous) / previous) * 100;
    return {
      value: Math.abs(change),
      isPositive: change >= 0
    };
  };

  // Use latest data for current values, not totals across all periods
  const currentClientes = latestData?.quantidade_de_clientes || 0;
  const totalCarteira = data.reduce((sum, item) => sum + item.valor_carteira, 0);
  const totalArrecadado = data.reduce((sum, item) => sum + item.arrecadado, 0);
  const totalAcionamentos = data.reduce((sum, item) => sum + item.quantidade_de_acionamentos, 0);
  const totalAcordos = data.reduce((sum, item) => sum + item.total_de_acordos, 0);
  const currentLigacoes = latestData?.total_de_ligacoes || 0;
  const totalDigital = data.reduce((sum, item) => sum + item.acionamentos_digital_produtivo, 0);

  const taxaAcordosMedia = totalAcionamentos > 0 ? (totalAcordos / totalAcionamentos) * 100 : 0;
  const eficienciaMedia = totalCarteira > 0 ? (totalArrecadado / totalCarteira) * 100 : 0;

  const metrics = [
    {
      title: "Total de Clientes",
      value: formatNumber(currentClientes),
      icon: Users,
      trend: previousData ? calculateTrend(latestData.quantidade_de_clientes, previousData.quantidade_de_clientes) : null,
      variant: 'primary' as const
    },
    {
      title: "Valor da Carteira",
      value: formatCurrency(totalCarteira),
      icon: DollarSign,
      trend: previousData ? calculateTrend(latestData.valor_carteira, previousData.valor_carteira) : null,
      variant: 'success' as const
    },
    {
      title: "Total Arrecadado",
      value: formatCurrency(totalArrecadado),
      icon: TrendingUp,
      trend: previousData ? calculateTrend(latestData.arrecadado, previousData.arrecadado) : null,
      variant: 'success' as const
    },
    {
      title: "Taxa de Acordos",
      value: formatPercentage(taxaAcordosMedia),
      icon: Target,
      trend: previousData ? calculateTrend(latestData.taxa_acordos, previousData.taxa_acordos) : null,
      variant: 'warning' as const
    },
    {
      title: "Total de Ligações",
      value: formatNumber(currentLigacoes),
      icon: Phone,
      trend: previousData ? calculateTrend(latestData.total_de_ligacoes, previousData.total_de_ligacoes) : null,
      variant: 'default' as const
    },
    {
      title: "Eficiência de Cobrança",
      value: formatPercentage(eficienciaMedia),
      icon: Calculator,
      trend: previousData ? calculateTrend(latestData.eficiencia_cobranca, previousData.eficiencia_cobranca) : null,
      variant: 'primary' as const
    },
    {
      title: "Total de Acordos",
      value: formatNumber(totalAcordos),
      icon: Handshake,
      trend: previousData ? calculateTrend(latestData.total_de_acordos, previousData.total_de_acordos) : null,
      variant: 'default' as const
    },
    {
      title: "Acionamentos Digitais",
      value: formatNumber(totalDigital),
      icon: Smartphone,
      trend: previousData ? calculateTrend(latestData.acionamentos_digital_produtivo, previousData.acionamentos_digital_produtivo) : null,
      variant: 'default' as const
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics.map((metric, index) => (
        <MetricCard
          key={index}
          title={metric.title}
          value={metric.value}
          icon={metric.icon}
          trend={metric.trend}
          variant={metric.variant}
        />
      ))}
    </div>
  );
}