import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
}

export function MetricCard({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  className,
  variant = 'default'
}: MetricCardProps) {
  const formatValue = (val: string | number): string => {
    if (typeof val === 'number') {
      if (val >= 1000000) {
        return `${(val / 1000000).toFixed(1)}M`;
      } else if (val >= 1000) {
        return `${(val / 1000).toFixed(1)}K`;
      }
      return val.toLocaleString('pt-BR');
    }
    return val;
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-primary text-white';
      case 'success':
        return 'bg-yuan-success/10 border-yuan-success/20';
      case 'warning':
        return 'bg-yuan-warning/10 border-yuan-warning/20';
      case 'danger':
        return 'bg-yuan-danger/10 border-yuan-danger/20';
      default:
        return 'bg-gradient-card hover:shadow-card';
    }
  };

  return (
    <Card className={cn(
      "transition-all duration-300 hover:scale-105",
      getVariantStyles(),
      className
    )}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className={cn(
              "text-sm font-medium",
              variant === 'primary' ? 'text-white/80' : 'text-muted-foreground'
            )}>
              {title}
            </p>
            <p className={cn(
              "text-2xl font-bold tracking-tight",
              variant === 'primary' ? 'text-white' : 'text-foreground'
            )}>
              {formatValue(value)}
            </p>
            {trend && (
              <div className={cn(
                "flex items-center text-xs font-medium",
                trend.isPositive ? 'text-yuan-success' : 'text-yuan-danger'
              )}>
                <span>
                  {trend.isPositive ? '+' : ''}{trend.value.toFixed(1)}%
                </span>
                <span className={cn(
                  "ml-1",
                  variant === 'primary' ? 'text-white/60' : 'text-muted-foreground'
                )}>
                  vs mês anterior
                </span>
              </div>
            )}
          </div>
          <div className={cn(
            "p-3 rounded-full",
            variant === 'primary' 
              ? 'bg-white/20' 
              : 'bg-yuan-primary-light'
          )}>
            <Icon className={cn(
              "h-6 w-6",
              variant === 'primary' ? 'text-white' : 'text-primary'
            )} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}