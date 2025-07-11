import React from 'react';
import { Calendar, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { FilterState } from '@/types/dashboard';

interface FiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  availableMonths: string[];
}

export function Filters({ filters, onFiltersChange, availableMonths }: FiltersProps) {
  const dateRangeOptions = [
    { value: 'all', label: 'Todos os períodos' },
    { value: '3months', label: 'Últimos 3 meses' },
    { value: '6months', label: 'Últimos 6 meses' },
    { value: '12months', label: 'Últimos 12 meses' },
  ];

  const handleDateRangeChange = (value: string) => {
    const newFilters = { ...filters, dateRange: value as FilterState['dateRange'] };
    
    // Auto-select months based on range
    if (value !== 'all') {
      const monthCount = parseInt(value.replace('months', ''));
      const selectedMonths = availableMonths.slice(-monthCount);
      newFilters.selectedMonths = selectedMonths;
    } else {
      newFilters.selectedMonths = availableMonths;
    }
    
    onFiltersChange(newFilters);
  };

  const toggleMonth = (month: string) => {
    const newSelectedMonths = filters.selectedMonths.includes(month)
      ? filters.selectedMonths.filter(m => m !== month)
      : [...filters.selectedMonths, month];
    
    onFiltersChange({
      ...filters,
      selectedMonths: newSelectedMonths,
      dateRange: 'all' // Reset to all when manually selecting
    });
  };

  return (
    <Card className="bg-gradient-card">
      <CardContent className="p-6">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-primary" />
            <h3 className="font-semibold text-foreground">Filtros</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Período
              </label>
              <Select
                value={filters.dateRange}
                onValueChange={handleDateRangeChange}
              >
                <SelectTrigger>
                  <Calendar className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Selecione o período" />
                </SelectTrigger>
                <SelectContent>
                  {dateRangeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Meses Selecionados ({filters.selectedMonths.length})
              </label>
              <div className="flex flex-wrap gap-2 max-h-20 overflow-y-auto">
                {availableMonths.map((month) => (
                  <Badge
                    key={month}
                    variant={filters.selectedMonths.includes(month) ? "default" : "secondary"}
                    className="cursor-pointer transition-all hover:scale-105"
                    onClick={() => toggleMonth(month)}
                  >
                    {month}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center pt-2 border-t">
            <div className="text-sm text-muted-foreground">
              {filters.selectedMonths.length} de {availableMonths.length} meses selecionados
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onFiltersChange({
                dateRange: 'all',
                selectedMonths: availableMonths
              })}
            >
              Limpar Filtros
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}