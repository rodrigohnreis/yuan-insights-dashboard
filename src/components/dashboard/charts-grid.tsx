import React from 'react';
import { ChartCard } from './chart-card';
import { LineChartComponent } from './charts/line-chart';
import { BarChartComponent } from './charts/bar-chart';
import { AreaChartComponent } from './charts/area-chart';
import { ProcessedData } from '@/types/dashboard';
import { formatCurrency, formatNumber, formatPercentage } from '@/utils/excel-parser';

interface ChartsGridProps {
  data: ProcessedData[];
}

export function ChartsGrid({ data }: ChartsGridProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ChartCard 
        title="Evolução da Carteira" 
        description="Valor total da carteira ao longo do tempo"
      >
        <AreaChartComponent 
          data={data} 
          dataKey="valor_carteira" 
          color="hsl(var(--yuan-primary))"
          formatValue={formatCurrency}
        />
      </ChartCard>

      <ChartCard 
        title="Arrecadação Mensal" 
        description="Valores arrecadados por mês"
      >
        <BarChartComponent 
          data={data} 
          dataKey="arrecadado" 
          color="hsl(var(--yuan-success))"
          formatValue={formatCurrency}
        />
      </ChartCard>

      <ChartCard 
        title="Quantidade de Clientes" 
        description="Evolução do número de clientes"
      >
        <LineChartComponent 
          data={data} 
          dataKey="quantidade_de_clientes" 
          color="hsl(var(--yuan-accent))"
          formatValue={formatNumber}
        />
      </ChartCard>

      <ChartCard 
        title="Total de Acordos" 
        description="Número de acordos fechados por mês"
      >
        <BarChartComponent 
          data={data} 
          dataKey="total_de_acordos" 
          color="hsl(var(--yuan-warning))"
          formatValue={formatNumber}
        />
      </ChartCard>

      <ChartCard 
        title="Taxa de Acordos (%)" 
        description="Percentual de acordos em relação aos acionamentos"
      >
        <LineChartComponent 
          data={data} 
          dataKey="taxa_acordos" 
          color="hsl(var(--yuan-danger))"
          formatValue={formatPercentage}
        />
      </ChartCard>

      <ChartCard 
        title="Eficiência de Cobrança (%)" 
        description="Percentual arrecadado em relação à carteira"
      >
        <AreaChartComponent 
          data={data} 
          dataKey="eficiencia_cobranca" 
          color="hsl(var(--yuan-primary))"
          formatValue={formatPercentage}
        />
      </ChartCard>

      <ChartCard 
        title="Total de Ligações" 
        description="Volume de ligações realizadas"
      >
        <BarChartComponent 
          data={data} 
          dataKey="total_de_ligacoes" 
          color="hsl(var(--yuan-secondary))"
          formatValue={formatNumber}
        />
      </ChartCard>

      <ChartCard 
        title="Acionamentos Digitais" 
        description="Produtividade dos canais digitais"
      >
        <LineChartComponent 
          data={data} 
          dataKey="acionamentos_digital_produtivo" 
          color="hsl(var(--yuan-accent))"
          formatValue={formatNumber}
        />
      </ChartCard>

      <ChartCard 
        title="Ticket Médio dos Acordos" 
        description="Valor médio por acordo fechado"
        className="lg:col-span-2"
      >
        <AreaChartComponent 
          data={data} 
          dataKey="ticket_medio" 
          color="hsl(var(--yuan-success))"
          formatValue={formatCurrency}
        />
      </ChartCard>
    </div>
  );
}