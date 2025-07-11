import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  description?: string;
}

export function ChartCard({ title, children, className, description }: ChartCardProps) {
  return (
    <Card className={cn(
      "bg-gradient-card hover:shadow-card transition-all duration-300",
      className
    )}>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-foreground">
          {title}
        </CardTitle>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </CardHeader>
      <CardContent className="pt-0">
        {children}
      </CardContent>
    </Card>
  );
}