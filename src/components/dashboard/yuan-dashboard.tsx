import React, { useState, useMemo } from 'react';
import { AlertCircle, FileSpreadsheet } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FileUpload } from '@/components/ui/file-upload';
import { DashboardHeader } from './dashboard-header';
import { MetricsOverview } from './metrics-overview';
import { ChartsGrid } from './charts-grid';
import { Filters } from './filters';
import { DashboardData, ProcessedData, FilterState } from '@/types/dashboard';
import { parseExcelFile, processData } from '@/utils/excel-parser';
import { useToast } from '@/hooks/use-toast';

export function YuanDashboard() {
  const [data, setData] = useState<ProcessedData[]>([]);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    dateRange: 'all',
    selectedMonths: []
  });
  const { toast } = useToast();

  const availableMonths = useMemo(() => {
    return data.map(item => item.mes);
  }, [data]);

  const filteredData = useMemo(() => {
    if (filters.selectedMonths.length === 0) return data;
    return data.filter(item => filters.selectedMonths.includes(item.mes));
  }, [data, filters.selectedMonths]);

  const handleFileUpload = async (file: File) => {
    setIsLoading(true);
    try {
      const rawData: DashboardData[] = await parseExcelFile(file);
      const processed = processData(rawData);
      
      if (processed.length === 0) {
        throw new Error('Nenhum dado válido encontrado no arquivo');
      }

      setData(processed);
      setFilters({
        dateRange: 'all',
        selectedMonths: processed.map(item => item.mes)
      });
      setIsUploadOpen(false);
      
      toast({
        title: "Dados importados com sucesso!",
        description: `${processed.length} registros processados.`,
      });
    } catch (error) {
      console.error('Erro ao processar arquivo:', error);
      toast({
        title: "Erro ao importar dados",
        description: error instanceof Error ? error.message : 'Erro desconhecido',
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const EmptyState = () => (
    <div className="text-center py-16">
      <div className="mx-auto w-24 h-24 bg-yuan-primary-light rounded-full flex items-center justify-center mb-6">
        <FileSpreadsheet className="h-12 w-12 text-primary" />
      </div>
      <h3 className="text-2xl font-semibold text-foreground mb-2">
        Bem-vindo ao Painel Yuan Soluções
      </h3>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        Para começar, faça o upload do seu arquivo Excel com os dados de desempenho.
        O sistema processará automaticamente os dados e gerará visualizações interativas.
      </p>
      <Button 
        onClick={() => setIsUploadOpen(true)}
        size="lg"
        className="bg-gradient-primary hover:opacity-90"
      >
        <FileSpreadsheet className="h-4 w-4 mr-2" />
        Importar Dados Excel
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <DashboardHeader 
          onUploadClick={() => setIsUploadOpen(true)}
          hasData={data.length > 0}
        />

        {data.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-8">
            <Filters 
              filters={filters}
              onFiltersChange={setFilters}
              availableMonths={availableMonths}
            />
            
            {filteredData.length === 0 ? (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Nenhum dado encontrado para os filtros selecionados. 
                  Ajuste os filtros para visualizar os dados.
                </AlertDescription>
              </Alert>
            ) : (
              <>
                <MetricsOverview data={filteredData} />
                <ChartsGrid data={filteredData} />
              </>
            )}
          </div>
        )}

        <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <FileSpreadsheet className="h-5 w-5 text-primary" />
                <span>Importar Dados Excel</span>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="text-sm text-muted-foreground">
                <p>O arquivo deve conter as seguintes colunas:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Mês</li>
                  <li>Quantidade de Clientes</li>
                  <li>Valor da Carteira</li>
                  <li>Quantidade de Acionamentos</li>
                  <li>Total de Acordos</li>
                  <li>Valor Negociado</li>
                  <li>Arrecadado</li>
                  <li>Total de Ligações</li>
                  <li>Acionamentos Digital Produtivo</li>
                </ul>
              </div>
              
              <FileUpload 
                onFileUpload={handleFileUpload}
                accept={{
                  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
                }}
              />
              
              {isLoading && (
                <div className="text-center">
                  <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Processando arquivo...
                  </p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}