import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  className?: string;
}

export function KPICard({ title, value, change, changeType, icon: Icon, className }: KPICardProps) {
  const changeColor = {
    positive: 'text-green-400',
    negative: 'text-red-400', 
    neutral: 'text-muted-foreground'
  };

  return (
    <Card className={`kpi-card ${className}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline space-x-2">
              <h3 className="text-2xl font-bold tracking-tight">{value}</h3>
              <span className={`text-sm font-medium ${changeColor[changeType]}`}>
                {change}
              </span>
            </div>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-primary/10">
            <Icon className="h-6 w-6 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}