export interface DashboardData {
  mes: string;
  quantidade_de_clientes: number;
  valor_carteira: string;
  quantidade_de_acionamentos: number;
  total_de_acordos: number;
  valor_negociado: string;
  arrecadado: string;
  total_de_ligacoes: number;
  acionamentos_digital_produtivo: number;
}

export interface ProcessedData {
  mes: string;
  quantidade_de_clientes: number;
  valor_carteira: number;
  quantidade_de_acionamentos: number;
  total_de_acordos: number;
  valor_negociado: number;
  arrecadado: number;
  total_de_ligacoes: number;
  acionamentos_digital_produtivo: number;
  taxa_acordos: number;
  eficiencia_cobranca: number;
  ticket_medio: number;
}

export interface FilterState {
  dateRange: 'all' | '3months' | '6months' | '12months';
  selectedMonths: string[];
}