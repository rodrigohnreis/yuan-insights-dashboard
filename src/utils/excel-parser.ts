import * as XLSX from 'xlsx';
import { DashboardData, ProcessedData } from '@/types/dashboard';

export const parseExcelFile = (file: File): Promise<DashboardData[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        
        // Get the first worksheet
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        
        // Convert to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        
        // Extract headers and data
        const headers = jsonData[0] as string[];
        const rows = jsonData.slice(1) as any[][];
        
        // Map data to our interface
        const parsedData: DashboardData[] = rows
          .filter(row => row.some(cell => cell !== null && cell !== undefined && cell !== ''))
          .map((row, index) => {
            const rowData: any = {};
            headers.forEach((header, colIndex) => {
              const normalizedHeader = normalizeColumnName(header);
              rowData[normalizedHeader] = row[colIndex];
            });
            return rowData;
          });
        
        resolve(parsedData);
      } catch (error) {
        reject(new Error('Erro ao processar arquivo Excel: ' + error));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Erro ao ler arquivo'));
    };
    
    reader.readAsArrayBuffer(file);
  });
};

const normalizeColumnName = (header: string): string => {
  const mappings: Record<string, string> = {
    'mês': 'mes',
    'mes': 'mes',
    'quantidade de clientes': 'quantidade_de_clientes',
    'qtd clientes': 'quantidade_de_clientes',
    'clientes': 'quantidade_de_clientes',
    'valor carteira': 'valor_carteira',
    'carteira': 'valor_carteira',
    'quantidade de acionamentos': 'quantidade_de_acionamentos',
    'acionamentos': 'quantidade_de_acionamentos',
    'total de acordos': 'total_de_acordos',
    'acordos': 'total_de_acordos',
    'valor negociado': 'valor_negociado',
    'negociado': 'valor_negociado',
    'arrecadado': 'arrecadado',
    'valor arrecadado': 'arrecadado',
    'total de ligações': 'total_de_ligacoes',
    'ligações': 'total_de_ligacoes',
    'ligacoes': 'total_de_ligacoes',
    'acionamentos digital produtivo': 'acionamentos_digital_produtivo',
    'digital produtivo': 'acionamentos_digital_produtivo',
  };
  
  const normalized = header.toLowerCase().trim();
  return mappings[normalized] || normalized.replace(/\s+/g, '_');
};

export const processData = (data: DashboardData[]): ProcessedData[] => {
  return data.map(item => {
    // Parse monetary values
    const valor_carteira = parseMonetaryValue(item.valor_carteira);
    const valor_negociado = parseMonetaryValue(item.valor_negociado);
    const arrecadado = parseMonetaryValue(item.arrecadado);
    
    // Calculate metrics
    const taxa_acordos = item.quantidade_de_acionamentos > 0 
      ? (item.total_de_acordos / item.quantidade_de_acionamentos) * 100 
      : 0;
    
    const eficiencia_cobranca = valor_carteira > 0 
      ? (arrecadado / valor_carteira) * 100 
      : 0;
    
    const ticket_medio = item.total_de_acordos > 0 
      ? valor_negociado / item.total_de_acordos 
      : 0;
    
    return {
      mes: item.mes,
      quantidade_de_clientes: Number(item.quantidade_de_clientes) || 0,
      valor_carteira,
      quantidade_de_acionamentos: Number(item.quantidade_de_acionamentos) || 0,
      total_de_acordos: Number(item.total_de_acordos) || 0,
      valor_negociado,
      arrecadado,
      total_de_ligacoes: Number(item.total_de_ligacoes) || 0,
      acionamentos_digital_produtivo: Number(item.acionamentos_digital_produtivo) || 0,
      taxa_acordos,
      eficiencia_cobranca,
      ticket_medio,
    };
  });
};

const parseMonetaryValue = (value: string | number): number => {
  if (typeof value === 'number') return value;
  
  if (typeof value === 'string') {
    // Remove currency symbols and formatting
    const cleaned = value
      .replace(/[R$\s]/g, '')
      .replace(/\./g, '')
      .replace(',', '.');
    
    return parseFloat(cleaned) || 0;
  }
  
  return 0;
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('pt-BR').format(value);
};

export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};