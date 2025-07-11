import React from 'react';
import { BarChart3, TrendingUp, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/yuan-hero-bg.jpg';

interface DashboardHeaderProps {
  onUploadClick: () => void;
  hasData: boolean;
}

export function DashboardHeader({ onUploadClick, hasData }: DashboardHeaderProps) {
  return (
    <div 
      className="relative bg-gradient-hero text-white rounded-lg p-8 mb-8 overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(34, 197, 94, 0.9), rgba(59, 130, 246, 0.8)), url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between">
        <div className="space-y-3 mb-4 md:mb-0">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <BarChart3 className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Yuan Soluções</h1>
              <div className="h-1 w-20 bg-white/40 rounded-full mt-1"></div>
            </div>
          </div>
          <p className="text-white/90 text-lg font-medium">
            Painel de Desempenho - Análise de Cobrança
          </p>
          <div className="flex items-center space-x-2 text-sm text-white/70">
            <TrendingUp className="h-4 w-4" />
            <span>Simplifique os processos da sua empresa</span>
          </div>
        </div>
        
        <div className="flex flex-col space-y-2">
          <Button
            onClick={onUploadClick}
            variant="secondary"
            size="lg"
            className="bg-white/95 text-primary hover:bg-white shadow-lg backdrop-blur-sm border border-white/20"
          >
            <Upload className="h-4 w-4 mr-2" />
            {hasData ? 'Atualizar Dados' : 'Importar Excel'}
          </Button>
          {hasData && (
            <p className="text-xs text-white/70 text-center">
              Clique para carregar novos dados
            </p>
          )}
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-4 right-4 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
      <div className="absolute bottom-4 left-4 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
    </div>
  );
}